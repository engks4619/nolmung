package com.a703.withdog.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter
@RequiredArgsConstructor
@Document(collection = "walk")
public class WalkDTO {

    @Id
    private ObjectId walkIdx;   // 산책 기록 번호

    private Long ownerIdx;      // 견주 번호
    private Long walkerIdx;     // 산책자 번호
    private double distance;    // 거리
    private int time;           // 시간
    private String courseImgUrl;    // 산책코스 이미지 URL
    private String startDate;
    private String endDate;

    @Field("walked_dog_list")
    private List<Long> walkedDogList;    // 산책한 강아지들 ID

    @Field("gps_list")
    private List<GPS> gpsList;

    @Builder
    public WalkDTO(ObjectId walkIdx, Long ownerIdx, Long walkerIdx, double distance, int time, String courseImgUrl, String startDate, String endDate, List<Long> walkedDogList, List<GPS> gpsList) {
        this.walkIdx = walkIdx;
        this.ownerIdx = ownerIdx;
        this.walkerIdx = walkerIdx;
        this.distance = distance;
        this.time = time;
        this.courseImgUrl = courseImgUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.walkedDogList = walkedDogList;
        this.gpsList = gpsList;
    }

    public void setCourseImgUrl(String courseImgUrl){
        this.courseImgUrl = courseImgUrl;
    }
}
