package com.a703.image.service;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifIFD0Directory;
import org.imgscalr.Scalr;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    public void uploadImg(MultipartFile file, String savePath) throws Exception {
        Path path = Paths.get(savePath);
        file.transferTo(path);
//        resizeImageFile(file, savePath, extractExt(file.getOriginalFilename()));

    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    private void resizeImageFile(MultipartFile file, String filePath, String formatName) throws Exception {
        // 이미지 읽어 오기
        BufferedImage inputImage = ImageIO.read(file.getInputStream());
        // 이미지 세로 가로 측정

        int rotate = 1;


        // 이미지 품질 설정
// Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
// Image.SCALE_FAST : 이미지 부드러움보다 속도 우선
// Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
// Image.SCALE_SMOOTH : 속도보다 이미지 부드러움을 우선
// Image.SCALE_AREA_AVERAGING : 평균 알고리즘 사용

        //회전후 저장 위해 메타데이터 읽기
        try {
            Metadata metadata = ImageMetadataReader.readMetadata(file.getInputStream());
            Directory directory = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);
            if (directory != null) {
                rotate = directory.getInt(ExifIFD0Directory.TAG_ORIENTATION);
            }
        } catch (Exception e) {
            System.out.println("메타데이터 읽기에서 에러");
            e.printStackTrace();
        }
        switch (rotate) {
            case 6:
                inputImage = Scalr.rotate(inputImage, Scalr.Rotation.CW_90);
                break;
            case 3:
                inputImage = Scalr.rotate(inputImage, Scalr.Rotation.CW_180);
                break;
            case 8:
                inputImage = Scalr.rotate(inputImage, Scalr.Rotation.CW_270);
        }
        int originWidth = inputImage.getWidth();
        int originHeight = inputImage.getHeight();
        // 변경할 가로 길이
        int newWidth = 500;
        if (originWidth > newWidth) {
            // 기존 이미지 비율을 유지하여 세로 길이 설정
            int newHeight = (originHeight * newWidth) / originWidth;

            Image resizeImage = inputImage.getScaledInstance(newWidth, newHeight, Image.SCALE_FAST);
            BufferedImage newImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
            Graphics graphics = newImage.getGraphics();
            graphics.drawImage(resizeImage, 0, 0, null);
            graphics.dispose();
            // 이미지 저장
            java.io.File newFile = new java.io.File(filePath);
            ImageIO.write(newImage, formatName, newFile);
        } else {
            file.transferTo(new java.io.File(filePath));
        }
    }
}
