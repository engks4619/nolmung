package com.a703.withdog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class WalkRes {
    private String walkIdx;
    private Long ownerIdx;
    private Long walkerIdx;
    private double distance;
    private int time;
    private String courseImgUrl;
    private String startDate;
    private String endDate;
    private List<Long> walkedDogList;
    private List<GPS> gpsList;
}
