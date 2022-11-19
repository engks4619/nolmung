package com.a703.user.service;

import com.a703.user.dto.DogDto;
import com.a703.user.entity.BreedEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DogService {
    DogDto getDogInfoByDogIdx(Long dogIdx);
    List<Long> getDogIdxListByBreedCode(Integer dogBreedCode);
    Long registerDog(Long userIdx, DogDto dogDto);
    void registerDogImage(MultipartFile file, Long dogIdx) throws IOException;
    BreedEntity findBreed(Integer breedCode);
    List<DogDto> getDogInfoByUserIdx(Long userIdx);
    List<DogDto> deleteDog(Long userIdx, Long dogIdx);
}
