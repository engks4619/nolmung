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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/search")
public class SearchController {

    private final SearchService searchService;

    @PostMapping("/other")
    public ResponseEntity<OtherListDto> searchOther(@RequestBody(required = false) SearchRequest search,@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable) {
        OtherListDto otherListDtos = searchService.searchOther(search,pageable);
        return ResponseEntity.ok().body(otherListDtos);

    }

    @PostMapping("/with")
    public ResponseEntity<WithListDto> searchWith(@RequestBody(required = false) SearchRequest search, @PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10) Pageable pageable) {
        WithListDto withListDtos = searchService.searchWith(search,pageable);
        return ResponseEntity.ok().body(withListDtos);
    }



}
