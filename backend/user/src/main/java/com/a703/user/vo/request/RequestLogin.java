package com.a703.user.vo.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestLogin {

    @NotNull(message = "Phone number cannot be null")
    private String phone;

    @NotNull(message = "Password cannot be null")
    private String password;

}
