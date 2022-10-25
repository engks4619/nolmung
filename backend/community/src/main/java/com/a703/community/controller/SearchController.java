package com.a703.community.controller;


import com.a703.community.dto.request.SearchRequest;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/community/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/other")
    public ResponseEntity<?> searchOther(@RequestBody(required = false) SearchRequest search){
        List<OtherListDto> otherListDtos = searchService.searchOther(search);
        return ResponseEntity.ok().body(otherListDtos);

    }

    @GetMapping("/with")
    public ResponseEntity<List<WithListDto>> searchWith(@RequestBody(required = false) SearchRequest search){
        List<WithListDto> withListDtos = searchService.searchWith(search);
        return ResponseEntity.ok().body(withListDtos);
    }



}
