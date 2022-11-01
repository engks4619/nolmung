package com.a703.community.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SearchRequest {

    private LocalDateTime startWalkDate;

    private LocalDateTime endWalkDate;

    private Integer startPay;

    private Integer endPay;

    private Integer dogBreed;

    private String location;
}
