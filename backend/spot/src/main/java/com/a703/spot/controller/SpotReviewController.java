package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotReviewRequest;
import com.a703.spot.properties.ResponseProperties;
import com.a703.spot.service.SpotReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spot/spot-review")
public class SpotReviewController {

    private final SpotReviewService spotReviewService;
    private final ResponseProperties responseProperties;

    @PostMapping
    public ResponseEntity<String> registReview(@RequestPart  SpotReviewRequest request,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                                        @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        spotReviewService.registReview(request, token, files);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseProperties.getSuccess());
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
