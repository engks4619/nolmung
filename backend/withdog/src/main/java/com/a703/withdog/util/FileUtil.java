package com.a703.withdog.util;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.repository.WalkMongoDBRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class FileUtil {

    private final WalkMongoDBRepository walkMongoDBRepository;
    private final ClientUtil clientUtil;

    public void fileUpload(MultipartFile image, ObjectId walkIdx){
        String uploadPath = "/image/walk";

        try {
            String savePath = uploadPath + java.io.File.separator + UUID.randomUUID() + "." + extractExt(image.getOriginalFilename());

            WalkDTO walkDTO = walkMongoDBRepository.findByWalkIdx(walkIdx);

            java.io.File check = new java.io.File(uploadPath);
            check.mkdir();
            clientUtil.saveImage(image, savePath);

            WalkDTO walkImage = WalkDTO.builder()
                    .walkIdx(walkDTO.getWalkIdx())
                    .ownerIdx(walkDTO.getOwnerIdx())
                    .walkerIdx(walkDTO.getWalkerIdx())
                    .distance(walkDTO.getDistance())
                    .time(walkDTO.getTime())
                    .courseImgUrl(savePath)
                    .startDate(walkDTO.getStartDate())
                    .endDate(walkDTO.getEndDate())
                    .walkedDogList(walkDTO.getWalkedDogList())
                    .latitudes(walkDTO.getLatitudes())
                    .longitudes(walkDTO.getLongitudes())
                    .build();
            walkMongoDBRepository.save(walkDTO);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

}
