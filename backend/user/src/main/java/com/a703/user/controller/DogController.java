package com.a703.user.controller;

import com.a703.user.dto.DogDto;
import com.a703.user.service.DogService;
import com.a703.user.util.CommUtil;
import com.a703.user.util.JwtUtil;
import com.a703.user.vo.RequestDog;
import com.a703.user.vo.ResponseDog;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/dog")
@RequiredArgsConstructor
public class DogController {

    private final Environment env;
    private final DogService dogService;
    private final JwtUtil jwtUtil;
    private final CommUtil commUtil;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> registerDog(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt, @RequestPart(value = "file") MultipartFile file, @RequestPart(value = "dog") RequestDog dog) throws IOException {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);

        String savePath = String.format(env.getProperty("image.dog.path"), UUID.randomUUID() + "." + commUtil.extractExt(file.getOriginalFilename()));
        commUtil.saveImage(file, savePath);
        dog.setImage(savePath);

        DogDto dogDto = new ModelMapper().typeMap(RequestDog.class, DogDto.class).map(dog);
        dogDto.setBreed(dogService.findBreed(dog.getBreedCode()));

        dogService.registerDog(userIdx, dogDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
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
}
