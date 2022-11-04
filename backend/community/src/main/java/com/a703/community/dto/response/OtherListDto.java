package com.a703.community.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class OtherListDto {

    List<OtherDto> otherDtoList;
    private Integer totalPage;
}
