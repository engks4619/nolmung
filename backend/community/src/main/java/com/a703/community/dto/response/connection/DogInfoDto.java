package com.a703.community.dto.response.connection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown =true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DogInfoDto {

    private List<String> dogBreed;

    private List<String> dogName;

    private List<String> dogImgUrl;


}
