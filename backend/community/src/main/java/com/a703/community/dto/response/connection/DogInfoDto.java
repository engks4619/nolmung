package com.a703.community.dto.response.connection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@JsonIgnoreProperties(ignoreUnknown =true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DogInfoDto {

    private String breedCodeValue;

    private String dogName;

    private String image;

    private Long dogIdx;

    private Boolean neuter;

    private Boolean vaccination;

    private Character gender;


}
