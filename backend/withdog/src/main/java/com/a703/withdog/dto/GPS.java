package com.a703.withdog.dto;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "gps")
public class GPS {

    @Id
    private ObjectId _id;

    private Double latitude;   // 위도
    private Double longitude;  // 경도
    private int time;       // 시간
    
}
