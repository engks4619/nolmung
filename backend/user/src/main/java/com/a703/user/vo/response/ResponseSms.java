package com.a703.user.vo.response;

import lombok.Data;

@Data
public class ResponseSms {
    private String requestId;
    private String requestTime;
    private String statusCode;
    private String statusName;
}