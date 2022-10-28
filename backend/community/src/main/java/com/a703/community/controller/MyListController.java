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

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/community/my")
public class MyListController {

    private final MyListService myListService;

    @GetMapping("/other")
    public ResponseEntity<List<OtherListDto>> showMyOtherList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable,@RequestHeader Map<String, Object> token ){
        List<OtherListDto> otherMyLists = myListService.showMyOtherList(pageable,token);
        return ResponseEntity.ok().body(otherMyLists);
    }

    @GetMapping("/with")
    public ResponseEntity<List<WithListDto>> showMyWithList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable,@RequestHeader Map<String, Object> token ){
        List<WithListDto> withMyLists = myListService.showMyWithList(pageable,token);
        return ResponseEntity.ok().body(withMyLists);
    }

    @GetMapping("/like/with")
    public ResponseEntity<List<WithListDto>> showMyWithLikeList(@PageableDefault(sort = "modify_date", direction = Sort.Direction.DESC,size = 10) Pageable pageable,@RequestHeader Map<String, Object> token ){
        List<WithListDto> withMyLikeLists = myListService.showMyLikeWithList(pageable,token);
        return ResponseEntity.ok().body(withMyLikeLists);
    }

    @GetMapping("/like/other")
    public ResponseEntity<List<OtherListDto>> showMyOtherLikeList(@PageableDefault(sort = "modify_date", direction = Sort.Direction.DESC,size = 10) Pageable pageable,@RequestHeader Map<String, Object> token ){
        List<OtherListDto> otherMyLikeLists = myListService.showMyLikeOtherList(pageable,token);
        return ResponseEntity.ok().body(otherMyLikeLists);
    }

}
