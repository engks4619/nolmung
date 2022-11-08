package com.a703.user.repository;

import com.a703.user.entity.DogEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends CrudRepository<DogEntity, Long> {

    Optional<DogEntity> findByDogIdx(Long dogIdx);
    List<DogEntity> findAllByBreedBreedCode(Integer breedCode);
}
