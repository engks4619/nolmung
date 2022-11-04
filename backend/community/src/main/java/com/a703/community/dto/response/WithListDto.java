package com.a703.community.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class WithListDto {

    List<WithDto> withDtoList;

    private Integer totalPage;
}
