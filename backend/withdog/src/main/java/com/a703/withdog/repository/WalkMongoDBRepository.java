package com.a703.withdog.repository;

import com.a703.withdog.dto.WalkDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface WalkMongoDBRepository extends MongoRepository<WalkDTO, Integer>{


    public WalkDTO save(WalkDTO walk);
    public List<WalkDTO> findAllByOwnerIdx(int ownerIdx);

    @Query("{'walkedDogList': ?0 }")
    public List<WalkDTO> findAllByWalkedDogIdx(int walkedDogIdx);
}
