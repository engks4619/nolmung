package com.a703.community.controller;

import com.a703.community.dto.request.WeatherRequest;
import com.a703.community.dto.response.WeatherDto;
import com.a703.community.util.WeatherUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/weather")
public class WeatherController {

    private final WeatherUtil weatherUtil;

    @GetMapping
    public ResponseEntity<WeatherDto> weather(@RequestBody WeatherRequest weatherRequest) throws IOException {
        WeatherDto weatherDto = weatherUtil.lookUpWeather(weatherRequest);
        return ResponseEntity.ok().body(weatherDto);

    }
}
