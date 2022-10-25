package com.a703.withdog.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Getter
@Document(collection = "walk")
public class WalkDTO {
    @Id
    private int walkIdx;   // 산책 기록 번호

    private int ownerIdx;  // 견주 번호
    private int walkerIdx; // 산책자 번호
    private double distance;    // 거리
    private int time;   // 시간

    @JsonFormat(pattern = "yyyy.MM.dd") //데이터 포맷 변환
    Date startDate;     // 시작시간

    @JsonFormat(pattern = "yyyy.MM.dd")
    Date endDate;       // 종료시간

    @Field("walked_dog_list")
    private List<Integer> walkedDogList;    // 산책한 강아지들 ID
    //List<WalkedDog> walkedDogList;     // 산책한 강아지들

    @Field("gps_list")
    private List<GPS> GPSList;  // GPS 정보들
    //String courseImgUrl;    // 산책코스 이미지

    @Builder
    public WalkDTO(int walkIdx, int ownerIdx, int walkerIdx, double distance, int time, Date startDate, Date endDate, List<Integer> walkedDogList, List<GPS> GPSList) {
        this.walkIdx = walkIdx;
        this.ownerIdx = ownerIdx;
        this.walkerIdx = walkerIdx;
        this.distance = distance;
        this.time = time;
        this.startDate = startDate;
        this.endDate = endDate;
        this.walkedDogList = walkedDogList;
        this.GPSList = GPSList;
    }
}
