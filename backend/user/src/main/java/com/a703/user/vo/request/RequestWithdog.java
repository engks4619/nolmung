package com.a703.user.vo.request;

import java.sql.Date;
import java.util.List;

public class RequestWithdog {
    private String walkIdx;
    private Long ownerIdx;
    private Long walkerIdx;
    private Double distance;
    private Integer time;
    private List<Long> walked_dog_list;
    private Date startDate;
}