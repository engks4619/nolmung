package com.a703.user.controller;

import com.a703.user.dto.HistoryDto;
import com.a703.user.service.HistoryService;
import com.a703.user.util.JwtUtil;
import com.a703.user.vo.request.RequestHistory;
import com.a703.user.vo.response.ResponseHistory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> RegisterReview(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String jwt, @RequestBody RequestHistory requestHistory){
        HistoryDto historyDto = new ModelMapper().map(requestHistory, HistoryDto.class);
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
        HistoryDto savedData = historyService.registerReview(userIdx, historyDto);
        return ResponseEntity.status(HttpStatus.OK).body(savedData);
    }

    @GetMapping("/{userIdx}")
    public ResponseEntity<?> GetReview(@PathVariable(value = "userIdx") Long userIdx){
        List<HistoryDto> historyDtoList = historyService.getReviewList(userIdx);
        List<ResponseHistory> returnValue = historyDtoList.stream()
                .map(a -> new ModelMapper().map(a, ResponseHistory.class))
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
}
