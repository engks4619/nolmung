package com.a703.spot.repository;

public interface SpotReviewRepositoryCustom {
    Long getReviewCnt(String spotId);
    Double getStarAvg(String spotId);
}
