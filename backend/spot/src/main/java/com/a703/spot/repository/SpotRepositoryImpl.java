package com.a703.spot.repository;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotTransferDto;
import com.a703.spot.mapper.SpotMapper;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.a703.spot.entity.QSpot.spot;

@Repository
@RequiredArgsConstructor
public class SpotRepositoryImpl implements SpotRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;
    private final SpotMapper spotMapper;
    private final SpotReviewRepository spotReviewRepository;

    /**
     * 산책 스팟 리스트 현 위치 기준 검색
     * @param request
     * @param pageable
     * @return
     */
    @Override
    public Page<SpotDto> search(SpotRequest request, Pageable pageable) {
        NumberTemplate distanceExpression = Expressions.numberTemplate(Double.class, "ST_Distance_Sphere({0}, {1})",
                Expressions.stringTemplate("POINT({0}, {1})",
                        request.getLng(),
                        request.getLat()
                ),
                Expressions.stringTemplate("POINT({0}, {1})",
                        spot.lng,
                        spot.lat
                ));
        NumberTemplate limitDistance = Expressions.numberTemplate(Double.class, "{0}", request.getLimitDistance());
        Path<Double> distanceDiff = Expressions.numberPath(Double.class, "distance");
        //스팟 리스트
        List<SpotTransferDto> transferContent = queryFactory
                .select(Projections.constructor(SpotTransferDto.class,
                                spot.spotId, spot.name, spot.address, spot.tel,
                                spot.tag, spot.time, spot.menu, spot.description,
                                spot.lat, spot.lng, spot.imgCnt, spot.category,
                                distanceExpression.as(String.valueOf(distanceDiff))
//                        Expressions.stringTemplate("{0}", 0).as("star"),
//                        Expressions.stringTemplate("{0}", 0.0).as("review_cnt")
                        )
                )
                .from(spot)
                .where(distanceExpression.loe(limitDistance),
                        spot.name.contains(request.getSearchValue()))
//                .where(distanceExpression.loe(limitDistance),
//                        spot.name.contains(request.getSearchValue()),
//                        spot.category.eq(request.getCategory())
//                )
                .orderBy(((ComparableExpressionBase<Double>) distanceDiff).asc())
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        // count query
        Long totalCount = queryFactory
                .select(spot.count())
                .from(spot)
                .where(distanceExpression.loe(limitDistance),
                spot.name.contains(request.getSearchValue()))
//                .where(distanceExpression.loe(limitDistance),
//                        spot.name.contains(request.getSearchValue()),
//                        spot.category.eq(request.getCategory()))
                .fetchOne();

        // SpotTransferDto to SpotDto 매핑
        List<SpotDto> content = new ArrayList<>();
        for (SpotTransferDto transferDto : transferContent) {
            // 산책스팟 정보 매핑
            SpotDto spotDto = spotMapper.TransferDtoToDto(transferDto);
            // 리뷰 정보 매핑
            spotDto.setStar(spotReviewRepository.getStarAvg(transferDto.getSpotId()));
            spotDto.setReviewCnt(spotReviewRepository.getReviewCnt(transferDto.getSpotId()));
            content.add(spotDto);
        }
        return new PageImpl<>(content, pageable, totalCount);

    }
}
