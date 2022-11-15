package com.a703.user.vo.response;

import lombok.Data;

@Data
public class ResponseHistory {
    private ResponseUser reviewer;
    private ResponseUser reviewee;
    private Boolean owner;
    private Double star;
    private String review;
    private String recordIdx;
    private String createdAt;
}
