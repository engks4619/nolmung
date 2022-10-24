package com.a703.withdog.repository;

import com.a703.withdog.dto.WalkDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

public interface WalkMongoDBRepository extends MongoRepository<WalkDTO, Integer> {

    WalkDTO saveWalk(WalkDTO walk);
}
