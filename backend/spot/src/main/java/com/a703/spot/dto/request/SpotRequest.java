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
    private double lat;
    private double lng;
    private String searchValue;
    private int limitDistance;
    private String descType;
    private String category;
}
