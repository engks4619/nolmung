package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotReviewRequest;
import com.a703.spot.dto.response.MessageResponse;
import com.a703.spot.properties.ResponseProperties;
import com.a703.spot.service.SpotReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spot-review")
public class SpotReviewController {

    private final SpotReviewService spotReviewService;
    private final ResponseProperties responseProperties;

    @PostMapping
    public ResponseEntity<MessageResponse> registReview(@RequestBody  SpotReviewRequest request) {
        spotReviewService.registReview(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(MessageResponse.of(
                        HttpStatus.OK,
                        responseProperties.getSuccess())
                );
    }

    @DeleteMapping
    public ResponseEntity<MessageResponse> deleteReview(@RequestBody SpotReviewRequest request) {
        spotReviewService.deleteReview(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(MessageResponse.of(
                        HttpStatus.OK,
                        responseProperties.getSuccess())
                );
    }
}
