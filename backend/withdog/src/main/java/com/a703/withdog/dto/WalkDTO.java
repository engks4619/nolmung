package com.a703.withdog.dto;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Getter
@Document(collection = "walk")
public class WalkDTO {

    @Id
    int walk_idx;   // 산책 기록 번호
    int owner_idx;  // 견주 번호
    int walker_idx; // 산책자 번호
    double distance;    // 거리
    int time;   // 시간
    Date startDate;     // 시작시간
    Date endDate;       // 종료시간
    List<WalkedDog> walkedDogList;     // 산책한 강아지들
    List<GPS> GPSList;  // GPS 정보들
    String courseImgUrl;    // 산책코스 이미지



}
