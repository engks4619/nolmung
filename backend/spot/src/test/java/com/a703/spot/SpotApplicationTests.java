package com.a703.spot;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.*;
import com.a703.spot.entity.QSpot;
import com.a703.spot.entity.Spot;
import com.a703.spot.mapper.SpotMapper;
import com.a703.spot.repository.SpotRepository;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.a703.spot.entity.QSpot.spot;
import static com.a703.spot.entity.QSpotReview.spotReview;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SpotApplicationTests {

    @Autowired
    SpotRepository spotRepository;

//    SpotMapper spotMapper;

    @Autowired
    EntityManager em;

    JPAQueryFactory queryFactory;

    //    @Test
    void contextLoads() {
    }
//    @Test
//    void distanceTest() {
//        double lat = 37.511468; // 내 위치 y
//        double lng = 127.121504; // 내 위치 x
//        int distance = 2000; // meter 단위
//        Specification<SpotDtoInterface> spec = (root, query, criteriaBuilder) -> null;
//        Pageable pageable = PageRequest.of(1, 10);
//        Page<SpotTransferDto> pageSpots = spotRepository.getSpotByDistance(lng, lat, distance, pageable).orElse(null);
//        System.out.println(pageSpots.getContent());
//        List<SpotDto> spotDtoList = new ArrayList<>();
//        List<SpotTransferDto> spotTransferDtoList = pageSpots.getContent();
//        for(SpotTransferDto spottransferDto : spotTransferDtoList){
//            System.out.println(spottransferDto);
//            SpotDto spotDto = spotMapper.TransferDtoToDto(spottransferDto);
//            spotDtoList.add(spotDto);
//        }
//        SpotListDto result = SpotListDto.builder()
//                        .spotDtoList(spotDtoList)
//                        .totalPage(pageSpots.getTotalPages())
//                        .build();
////        System.out.println(result);
//
//    }

    @Test
    void queryDslTest() {
        queryFactory = new JPAQueryFactory(em);

        double currLat = 37.511468; // 내 위치 y
        double currLng = 127.121504; // 내 위치 x
        int distance = 2000; // meter 단위
        SpotRequest request = new SpotRequest(currLat, currLng, "", distance, 0, "식당");
        Pageable pageable = PageRequest.of(0, 10);
        Path<Double> distanceDiff = Expressions.numberPath(Double.class, "distance_diff");
        List<SpotTransferDto> content = queryFactory
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
                                        )).as(String.valueOf(distanceDiff))
                        )
                )
                .from(spot)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .orderBy(((ComparableExpressionBase<Double>) distanceDiff).asc())
                .fetch();
        //count query 추가 작성 예정
    }

}
