package com.a703.withdog.repository;

import com.a703.withdog.dto.WalkDTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface WalkMongoDBRepository extends MongoRepository<WalkDTO, ObjectId>{


    public WalkDTO save(WalkDTO walk);
    public List<WalkDTO> findAllByOwnerIdx(Long ownerIdx);

//    @Query("{'_id: ?0 }")
//    public WalkDTO findByWalkIdx(String walkIdx);

    @Query("{'walkedDogList': ?0 }")
    public List<WalkDTO> findAllByWalkedDogIdx(Long walkedDogIdx);
}
