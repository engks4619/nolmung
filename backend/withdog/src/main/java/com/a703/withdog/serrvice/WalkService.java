package com.a703.withdog.serrvice;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.dto.WalkRes;
import com.a703.withdog.repository.WalkMongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WalkService {
    @Autowired
    WalkMongoDBRepository walkMongoDBRepository;

    public int saveWalk(WalkDTO walk){
        WalkDTO walkDTO = walkMongoDBRepository.save(walk);
        return walkDTO.getWalkIdx();
    }

    public List<WalkRes> findByOwnerIdx(int ownerIdx) {
        List<WalkDTO> walkDTOList = walkMongoDBRepository.findAllByOwnerIdx(ownerIdx);

        List<WalkRes> walkResList = new ArrayList<>();
        for(WalkDTO walk : walkDTOList) {
            walkResList.add(WalkRes.builder()
                            .walkIdx(walk.getWalkIdx())
                            .ownerIdx(walk.getOwnerIdx())
                            .walkerIdx(walk.getWalkerIdx())
                            .distance(walk.getDistance())
                            .time(walk.getTime())
                            .startDate(walk.getStartDate())
                            .endDate(walk.getEndDate())
                            .walkedDogList(walk.getWalkedDogList())
                            .build());
        }

        return walkResList;
    }

    public List<WalkRes> findByWalkedDog(int walkedDogIdx) {

        List<WalkDTO> walkDTOList = walkMongoDBRepository.findAllByWalkedDogIdx(walkedDogIdx);

        List<WalkRes> walkResList = new ArrayList<>();
        for(WalkDTO walk : walkDTOList) {
            walkResList.add(WalkRes.builder()
                    .walkIdx(walk.getWalkIdx())
                    .ownerIdx(walk.getOwnerIdx())
                    .walkerIdx(walk.getWalkerIdx())
                    .distance(walk.getDistance())
                    .time(walk.getTime())
                    .startDate(walk.getStartDate())
                    .endDate(walk.getEndDate())
                    .walkedDogList(walk.getWalkedDogList())
                    .build());
        }

        return walkResList;
    }
}
