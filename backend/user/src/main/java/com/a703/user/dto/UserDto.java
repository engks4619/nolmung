package com.a703.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
    private Long userIdx;
    private String phone;
    private String pwd;
    private Date createdAt;

    private String encryptedPwd;
}
