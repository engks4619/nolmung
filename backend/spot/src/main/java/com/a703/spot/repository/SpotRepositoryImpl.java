package com.a703.spot.repository;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotTransferDto;
import com.a703.spot.entity.QSpotReview;
import com.a703.spot.entity.Spot;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

import static com.a703.spot.entity.QSpot.spot;
import static com.a703.spot.entity.QSpotReview.spotReview;

@RequiredArgsConstructor
public class SpotRepositoryImpl implements SpotRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<SpotDto> search(SpotRequest request, Pageable pageable) {
        QueryResults<SpotTransferDto> list = queryFactory
                .select(Projections.fields(SpotTransferDto.class,
                    spot.spotId, spot.name, spot.address, spot.tel,
                    spot.tag, spot.time, spot.menu, spot.description,
                    spot.lat, spot.lng, spot.imgCnt, spot.category,
                    Expressions.stringTemplate("ST_Distance_Sphere({0}, {1})",
                        Expressions.stringTemplate("POINT({0}, {1})",
                                request.getLng(),
                                request.getLat()
                        ),
                        Expressions.stringTemplate("POINT({0}, {1})",
                                spot.lng,
                                spot.lat
                        )).as("distance_diff"),
                        Expressions.stringTemplate("COUNT({0})", spotReview.reviewIdx),
                        Expressions.stringTemplate("AVG({0})", spotReview.star)

                    )
                )
                .from(spot)
                .leftJoin(spot, spotReview.spot)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .orderBy(Expressions.stringTemplate("ST_Distance_Sphere({0}, {1})",
                        Expressions.stringTemplate("POINT({0}, {1})",
                                request.getLat(),
                                request.getLat()
                        ),
                        Expressions.stringTemplate("POINT({0}, {1})",
                                spot.lng,
                                spot.lat
                        )).asc())
                .fetchResults();

        Page<SpotDto> result;

        return null;
    }
}
