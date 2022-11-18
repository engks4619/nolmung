package com.a703.user.controller;

import com.a703.user.dto.HistoryDto;
import com.a703.user.service.HistoryService;
import com.a703.user.util.JwtUtil;
import com.a703.user.vo.request.RequestHistory;
import com.a703.user.vo.response.ResponseHistory;
import com.a703.user.vo.response.ResponseUser;
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
        Long userIdx = jwtUtil.jwtToUserIdx(jwt);
        HistoryDto historyDto = new ModelMapper().map(requestHistory, HistoryDto.class);
        historyService.registerReview(userIdx, requestHistory.getPostIdx(), historyDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/reviewer/{userIdx}")
    public ResponseEntity<?> GetReviewByReviewer(@PathVariable(value = "userIdx") Long userIdx){
        List<HistoryDto> historyDtoList = historyService.getReviewList(userIdx);
        return getResponseEntity(historyDtoList);
    }

    @GetMapping("/reviewee/{userIdx}/{owner}")
    public ResponseEntity<?> GetReviewByReviewee(@PathVariable(value = "userIdx") Long userIdx, @PathVariable(value = "owner") boolean owner){
        List<HistoryDto> historyDtoList = historyService.getReviewList(userIdx, owner);
        return getResponseEntity(historyDtoList);
    }

    private ResponseEntity<?> getResponseEntity(List<HistoryDto> historyDtoList) {
        List<ResponseHistory> returnValue = historyDtoList.stream()
                .map(historyDto -> {
                    ResponseHistory responseHistory = new ModelMapper().map(historyDto, ResponseHistory.class);
                    responseHistory.setReviewer(new ModelMapper().map(historyDto.getReviewer(), ResponseUser.class));
                    responseHistory.setReviewee(new ModelMapper().map(historyDto.getReviewee(), ResponseUser.class));
                    return responseHistory;
                })
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
}
