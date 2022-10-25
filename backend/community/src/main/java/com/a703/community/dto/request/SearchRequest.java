package com.a703.community.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SearchRequest {

    private LocalDateTime startWalkDate;

    private LocalDateTime endWalkDate;

    private Integer pay;

    private String dogBreed;

    private String location;
}
