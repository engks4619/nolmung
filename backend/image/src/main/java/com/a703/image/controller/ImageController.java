package com.a703.image.controller;

import com.a703.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/image")
public class ImageController {

    private final ImageService imageService;
    private final Environment env;

    @PostMapping
    public ResponseEntity<?> fileUpload(@RequestPart MultipartFile file,@RequestPart String savePath) throws Exception {

        imageService.uploadImg(file,savePath);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/health_check")
    public ResponseEntity<?> healthCheck(){
        return ResponseEntity.status(HttpStatus.OK).body(String.format("Image server is running on PORT : %s", env.getProperty("local.server.port")));
    }
}
