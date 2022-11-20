package com.a703.user.vo.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RequestSms {
    private String type;
    private String from;
    private String content;
    private List<Message> messages;
}
