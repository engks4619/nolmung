package com.a703.spot.repository;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotSimpleDto;
import com.a703.spot.dto.response.SpotTransferDto;
import com.a703.spot.mapper.SpotMapper;
import com.querydsl.core.Tuple;
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
import static com.a703.spot.entity.QSpotReview.spotReview;

@Repository
@RequiredArgsConstructor
public class SpotRepositoryImpl implements SpotRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;
    private final SpotMapper spotMapper;
    private final SpotReviewRepository spotReviewRepository;

    private NumberTemplate distanceExpression;
    private NumberTemplate limitDistance;
    private Path<Double> distanceDiff = Expressions.numberPath(Double.class, "distance");

    /**
     * 산책 스팟 리스트 현 위치 기준 검색
     * @param request
     * @param pageable
     * @return
     */
    @Override
    public Page<SpotSimpleDto> search(SpotRequest request, Pageable pageable) {
        distanceExpression = getDistanceExpression(request.getLng(), request.getLat());
        limitDistance = getLimitDistanceExpression(request.getLimitDistance());
        //스팟 리스트
        List<SpotSimpleDto> content = queryFactory
                .select(Projections.constructor(SpotSimpleDto.class,
                        spot.spotId, spot.name, spot.imgCnt,
                        spot.lat, spot.lng, spot.address, spot.category,
                        distanceExpression.as(String.valueOf(distanceDiff))
                    )
                )
                .from(spot)
                .where(distanceExpression.loe(limitDistance),
                        spot.name.contains(request.getSearchValue()),
                        spot.category.eq(request.getCategory())
                )
                .orderBy(((ComparableExpressionBase<Double>) distanceDiff).asc())
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        // count query
        Long totalCount = getTotalCount(request.getSearchValue(), request.getCategory());
        return new PageImpl<>(getContentList(content), pageable, totalCount);
    }

    @Override
    public Page<SpotSimpleDto> searchByStar(SpotRequest request, Pageable pageable) {
        distanceExpression = getDistanceExpression(request.getLng(), request.getLat());
        limitDistance = getLimitDistanceExpression(request.getLimitDistance());
        //스팟 리스트
        List<SpotSimpleDto> content = queryFactory
                .select(Projections.constructor(SpotSimpleDto.class,
                        spot.spotId, spot.name, spot.imgCnt,
                        spot.lat, spot.lng, spot.address, spot.category,
                        distanceExpression.as(String.valueOf(distanceDiff))
                    )
                )
                .from(spot)
                .leftJoin(spotReview).on(spot.spotId.eq(spotReview.spot.spotId),
                        spotReview.deleted.eq(false))
                .where(distanceExpression.loe(limitDistance),
                        spot.name.contains(request.getSearchValue()),
                        spot.category.eq(request.getCategory())
                )
                .orderBy(spotReview.star.avg().desc().nullsLast(),
                        spot.spotId.count().desc().nullsLast(),
                        ((ComparableExpressionBase<Double>) distanceDiff).asc())
                .groupBy(spot.spotId)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();
        // count query
        Long totalCount = getTotalCount(request.getSearchValue(), request.getCategory());
        return new PageImpl<>(getContentList(content), pageable, totalCount);
    }

    @Override
    public Page<SpotSimpleDto> searchByReviewCnt(SpotRequest request, Pageable pageable) {
        distanceExpression = getDistanceExpression(request.getLng(), request.getLat());
        limitDistance = getLimitDistanceExpression(request.getLimitDistance());
        //스팟 리스트
        List<SpotSimpleDto> content = queryFactory
                .select(Projections.constructor(SpotSimpleDto.class,
                        spot.spotId, spot.name, spot.imgCnt,
                        spot.lat, spot.lng, spot.address, spot.category,
                        distanceExpression.as(String.valueOf(distanceDiff))
                    )
                )
                .from(spot)
                .leftJoin(spotReview).on(spot.spotId.eq(spotReview.spot.spotId),
                        spotReview.deleted.eq(false))
                .where(distanceExpression.loe(limitDistance),
                        spot.name.contains(request.getSearchValue()),
                        spot.category.eq(request.getCategory())
                )
                .orderBy(spot.spotId.count().desc().nullsLast(),
                        spotReview.star.avg().desc().nullsLast(),
                        ((ComparableExpressionBase<Double>) distanceDiff).asc())
                .groupBy(spot.spotId)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();
        // count query
        Long totalCount = getTotalCount(request.getSearchValue(), request.getCategory());
        return new PageImpl<>(getContentList(content), pageable, totalCount);
    }

    @Override
    public Double getDistanceBySpotId(Double lng, Double lat, String spotId) {
        distanceExpression = getDistanceExpression(lng, lat);
        return queryFactory
                .select(Projections.tuple(distanceExpression.as(String.valueOf(distanceDiff))))
                .from(spot)
                .where(spot.spotId.eq(spotId))
                .fetchOne().get(distanceDiff);
    }

    private NumberTemplate getDistanceExpression(double lng, double lat) {
        return Expressions.numberTemplate(Double.class, "ST_Distance_Sphere({0}, {1})",
                Expressions.stringTemplate("POINT({0}, {1})",
                        lng,
                        lat
                ),
                Expressions.stringTemplate("POINT({0}, {1})",
                        spot.lng,
                        spot.lat
                ));
    }

    private NumberTemplate getLimitDistanceExpression(int limitDistance) {
        return Expressions.numberTemplate(Double.class, "{0}", limitDistance);
    }

    private Long getTotalCount(String serachValue, String category) {
        return queryFactory
                .select(spot.count())
                .from(spot)
                .where(distanceExpression.loe(limitDistance),
                        spot.name.contains(serachValue),
                        spot.category.eq(category))
                .fetchOne();
    }

    private List<SpotSimpleDto> getContentList(List<SpotSimpleDto> transferContent) {
        List<SpotSimpleDto> result = new ArrayList<>();
        for (SpotSimpleDto transferDto : transferContent) {
            // 산책스팟 정보 매핑
            // 리뷰 정보 매핑
            transferDto.setStar(spotReviewRepository.getStarAvg(transferDto.getSpotId()));
            transferDto.setReviewCnt(spotReviewRepository.getReviewCnt(transferDto.getSpotId()));
            result.add(transferDto);
        }
        return result;
    }

//    private List<SpotDto> getContentList(List<SpotTransferDto> transferContent) {
//        List<SpotDto> result = new ArrayList<>();
//        for (SpotTransferDto transferDto : transferContent) {
//            // 산책스팟 정보 매핑
//            SpotDto spotDto = spotMapper.TransferDtoToDto(transferDto);
//            // 리뷰 정보 매핑
//            spotDto.setStar(spotReviewRepository.getStarAvg(transferDto.getSpotId()));
//            spotDto.setReviewCnt(spotReviewRepository.getReviewCnt(transferDto.getSpotId()));
//            result.add(spotDto);
//        }
//        return result;
//    }
}
