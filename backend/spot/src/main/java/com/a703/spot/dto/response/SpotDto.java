package com.a703.spot.dto.response;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SpotDto {
    private String spotId;
    private String name;
    private Integer imgCnt;
    private String address;
    private String tel;
    private String tag;
    private List<String> descList; // 캐주얼한, 점심식사, 저녁식사...
    private Map<String, String> time; // 운영일 : 운영시간
    private Map<String, String> menu; // 메뉴 이름 : 가격 (~원)
    private Double lat;
    private Double lng;
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
}
