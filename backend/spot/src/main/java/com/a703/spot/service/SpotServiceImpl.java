package com.a703.spot.service;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.*;
import com.a703.spot.entity.ReviewPhoto;
import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import com.a703.spot.exception.SpotException;
import com.a703.spot.exception.model.SpotErrorCode;
import com.a703.spot.mapper.SpotMapper;
import com.a703.spot.mapper.SpotReviewMapper;
import com.a703.spot.properties.ConstProperties;
import com.a703.spot.repository.ReviewPhotoRepository;
import com.a703.spot.repository.SpotRepository;
import com.a703.spot.repository.SpotReviewRepository;
import com.a703.spot.util.ClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpotServiceImpl implements SpotService {

    private final ConstProperties constProperties;
    private final SpotRepository spotRepository;
    private final SpotReviewRepository spotReviewRepository;
    private final ReviewPhotoRepository reviewPhotoRepository;
    private final SpotMapper spotMapper;

    @Override
    public SpotListDto getSpotList(SpotRequest request, int page, int sort) {

        //페이지네이션
        Pageable pageable = PageRequest.of(page, constProperties.getSpotListSize());
        Page<SpotSimpleDto> pageSpots = null;
        if(sort == 1) { // 별점순
            pageSpots = spotRepository.searchByStar(request, pageable);
        }else if(sort == 2) { // 리뷰 많은 순
            pageSpots = spotRepository.searchByReviewCnt(request, pageable);
        }else { // 기본(거리 가까운 순)
            pageSpots = spotRepository.search(request, pageable);
        }

        return new SpotListDto(pageSpots.getContent(), pageSpots.getTotalPages());
    }

    @Override
    public SpotDetailDto getSpotDetail(Double lng, Double lat, String spotId) {
        Spot spot = spotRepository.findBySpotId(spotId).orElseThrow(
                () -> new SpotException(SpotErrorCode.SPOT_NOT_FOUND)
        );
        SpotDto spotDto = spotMapper.EntityToDto(spot);
        spotDto.setReviewCnt(spotReviewRepository.getReviewCnt(spotId));
        spotDto.setDistance(spotRepository.getDistanceBySpotId(lng, lat, spotId));
        spotDto.setStar(spotReviewRepository.getStarAvg(spotId));
        List<SpotReview> reviewEntityList = spotReviewRepository.findBySpot(spot);
        List<SpotReviewDto> reviewList = new ArrayList<>();
        for(SpotReview spotReview : reviewEntityList) {
            SpotReviewDto spotReviewDto = SpotReviewMapper.mapper.toDto(spotReview);
            List<String> photoList = new ArrayList<>();
            for(ReviewPhoto reviewPhoto : reviewPhotoRepository.findBySpotReview(spotReview)){
                photoList.add(reviewPhoto.getPhotoUrl());
            }
            spotReviewDto.setPhotoList(photoList);
            reviewList.add(spotReviewDto);
        }
        return SpotDetailDto.builder()
                .spotDto(spotDto)
                .reviewList(reviewList)
                .build();
    }

}
