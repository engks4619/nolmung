package com.a703.spot.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
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
    Integer reviewCnt;
    Double star;

}
