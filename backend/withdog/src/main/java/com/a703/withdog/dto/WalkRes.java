package com.a703.withdog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;

import java.util.Date;
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
    private Date startDate;
    private Date endDate;
    private List<Long> walkedDogList;
}
