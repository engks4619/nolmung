package com.a703.community.dto.response;

import com.a703.community.type.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MainListDto {

    private Long postIdx;

    private String subject;

    private CategoryType categoryType;

    private Integer likeCnt;

    private Integer chatCnt;


}
