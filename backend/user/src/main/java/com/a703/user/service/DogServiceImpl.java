package com.a703.user.service;

import com.a703.user.dto.DogDto;
import com.a703.user.entity.BreedEntity;
import com.a703.user.entity.DogEntity;
import com.a703.user.repository.BreedRepository;
import com.a703.user.repository.DogRepository;
import com.a703.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DogServiceImpl implements DogService{

    private final DogRepository dogRepository;
    private final BreedRepository breedRepository;
    private final UserRepository userRepository;

    @Override
    public DogDto getDogInfoByDogIdx(Long dogIdx) {
        return new ModelMapper().map(dogRepository.findByDogIdx(dogIdx).orElseThrow(NoSuchElementException::new), DogDto.class);
    }

    @Override
    public List<Long> getDogIdxListByBreedCode(Integer dogBreedCode) {
        return dogRepository.findAllByBreedBreedCode(dogBreedCode).stream()
                .map(DogEntity::getDogIdx)
                .collect(Collectors.toList());
    }

    @Override
    public void registerDog(Long userIdx, DogDto dogDto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true);
        dogDto.setUser(userRepository.findById(userIdx).orElseThrow(NoSuchElementException::new));
        DogEntity dogEntity = modelMapper.map(dogDto, DogEntity.class);
        dogRepository.save(dogEntity);
    }

    @Override
    public BreedEntity findBreed(Integer breedCode) {
        return breedRepository.findById(breedCode).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public List<DogDto> getDogInfoByUserIdx(Long userIdx) {
        return dogRepository.findAllByUserUserIdx(userIdx).stream()
                .map(dogEntity -> new ModelMapper().map(dogEntity, DogDto.class))
                .collect(Collectors.toList());
    }
}
