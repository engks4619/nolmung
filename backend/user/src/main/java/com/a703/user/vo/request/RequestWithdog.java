package com.a703.user.vo.request;

import lombok.Data;

@Data
public class RequestWithdog {
    private Long ownerIdx;
    private Long walkerIdx;
    private Double distance;
    private Integer time;
}