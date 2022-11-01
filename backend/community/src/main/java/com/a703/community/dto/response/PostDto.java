package com.a703.community.dto.response;

import com.a703.community.dto.response.connection.DogInfoDto;
import com.a703.community.type.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class PostDto {

    private List<DogInfoDto> dogInfoList;

    private String writer;

    private Boolean getLike;

    private CategoryType categoryType;

    private String subject;

    private String content;

    private String location;

    private Integer pay;

    private Boolean leadLine;

    private Boolean poopBag;

    private LocalDateTime walkDate;

    private LocalDateTime modifyDate;

    private List<String> photoUrl;
}
