package com.a703.user.controller;

import com.a703.user.dto.DogDto;
import com.a703.user.service.DogService;
import com.a703.user.util.JwtUtil;
import com.a703.user.vo.request.RequestDog;
import com.a703.user.vo.response.ResponseDog;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/dog")
@RequiredArgsConstructor
public class DogController {

    private final DogService dogService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<Object> registerDog(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt, @RequestBody RequestDog dog) {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);

        DogDto dogDto = new ModelMapper().typeMap(RequestDog.class, DogDto.class).map(dog);
        dogDto.setBreed(dogService.findBreed(dog.getBreedCode()));

        Map<String, Object> body = new HashMap<>();
        body.put("dogIdx", dogService.registerDog(userIdx, dogDto));
        return ResponseEntity.ok(body);
    }

    @PostMapping("/image")
    public ResponseEntity<?> registerDogImage(@RequestParam(value = "files") MultipartFile file, @RequestParam(value = "dogIdx") Long dogIdx) throws IOException {
        dogService.registerDogImage(file, dogIdx);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/info")
    public ResponseEntity<?> getDogInfo(@RequestParam List<Long> dogIdxList) {
        List<ResponseDog> returnValue = dogIdxList.stream().map(idx -> new ModelMapper()
                .typeMap(DogDto.class, ResponseDog.class)
                .addMapping(DogDto::getBreedCodeValue, ResponseDog::setBreedCodeValue)
                .map(dogService.getDogInfoByDogIdx(idx))
        ).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/list/breedcode")
    public ResponseEntity<?> getDogIdxListByBreed(@RequestParam("breedcode") Integer breedCode) {
        List<Long> returnValue = dogService.getDogIdxListByBreedCode(breedCode);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/mydogs")
    public ResponseEntity<?> getDogList(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
        return ResponseEntity.status(HttpStatus.OK).body(dogService.getDogInfoByUserIdx(userIdx).stream()
                .map(dogDto -> new ModelMapper()
                        .typeMap(DogDto.class, ResponseDog.class)
                        .addMapping(DogDto::getBreedCodeValue, ResponseDog::setBreedCodeValue)
                        .map(dogDto))
                .collect(Collectors.toList()));
    }

    @GetMapping("/info/{userIdx}")
    public ResponseEntity<?> getDogListByUserIdx(@PathVariable(value = "userIdx") Long userIdx) {
        return ResponseEntity.status(HttpStatus.OK).body(dogService.getDogInfoByUserIdx(userIdx).stream()
                .map(dogDto -> new ModelMapper()
                        .typeMap(DogDto.class, ResponseDog.class)
                        .addMapping(DogDto::getBreedCodeValue, ResponseDog::setBreedCodeValue)
                        .map(dogDto))
                .collect(Collectors.toList()));
    }

    @DeleteMapping("/{dogIdx}")
    public ResponseEntity<?> deleteDog(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt, @PathVariable(value = "dogIdx") Long dogIdx) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map<String, Object> body = new HashMap<>();
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
        List<DogDto> list = dogService.deleteDog(userIdx, dogIdx);
        if (list != null) {
            status = HttpStatus.OK;
            body.put("dogList", list.stream().map(dto -> new ModelMapper()
                            .typeMap(DogDto.class, ResponseDog.class)
                            .addMapping(DogDto::getBreedCodeValue, ResponseDog::setBreedCodeValue)
                            .map(dto))
                    .collect(Collectors.toList()));
        }
        return ResponseEntity.status(status).body(body);
    }
}