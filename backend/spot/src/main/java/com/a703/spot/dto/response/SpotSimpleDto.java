package com.a703.spot.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SpotSimpleDto {
    private String spotId;
    private String name;
    private Integer imgCnt;
    private Double lat;
    private Double lng;
    private String address;
    private String category;
    private Double distance;
    private Double star;
    private Long reviewCnt;

    public void setStar(Double star) {
        this.star = star;
    }
    public void setReviewCnt(Long reviewCnt) {
        this.reviewCnt = reviewCnt;
    }
    public void setDistance(Double distance) { this.distance = distance; }

    @QueryProjection
    public SpotSimpleDto(String spotId, String name, Integer imgCnt, Double lat, Double lng, String address, String category, Double distance) {
        this.spotId = spotId;
        this.name = name;
        this.imgCnt = imgCnt;
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.category = category;
        this.distance = distance;
    }
}