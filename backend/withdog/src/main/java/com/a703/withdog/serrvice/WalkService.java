package com.a703.withdog.serrvice;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.repository.WalkMongoDBRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalkService {
    @Autowired
    WalkMongoDBRepository walkMongoDBRepository;

    public int saveWalk(WalkDTO walk){
        WalkDTO walkDTO = walkMongoDBRepository.save(walk);
        return walkDTO.getWalkIdx();
    }
}
