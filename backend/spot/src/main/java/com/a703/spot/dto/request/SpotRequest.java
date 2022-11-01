package com.a703.spot.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotRequest {
    private Double lat;
    private Double lng;
    private String searchValue;
    private Integer limitDistance;
    private String category;
}
