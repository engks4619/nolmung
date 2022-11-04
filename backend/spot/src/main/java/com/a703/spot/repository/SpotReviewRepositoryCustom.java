package com.a703.spot.repository;

import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;

import java.util.List;

public interface SpotReviewRepositoryCustom {
    Long getReviewCnt(String spotId);
    Double getStarAvg(String spotId);
    List<SpotReview> findBySpot(Spot spot);
}
