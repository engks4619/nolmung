package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.repository.SpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SpotController {

    @GetMapping("/spot")
    public SpotListDto getSpotList(SpotRequest spotRequest) {
        return null;
    }
}
