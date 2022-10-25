package com.a703.spot.service;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.entity.Spot;
import com.a703.spot.properties.ConstProperties;
import com.a703.spot.repository.SpotRepository;
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
        if (request.getSearchValue() != null){
            spec = spec.and(SpotSpecification.containsName(request.getSearchValue()));
        }

        //페이지네이션
        Pageable pageable = getPageable(page, desc);
        Page<Spot> pageSpots = spotRepository.findAll(spec, pageable);
        List<Spot> spots = pageSpots.getContent();
        int totalPages =pageSpots.getTotalPages();

        List<Spot> list = new ArrayList<>();
        for(Spot spot : spots) {
//            SpotDto spotDto =
        }
        return null;
    }

    @Override
    public Pageable getPageable(int page, int desc) {
        int pageSize = constProperties.getSpotListSize();
        if (desc == 1) { // 별점 순
            return PageRequest.of(page, pageSize, Sort.by("star").descending());
        } else if (desc == 2) { // 리뷰 많은 순
//            return PageRequest.of(page, pageSize, Sort.by("reviewCnt").descending());
            return PageRequest.of(page, pageSize);
        } else { // 기본은 거리 가까운 순
//            return PageRequest.of(page, pageSize, Sort.by("distance").descending());
            return PageRequest.of(page, pageSize);
        }
    }
}
