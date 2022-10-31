package com.a703.spot;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.*;
import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import com.a703.spot.mapper.SpotMapper;
import com.a703.spot.mapper.SpotReviewMapper;
import com.a703.spot.repository.SpotRepository;
import com.a703.spot.repository.SpotReviewRepository;
import com.a703.spot.service.SpotService;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.a703.spot.entity.QSpot.spot;

@RunWith(SpringRunner.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SpringBootTest(classes = SpotApplication.class)
class SpotApplicationTests {

    @Autowired
    private SpotRepository spotRepository;

    @Autowired
    private SpotReviewRepository spotReviewRepository;

    @Autowired
    private SpotMapper spotMapper;

    @Autowired
    EntityManager em;

    JPAQueryFactory queryFactory;

    @Autowired
    SpotService spotService;


    @Test
    void contextLoads() {}

//    @Test
    void queryDslTest() {
        queryFactory = new JPAQueryFactory(em);
//        spotCustomMapper = new SpotCustomMapper();
        double currLat = 37.511468; // 내 위치 y
        double currLng = 127.121504; // 내 위치 x
        int distance = 2000; // meter 단위
        SpotRequest request = new SpotRequest(currLat, currLng, "", distance, "식당");
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
        Pageable pageable = PageRequest.of(0, 10);
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
                .orderBy(((ComparableExpressionBase<Double>) distanceDiff).asc())
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        // 총 페이지 수 count query
        Long totalPage = queryFactory
                .select(spot.count())
                .from(spot)
                .where(distanceExpression.loe(limitDistance),
                        spot.name.contains(request.getSearchValue()))
                .fetchOne() / pageable.getPageSize();

        // SpotTransferDto to SpotDto 매핑
        List<SpotDto> content = new ArrayList<>();
        for (SpotTransferDto transferDto : transferContent) {
            SpotDto spotDto = spotMapper.TransferDtoToDto(transferDto);
            content.add(spotDto);
        }
        Page<SpotDto> result = new PageImpl<>(content, pageable, totalPage);

    }

    @Test
    public void SpotRepoTest() {
        double currLat = 37.511468; // 내 위치 y
        double currLng = 127.121504; // 내 위치 x
        int distance = 2000; // meter 단위
        SpotRequest request = new SpotRequest(currLat, currLng, "", distance, "카페");
        Pageable pageable = PageRequest.of(0, 10);
        spotRepository.search(request, pageable);
    }

    @Test
    public void SpotServiceTest() {
        double currLat = 37.511468; // 내 위치 y
        double currLng = 127.121504; // 내 위치 x
        int distance = 2000; // meter 단위
        SpotRequest request = new SpotRequest(currLat, currLng, "", distance, "카페");
        int page = 9;
        int desc = 0;
        SpotListDto result = spotService.getSpotList(request, page, desc);
        System.out.println("totalPage : " + result.getTotalPage());
        for(SpotDto spotDto : result.getSpotDtoList()) {
            System.out.println(spotDto);
        }
    }

    @Test
    public void SpotReviewRepoTest() {
        SpotReviewDto spotReviewDto =
                SpotReviewDto.builder()
                        .spotId("3s4OsGqFUPwb")
                        .content("테스트123")
                        .star(2.0)
                        .userIdx(3L)
                        .isDeleted(false)
                        .build();
        spotReviewRepository.save(SpotReviewMapper.mapper.toEntity(spotReviewDto));
//        spotReviewRepository.save(spotReview);
    }
}
