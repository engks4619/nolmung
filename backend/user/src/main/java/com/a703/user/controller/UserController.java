package com.a703.user.controller;

import com.a703.user.dto.UserDto;
import com.a703.user.entity.CertEntity;
import com.a703.user.entity.UserVariableEntity;
import com.a703.user.service.CertService;
import com.a703.user.service.UserService;
import com.a703.user.service.UserVariableService;
import com.a703.user.util.CommUtil;
import com.a703.user.util.JwtUtil;
import com.a703.user.vo.request.RequestUser;
import com.a703.user.vo.response.ResponseUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.IdentityHashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final Environment env;
    private final UserService userService;
    private final CertService certService;
    private final UserVariableService userVariableService;
    private final JwtUtil jwtUtil;
    private final CommUtil commUtil;

    @GetMapping("/health_check")
    public String status() {
        return "It's Working in User Service";
    }

    @PostMapping("/cert")
    public ResponseEntity<String> sendMsg(@RequestBody Map<String, String> body) throws JsonProcessingException {
        String phone = body.get("phone");
        String cert = String.format("%04d", (int) Math.floor(Math.random() * 10000));
        HttpStatus status;
        String msg;
        if (userService.exist(phone)) {
            status = HttpStatus.NOT_ACCEPTABLE;
            msg = "이미 가입된 번호입니다!";
        } else {
            status = commUtil.sendSms(phone, cert);
            if (status.value() == 202) {
                certService.save(CertEntity.builder().phone(phone).cert(cert).build());
                status = HttpStatus.OK;
                msg = "인증문자가 발송되었습니다!";
            } else {
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                msg = "인증문자 발송을 실패했습니다!";
            }
        }
        return ResponseEntity.status(status).body(msg);
    }

    @PostMapping("/cert/verify")
    public ResponseEntity<String> verifyNumber(@RequestBody Map<String, String> body) {
        String phone = body.get("phone");
        String number = body.get("number");
        HttpStatus status;
        String msg;
        if (!certService.exist(phone)) {
            status = HttpStatus.REQUEST_TIMEOUT;
            msg = "만료된 인증번호입니다!";
        } else if (!certService.find(phone).getCert().equals(number)) {
            status = HttpStatus.BAD_REQUEST;
            msg = "인증번호를 잘못입력하셨습니다!";
        } else {
            status = HttpStatus.OK;
            msg = "인증에 성공하였습니다!";
        }
        return ResponseEntity.status(status).body(msg);
    }

    @PostMapping
    public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);

        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        String token = Jwts.builder()
                .setSubject(responseUser.getUserIdx().toString())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret"))
                .compact();

        return ResponseEntity.status(HttpStatus.CREATED).header("token", token).body(responseUser);
    }

    @GetMapping("/info/{userIdx}")
    public ResponseEntity<?> getUserInfo(@PathVariable("userIdx") Long userIdx) {
        UserDto userDto = userService.getUserByUserIdx(userIdx);

        ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/my-info")
    public ResponseEntity<?> getMyInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
        UserDto userDto = userService.getUserByUserIdx(userIdx);
        ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("home")
    public ResponseEntity<?> homeData(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
        UserVariableEntity userVariableEntity = userVariableService.getWalkData(userIdx);
        Map<String, Object> body = new IdentityHashMap<>();
        body.put("totalWalk", userVariableEntity.getCntWalk());
        body.put("totalDistance", String.format("%.1f", userVariableEntity.getTotalDistance() / 1000));
        body.put("totalTime", String.format("%d시간 %02d분", userVariableEntity.getTotalTime() / 60, userVariableEntity.getTotalTime() % 60));
        return ResponseEntity.ok(body);
    }

    @PutMapping
    public ResponseEntity<?> modifyProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
                                           @RequestPart(value = "file", required = false) MultipartFile file,
                                           @RequestPart(value = "nickname") String nickname) throws IOException {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);

        return ResponseEntity.ok(userService.modifyProfile(userIdx, file, nickname));
    }
}
