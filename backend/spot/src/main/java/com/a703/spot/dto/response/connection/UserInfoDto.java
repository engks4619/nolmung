package com.a703.spot.dto.response.connection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDto {
    private Long userIdx;
    private String userName;
    private String userProfile;
}