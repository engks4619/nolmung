package com.a703.spot.util;

import com.a703.spot.entity.ReviewPhoto;
import com.a703.spot.entity.SpotReview;
import com.a703.spot.exception.SpotReviewException;
import com.a703.spot.exception.model.ReviewErrorCode;
import com.a703.spot.repository.ReviewPhotoRepository;
import com.a703.spot.repository.SpotReviewRepository;
import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifIFD0Directory;
import lombok.RequiredArgsConstructor;
import org.imgscalr.Scalr;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class FileUtil {

    private final SpotReviewRepository spotReviewRepository;
    private final ReviewPhotoRepository reviewPhotoRepository;

    private final ClientUtil clientUtil;

    public void fileUpload(MultipartFile file, Long reviewIdx) throws IOException {

        //        String uploadPath = java.io.File.separator + "profile_images" + java.io.File.separator + "community";
        String uploadPath = "/images/spot-review";

        try {
            String savePath = uploadPath + java.io.File.separator + UUID.randomUUID() + "." + extractExt(file.getOriginalFilename());

            SpotReview spotReview = spotReviewRepository.findByReviewIdx(reviewIdx).orElseThrow(
                    () -> new SpotReviewException(ReviewErrorCode.REVIEW_NOT_FOUND)
            );

            java.io.File check = new java.io.File(uploadPath);
//            if (check.exists()) {
//                java.io.File[] folder_list = check.listFiles(); //파일리스트 얻어오기
//
//                for (int j = 0; j < folder_list.length; j++) {
//                    folder_list[j].delete();
//                }
//                if(folder_list.length == 0 && check.isDirectory()){
//                    check.delete();
//                }
//            }
            check.mkdir();

            clientUtil.saveImage(file,savePath);
            ReviewPhoto reviewPhoto = ReviewPhoto.builder()
                    .spotReview(spotReview)
                    .photoUrl(savePath)
                    .build();
            reviewPhotoRepository.save(reviewPhoto);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
