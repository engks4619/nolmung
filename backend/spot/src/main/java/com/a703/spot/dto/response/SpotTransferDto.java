package com.a703.spot.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Data
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
    Double distance;
//    Double star;
//    Long reviewCnt;

    @QueryProjection
    public SpotTransferDto(String spotId, String name, String address, String tel, String tag, String time, String menu, String description, Double lat, Double lng, Integer imgCnt, String category, Double distance) {
        this.spotId = spotId;
        this.name = name;
        this.address = address;
        this.tel = tel;
        this.tag = tag;
        this.time = time;
        this.menu = menu;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.imgCnt = imgCnt;
        this.category = category;
        this.distance = distance;
    }

    @QueryProjection
    public SpotTransferDto(String spotId, String name, Double lat, Double lng, Integer imgCnt, String category, Double distance) {
        this.spotId = spotId;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.imgCnt = imgCnt;
        this.category = category;
        this.distance = distance;
    }
}
