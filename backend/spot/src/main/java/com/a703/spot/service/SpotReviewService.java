package com.a703.spot.service;

import com.a703.spot.dto.request.SpotReviewRequest;

public interface SpotReviewService {

    void registReview(SpotReviewRequest request);
    void deleteReview(SpotReviewRequest request);
}
