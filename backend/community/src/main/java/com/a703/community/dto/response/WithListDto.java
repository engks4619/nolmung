package com.a703.community.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class WithListDto {

    private Long postIdx;

    private Long writerIdx;

    private String subject;

    private LocalDateTime modifyDate;

    private String location;

    private LocalDateTime walkDate;

    private Integer likeCnt;

    private String thumbnailUrl;

}
