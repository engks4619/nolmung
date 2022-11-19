package com.a703.user.repository;

import com.a703.user.entity.DogEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DogRepository extends CrudRepository<DogEntity, Long> {
    List<DogEntity> findAllByBreedBreedCodeAndDeletedIsFalse(Integer breedCode);
    List<DogEntity> findAllByUserUserIdxAndDeletedIsFalse(Long userIdx);
    Integer countByUserUserIdxAndDeletedIsFalse(Long userIdx);
}
