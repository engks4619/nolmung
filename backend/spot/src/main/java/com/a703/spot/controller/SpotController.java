package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.DtoResponse;
import com.a703.spot.dto.response.SpotDetailDto;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.entity.Spot;
import com.a703.spot.properties.ResponseProperties;
import com.a703.spot.service.SpotService;
import com.a703.spot.util.ParameterUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spot")
public class SpotController {

    private final SpotService spotService;
    private final ResponseProperties responseProperties;
    @PostMapping
    public ResponseEntity<DtoResponse<SpotListDto>> getSpotList(
            @RequestParam(name = "page") String pageParam,
            @RequestParam(name = "desc") String descParam,
            @RequestBody SpotRequest request) {
        int page = ParameterUtil.checkPage(pageParam);
        int desc = ParameterUtil.checkDesc(descParam);
        SpotListDto result = spotService.getSpotList(request, page, desc);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(DtoResponse.of(
                        HttpStatus.OK,
                        responseProperties.getSuccess(),
                        result)
                );
    }

    @GetMapping("{spotId}")
    public ResponseEntity<DtoResponse<SpotDetailDto>> getSpot(@PathVariable String spotId) {
        SpotDetailDto result = spotService.getSpotDetail(spotId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(DtoResponse.of(
                        HttpStatus.OK,
                        responseProperties.getSuccess(),
                        result
                ));
    }

}
