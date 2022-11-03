package com.a703.user.vo;

import lombok.Data;

@Data
public class ResponseUser {
    private Long userIdx;
    private String phone;
    private String nickname;
    private String profileImage;
}
