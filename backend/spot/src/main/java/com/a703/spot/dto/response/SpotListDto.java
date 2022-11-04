package com.a703.spot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotListDto {
    private List<SpotSimpleDto> spotDtoList;
    private int totalPage;
}
