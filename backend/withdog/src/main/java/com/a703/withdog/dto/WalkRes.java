package com.a703.withdog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class WalkRes {
    private int walkIdx;
    private int ownerIdx;
    private int walkerIdx;
    private double distance;
    private int time;
    private Date startDate;
    private Date endDate;
    private List<Integer> walkedDogList;
}
