package com.a703.community.controller;

import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.service.MyListService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/me")
public class MyListController {

    private final MyListService myListService;

    @GetMapping("/other")
    public ResponseEntity<OtherListDto> showMyOtherList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable, @RequestHeader Map<String, Object> token ) throws Exception {
        OtherListDto otherMyLists = myListService.showMyOtherList(pageable,token);
        return ResponseEntity.ok().body(otherMyLists);
    }

    @GetMapping("/with")
    public ResponseEntity<WithListDto> showMyWithList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable, @RequestHeader Map<String, Object> token ) throws Exception {
        WithListDto withMyLists = myListService.showMyWithList(pageable,token);
        return ResponseEntity.ok().body(withMyLists);
    }

    @GetMapping("/like/with")
    public ResponseEntity<WithListDto> showMyWithLikeList(@PageableDefault(sort = "modify_date", direction = Sort.Direction.DESC,size = 10) Pageable pageable, @RequestHeader Map<String, Object> token ) throws Exception {
        WithListDto withMyLikeLists = myListService.showMyLikeWithList(pageable,token);
        return ResponseEntity.ok().body(withMyLikeLists);
    }

    @GetMapping("/like/other")
    public ResponseEntity<OtherListDto> showMyOtherLikeList(@PageableDefault(sort = "modify_date", direction = Sort.Direction.DESC,size = 10) Pageable pageable, @RequestHeader Map<String, Object> token ) throws Exception {
        OtherListDto otherMyLikeLists = myListService.showMyLikeOtherList(pageable,token);
        return ResponseEntity.ok().body(otherMyLikeLists);
    }

}
