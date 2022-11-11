package com.a703.user.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userIdx;
    private String phone;
    private String password;
    private String nickname;
    private String profileImage;
}
