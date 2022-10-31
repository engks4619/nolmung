package com.a703.spot.service;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.entity.Spot;
import com.a703.spot.properties.ConstProperties;
import com.a703.spot.repository.SpotRepository;
import com.a703.spot.repository.SpotReviewRepository;
import com.a703.spot.service.specification.SpotSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpotServiceImpl implements SpotService {

    private final ConstProperties constProperties;
    private final SpotRepository spotRepository;

    @Override
    public SpotListDto getSpotList(SpotRequest request, int page, int desc) {
        // 검색 조건 설정
        Specification<Spot> spec = (root, query, criteriaBuilder) -> null;
        if (request.getSearchValue() != null){ // 검색어 있을 경우 포함
            spec = spec.and(SpotSpecification.containsName(request.getSearchValue()));
        }

        //페이지네이션
        Pageable pageable = PageRequest.of(page, constProperties.getSpotListSize());
        Page<SpotDto> pageSpots = null;
        if(desc == 1) { // 별점순
            pageSpots = spotRepository.searchByStar(request, pageable);
        }else if(desc == 2) { // 리뷰 많은 순
            pageSpots = spotRepository.searchByReviewCnt(request, pageable);
        }else { // 기본(거리 가까운 순)
            pageSpots = spotRepository.search(request, pageable);
        }

        return new SpotListDto(pageSpots.getContent(), pageSpots.getTotalPages());
    }

}
