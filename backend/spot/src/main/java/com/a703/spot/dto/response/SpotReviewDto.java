package com.a703.spot.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SpotReviewDto {
    Long reviewIdx;
    String spotId;
    Double star;
    String content;
    Boolean isDeleted;
    Long userIdx;
}
