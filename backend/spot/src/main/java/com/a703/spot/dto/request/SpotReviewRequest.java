package com.a703.spot.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SpotReviewRequest {
    String spotId;
    Double star;
    String content;
    Long userIdx;
}
