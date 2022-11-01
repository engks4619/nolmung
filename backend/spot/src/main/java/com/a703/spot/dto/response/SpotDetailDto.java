package com.a703.spot.dto.response;

import com.a703.spot.entity.SpotReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotDetailDto {
    private SpotDto spotDto;
    private List<SpotReviewDto> reviewList;
}
