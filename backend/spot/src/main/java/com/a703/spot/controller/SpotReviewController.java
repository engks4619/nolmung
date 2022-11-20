package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotReviewRequest;
import com.a703.spot.exception.SpotReviewException;
import com.a703.spot.exception.model.ReviewErrorCode;
import com.a703.spot.properties.ResponseProperties;
import com.a703.spot.service.SpotReviewService;
import com.a703.spot.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spot/spot-review")
public class SpotReviewController {

    private final SpotReviewService spotReviewService;
    private final ResponseProperties responseProperties;

    private final FileUtil fileUtil;

    @PostMapping
    public ResponseEntity<?> registReview(@RequestBody  SpotReviewRequest request,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        Long reviewIdx = spotReviewService.registReview(request, token);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reviewIdx);
    }

    @PostMapping("file/{reviewIdx}")
    public ResponseEntity<?> registerFile(@RequestParam("files") List<MultipartFile> files,@PathVariable Long reviewIdx) throws IOException {

        //이미지 파일 업로드
        try {
            if (files != null) {
                for (MultipartFile multipartFile : files) {
                    fileUtil.fileUpload(multipartFile, reviewIdx);
                }
            }
        }catch (NoSuchFileException e) {
            throw new SpotReviewException(ReviewErrorCode.FILE_UPLOAD_FAILED);
        }

        return ResponseEntity.ok().body("success");
    }

    @DeleteMapping("{reviewIdx}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewIdx,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        spotReviewService.deleteReview(reviewIdx, token);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseProperties.getSuccess());
    }
}
