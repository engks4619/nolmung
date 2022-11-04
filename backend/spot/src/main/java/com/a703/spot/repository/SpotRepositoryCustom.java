package com.a703.spot.repository;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotSimpleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SpotRepositoryCustom {
    Page<SpotSimpleDto> search(SpotRequest request, Pageable pageable);
    Page<SpotSimpleDto> searchByStar(SpotRequest request, Pageable pageable);
    Page<SpotSimpleDto> searchByReviewCnt(SpotRequest request, Pageable pageable);

    Double getDistanceBySpotId(Double lng, Double lat, String spotId);
}
