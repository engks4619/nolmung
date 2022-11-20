package com.a703.spot.dto.response;

import com.a703.spot.dto.response.connection.UserInfoDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@ToString
public class SpotReviewDto {
    Long reviewIdx;
    String spotId;
    Double star;
    String content;
    Boolean deleted;
    Long userIdx;
    LocalDateTime createDate;
    LocalDateTime modifyDate;
    String nickname;
    String profileImage;
    List<String> photoList;

    public void setPhotoList(List<String> photoList) {
        this.photoList = photoList;
    }
}
