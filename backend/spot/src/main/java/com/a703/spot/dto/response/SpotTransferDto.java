package com.a703.spot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotTransferDto {
    String spotId;
    String name;
    String address;
    String tel;
    String tag;
    String time;
    String menu;
    String description;
    Double lat;
    Double lng;
    Integer imgCnt;
    String category;
    Double distanceDiff;
}
