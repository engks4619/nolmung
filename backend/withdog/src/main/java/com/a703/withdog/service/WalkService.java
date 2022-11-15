package com.a703.withdog.service;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.dto.WalkRes;
import com.a703.withdog.repository.WalkMongoDBRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WalkService {
    @Autowired
    WalkMongoDBRepository walkMongoDBRepository;

    public String saveWalk(WalkDTO walk){
        WalkDTO walkDTO = walkMongoDBRepository.save(walk);
        return walkDTO.getWalkIdx().toString();
    }

    public List<WalkRes> findByOwnerIdx(Long ownerIdx) {
        List<WalkDTO> walkDTOList = walkMongoDBRepository.findAllByOwnerIdx(ownerIdx);

        List<WalkRes> walkResList = new ArrayList<>();
        for(WalkDTO walk : walkDTOList) {
            walkResList.add(WalkRes.builder()
                            .walkIdx(walk.getWalkIdx().toString())
                            .ownerIdx(walk.getOwnerIdx())
                            .walkerIdx(walk.getWalkerIdx())
                            .distance(walk.getDistance())
                            .time(walk.getTime())
                            .startDate(walk.getStartDate())
                            .endDate(walk.getEndDate())
                            .walkedDogList(walk.getWalkedDogList())
                            .gpsList(walk.getGpsList())
                            .build());
        }

        return walkResList;
    }

    public List<WalkRes> findByWalkedDog(Long walkedDogIdx) {

        List<WalkDTO> walkDTOList = walkMongoDBRepository.findAllByWalkedDogIdx(walkedDogIdx);

        List<WalkRes> walkResList = new ArrayList<>();
        for(WalkDTO walk : walkDTOList) {
            walkResList.add(WalkRes.builder()
                    .walkIdx(walk.getWalkIdx().toString())
                    .ownerIdx(walk.getOwnerIdx())
                    .walkerIdx(walk.getWalkerIdx())
                    .distance(walk.getDistance())
                    .time(walk.getTime())
                    .startDate(walk.getStartDate())
                    .endDate(walk.getEndDate())
                    .walkedDogList(walk.getWalkedDogList())
                    .gpsList(walk.getGpsList())
                    .build());
        }

        return walkResList;
    }
}
