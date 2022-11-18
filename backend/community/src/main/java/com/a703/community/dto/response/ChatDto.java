package com.a703.community.dto.response;

import com.a703.community.type.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class ChatDto {

    private Long postIdx;

    private Long chatUserIdx;

    private String nickname;

    private String userImgUrl;;

    private String thumbnailUrl;

    private String subject;

    private Boolean isOwner;

    private CategoryType categoryType;

}
