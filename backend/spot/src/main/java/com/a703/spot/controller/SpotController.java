package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDetailDto;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.service.SpotService;
import com.a703.spot.util.ParameterUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spot")
public class SpotController {

    private final SpotService spotService;
    private final ParameterUtil parameterUtil;
    @PostMapping
    public ResponseEntity<SpotListDto> getSpotList(
            @RequestParam(name = "page") String pageParam,
            @RequestParam(name = "sort") String sortParam,
            @Valid @RequestBody SpotRequest request) {
        int page = ParameterUtil.checkPage(pageParam);
        int sort = ParameterUtil.checkSort(sortParam);
        // rquest 값 없는 경우 기본 세팅
        request = parameterUtil.checkSpotRequest(request);
        SpotListDto result = spotService.getSpotList(request, page, sort);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @GetMapping("{spotId}")
    public ResponseEntity<SpotDetailDto> getSpot(
            @PathVariable String spotId,
            @RequestParam(name = "lat") String latParam,
            @RequestParam(name = "lng") String lngParam
    ) {
        Double lng = parameterUtil.checkLng(lngParam);
        Double lat = parameterUtil.checkLat(latParam);
        SpotDetailDto result = spotService.getSpotDetail(lng, lat, spotId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

}
