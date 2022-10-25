package com.a703.spot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotDto {
    private String spotId;
    private String name;
    private int imgCnt;
    private String address;
    private String tel;
    private String tag;
    private List<String> descList; // 캐주얼한, 점심식사, 저녁식사...
    private Map<String, String> time; // 운영일 : 운영시간
    private Map<String, String> menu; // 메뉴 이름 : 가격 (~원)
    private double lat;
    private double lng;
    private double distance;
    private double star;
    private int reviewCnt;
}
