package com.a703.community.controller;

import com.a703.community.dto.request.RegisterPostRequest;
import com.a703.community.dto.response.MainListDto;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityService communityService;
    @PostMapping
    public ResponseEntity<?> registerPost(@RequestPart RegisterPostRequest registerPost, @RequestHeader Map<String, Object> token ,@RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {

        communityService.registerPost(registerPost,token,files);
        return ResponseEntity.ok().body("success");
    }

    @DeleteMapping
    public ResponseEntity<?> deletePost (){

        return ResponseEntity.ok().body("success");

    }

    @GetMapping("/main")
    public ResponseEntity<List<MainListDto>>showMainList(){
        List<MainListDto> mainLists = communityService.showMainList();
        return ResponseEntity.ok().body(mainLists);
    }



    @GetMapping("/with")
    public ResponseEntity<List<WithListDto>> showWithList(){
        List<WithListDto> withLists = communityService.showWithList();
        return ResponseEntity.ok().body(withLists);
    }

    @GetMapping("/other")
    public ResponseEntity<List<OtherListDto>>showOtherList(){
        List<OtherListDto> otherLists = communityService.showOtherList();
        return ResponseEntity.ok().body(otherLists);
    }


}
