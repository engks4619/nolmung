package com.a703.withdog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@NoArgsConstructor
@Document(collection = "gps")
public class GPS {

    @Id
    private ObjectId gpsIdx;   // gps 아이디

    private List<Double> latitudes;     // 위도

    private List<Double> longitudes;    // 경도
}
