package com.a703.community.controller;


import com.a703.community.dto.request.SearchRequest;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/search")
public class SearchController {

    private final SearchService searchService;

    @PostMapping("/other")
    public ResponseEntity<?> searchOther(@RequestBody(required = false) SearchRequest search,@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable) throws Exception {
        List<OtherListDto> otherListDtos = searchService.searchOther(search,pageable);
        return ResponseEntity.ok().body(otherListDtos);

    }

    @PostMapping("/with")
    public ResponseEntity<List<WithListDto>> searchWith(@RequestBody(required = false) SearchRequest search,@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable) throws Exception {
        List<WithListDto> withListDtos = searchService.searchWith(search,pageable);
        return ResponseEntity.ok().body(withListDtos);
    }



}
