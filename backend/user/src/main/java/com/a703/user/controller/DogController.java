package com.a703.user.controller;

import com.a703.user.dto.DogDto;
import com.a703.user.service.DogService;
import com.a703.user.util.JwtUtil;
import com.a703.user.vo.RequestDog;
import com.a703.user.vo.ResponseDog;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/dog")
@RequiredArgsConstructor
public class DogController {
    private final DogService dogService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> registerDog(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt, @RequestBody RequestDog dog) {
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
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
