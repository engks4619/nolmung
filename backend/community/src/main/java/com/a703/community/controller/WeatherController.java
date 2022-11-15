package com.a703.community.controller;

import com.a703.community.dto.response.WeatherDto;
import com.a703.community.util.WeatherUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/weather")
public class WeatherController {

    private final WeatherUtil weatherUtil;

    @GetMapping
    public ResponseEntity<WeatherDto> weather( @RequestParam(name = "lat") double lat,
                                               @RequestParam(name = "lng") double lng) throws IOException {
        WeatherDto weatherDto = weatherUtil.lookUpWeather(lat,lng);
        return ResponseEntity.ok().body(weatherDto);

    }
}
