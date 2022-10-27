package com.a703.spot;

import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotDtoInterface;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.dto.response.SpotTransferDto;
import com.a703.spot.mapper.SpotMapper;
import com.a703.spot.repository.SpotRepository;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SpotApplicationTests {

    @Autowired
    SpotRepository spotRepository;

    SpotMapper spotMapper;



    //    @Test
    void contextLoads() {
    }
    @Test
    void distanceTest() {
        double lat = 37.511468; // 내 위치 y
        double lng = 127.121504; // 내 위치 x
        int distance = 2000; // meter 단위
        Specification<SpotDtoInterface> spec = (root, query, criteriaBuilder) -> null;
        Pageable pageable = PageRequest.of(1, 10);
        Page<SpotTransferDto> pageSpots = spotRepository.getSpotByDistance(lng, lat, distance, pageable).orElse(null);
        System.out.println(pageSpots.getContent());
        List<SpotDto> spotDtoList = new ArrayList<>();
        List<SpotTransferDto> spotTransferDtoList = pageSpots.getContent();
        for(SpotTransferDto spottransferDto : spotTransferDtoList){
            System.out.println(spottransferDto);
            SpotDto spotDto = spotMapper.TransferDtoToDto(spottransferDto);
            spotDtoList.add(spotDto);
        }
        SpotListDto result = SpotListDto.builder()
                        .spotDtoList(spotDtoList)
                        .totalPage(pageSpots.getTotalPages())
                        .build();
//        System.out.println(result);

    }
}
