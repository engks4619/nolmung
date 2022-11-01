package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotReviewRequest;
import com.a703.spot.dto.response.MessageResponse;
import com.a703.spot.properties.ResponseProperties;
import com.a703.spot.service.SpotReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spot-review")
public class SpotReviewController {

    private final SpotReviewService spotReviewService;
    private final ResponseProperties responseProperties;

    @PostMapping
    public ResponseEntity<MessageResponse> registReview(@RequestPart  SpotReviewRequest request,
                                                        @RequestHeader Map<String, Object> token,
                                                        @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        spotReviewService.registReview(request, token, files);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(MessageResponse.of(
                        HttpStatus.OK,
                        responseProperties.getSuccess())
                );
    }

    @DeleteMapping("{reviewIdx}")
    public ResponseEntity<MessageResponse> deleteReview(@PathVariable Long reviewIdx,
                                                        @RequestHeader Map<String, Object> token) {
        spotReviewService.deleteReview(reviewIdx, token);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(MessageResponse.of(
                        HttpStatus.OK,
                        responseProperties.getSuccess())
                );
    }
}
