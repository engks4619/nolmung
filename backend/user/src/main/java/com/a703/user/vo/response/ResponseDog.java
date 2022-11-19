package com.a703.user.vo.response;

import lombok.Data;

@Data
public class ResponseDog {
    private Long dogIdx;
    private String dogName;
    private Boolean neuter;
    private Boolean vaccination;
    private Character gender;
    private String image;
    private String breedCodeValue;
}
