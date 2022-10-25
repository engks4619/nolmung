package com.a703.spot.mapper;

import com.a703.spot.common.EntityMapper;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.entity.Spot;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface SpotMapper extends EntityMapper<SpotDto, Spot> {
    SpotMapper mapper = Mappers.getMapper(SpotMapper.class);

    @Override
    SpotDto toDto(final Spot entitiy);

    @Override
    Spot toEntity(final SpotDto dto);

    List<SpotDto> toDtoList(List<Spot> entitiyList);
    List<Spot> toEntityList(List<SpotDto> dtoList);
}
