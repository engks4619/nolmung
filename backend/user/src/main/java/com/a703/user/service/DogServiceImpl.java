package com.a703.user.service;

import com.a703.user.dto.DogDto;
import com.a703.user.entity.BreedEntity;
import com.a703.user.entity.DogEntity;
import com.a703.user.repository.BreedRepository;
import com.a703.user.repository.DogRepository;
import com.a703.user.repository.UserRepository;
import com.a703.user.util.CommUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DogServiceImpl implements DogService{
    private final Environment env;

    private final DogRepository dogRepository;
    private final BreedRepository breedRepository;
    private final UserRepository userRepository;
    private final CommUtil commUtil;

    @Override
    public DogDto getDogInfoByDogIdx(Long dogIdx) {
        return new ModelMapper().map(dogRepository.findById(dogIdx).orElseThrow(NoSuchElementException::new), DogDto.class);
    }

    @Override
    public List<Long> getDogIdxListByBreedCode(Integer dogBreedCode) {
        return dogRepository.findAllByBreedBreedCodeAndDeletedIsFalse(dogBreedCode).stream()
                .map(DogEntity::getDogIdx)
                .collect(Collectors.toList());
    }

    @Override
    public Long registerDog(Long userIdx, DogDto dogDto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true);
        dogDto.setUser(userRepository.findById(userIdx).orElseThrow(NoSuchElementException::new));
        DogEntity dogEntity = modelMapper.map(dogDto, DogEntity.class);
        return dogRepository.save(dogEntity).getDogIdx();
    }

    @Override
    public BreedEntity findBreed(Integer breedCode) {
        return breedRepository.findById(breedCode).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public List<DogDto> getDogInfoByUserIdx(Long userIdx) {
        return dogRepository.findAllByUserUserIdxAndDeletedIsFalse(userIdx).stream()
                .map(dogEntity -> new ModelMapper().map(dogEntity, DogDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void registerDogImage(MultipartFile file, Long dogIdx) throws IOException {
        DogEntity dogEntity = dogRepository.findById(dogIdx).orElseThrow(NoSuchElementException::new);
        String savePath = String.format(env.getProperty("image.dog.path"), UUID.randomUUID() + "." + commUtil.extractExt(file.getOriginalFilename()));
        commUtil.saveImage(file, savePath);
        dogEntity.changeDogImage(savePath);
        dogRepository.save(dogEntity);
    }

    @Override
    public List<DogDto> deleteDog(Long userIdx, Long dogIdx) {
        DogEntity dogEntity = dogRepository.findById(dogIdx).orElseThrow();
        if(Objects.equals(userIdx, dogEntity.getUser().getUserIdx())){
            dogEntity.deleteDog();
            dogRepository.save(dogEntity);
            return dogRepository.findAllByUserUserIdxAndDeletedIsFalse(userIdx).stream()
                    .map(dog -> new ModelMapper().map(dog, DogDto.class))
                    .collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public Integer countDog(Long userIdx){
        return dogRepository.countByUserUserIdxAndDeletedIsFalse(userIdx);
    }
}
