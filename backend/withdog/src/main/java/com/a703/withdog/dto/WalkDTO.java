package com.a703.withdog.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.awt.geom.GeneralPath;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@Document(collection = "walk")
public class WalkDTO {

    @Id
    private ObjectId walkIdx;   // 산책 기록 번호

    private Long ownerIdx;  // 견주 번호
    private Long walkerIdx; // 산책자 번호
    private double distance;    // 거리
    private int time;   // 시간
    private String courseImgUrl;    // 산책코스 이미지 URL

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") //데이터 포맷 변환
    Date startDate;     // 시작시간

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date endDate;       // 종료시간

    @Field("walked_dog_list")
    private List<Long> walkedDogList;    // 산책한 강아지들 ID

    @Field("gps_list")
    List<Double>[] gpsList;     // {위도, 경도}

    @Builder
    public WalkDTO(ObjectId walkIdx, Long ownerIdx, Long walkerIdx, double distance, int time, String courseImgUrl, Date startDate, Date endDate, List<Long> walkedDogList, List<Double>[] gpsList) {
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
}