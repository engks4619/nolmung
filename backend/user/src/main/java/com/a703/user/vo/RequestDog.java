package com.a703.user.vo;

import lombok.Data;

@Data
public class RequestDog {
    private String dogName;
    private Boolean neuter;
    private Boolean vaccination;
    private Character gender;
    private String image;
    private String description;
    private Integer breedCode;
}
