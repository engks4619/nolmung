package com.a703.spot.controller;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.DtoResponse;
import com.a703.spot.dto.response.SpotDetailDto;
import com.a703.spot.dto.response.SpotListDto;
import com.a703.spot.properties.ConstProperties;
import com.a703.spot.properties.ResponseProperties;
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
    private final ConstProperties constProperties;
    private final ResponseProperties responseProperties;
    private final ParameterUtil parameterUtil;
    @PostMapping
    public ResponseEntity<DtoResponse<SpotListDto>> getSpotList(
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
