package com.a703.spot.dto.response;

import com.a703.spot.dto.response.connection.UserInfoDto;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SpotReviewDto {
    Long reviewIdx;
    String spotId;
    Double star;
    String content;
    Boolean deleted;
//    Long userIdx;
    UserInfoDto userInfoDto;
    List<String> photoList;

    public void setUserInfoDto(UserInfoDto userInfoDto) {
        this.userInfoDto = userInfoDto;
    }
    public void setPhotoList(List<String> photoList) {
        this.photoList = photoList;
    }
}
