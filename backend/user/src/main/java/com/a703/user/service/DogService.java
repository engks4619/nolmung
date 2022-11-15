package com.a703.user.service;

import com.a703.user.dto.DogDto;
import com.a703.user.entity.BreedEntity;

import java.util.List;

public interface DogService {
    DogDto getDogInfoByDogIdx(Long dogIdx);
    List<Long> getDogIdxListByBreedCode(Integer dogBreedCode);
    void registerDog(Long userIdx, DogDto dogDto);
    BreedEntity findBreed(Integer breedCode);
    List<DogDto> getDogInfoByUserIdx(Long userIdx);
}
