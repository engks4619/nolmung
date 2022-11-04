package com.a703.spot.mapper;

import com.a703.spot.dto.response.SpotReviewDto;
import com.a703.spot.entity.SpotReview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SpotReviewMapper extends EntitiyMapper<SpotReviewDto, SpotReview> {
    SpotReviewMapper mapper = Mappers.getMapper(SpotReviewMapper.class);

    @Override
    @Mapping(source = "spotId", target = "spot.spotId")
    SpotReview toEntity(final SpotReviewDto dto);

    @Override
    @Mapping(source = "spot.spotId", target = "spotId")
    SpotReviewDto toDto(final SpotReview entitiy);
}
