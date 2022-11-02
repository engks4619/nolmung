package com.a703.user.vo;


import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestUser {

    @NotNull(message = "Email cannot be null")
    private String phone;

    @NotNull(message = "Password cannot be null")
    private String pwd;
}
