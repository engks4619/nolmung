package com.a703.community.controller;

import com.a703.community.dto.request.RegisterPostRequest;
import com.a703.community.dto.response.MainListDto;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.PostDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.service.CommunityService;
import com.a703.community.util.ClientUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community")

public class CommunityController {

    private final CommunityService communityService;

    private final ClientUtil clientUtil;

    @PostMapping
    public ResponseEntity<?> registerPost(@RequestPart RegisterPostRequest registerPost, @RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws Exception {

        communityService.registerPost(registerPost,token,files);
        return ResponseEntity.ok().body("success");
    }

    @DeleteMapping("{postIdx}")
    public ResponseEntity<?> deletePost (@PathVariable Long postIdx){
        communityService.deletePost(postIdx);

        return ResponseEntity.ok().body("success");

    }

    @GetMapping("/main")
    public ResponseEntity<List<MainListDto>[]>showMainList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10)Pageable pageable){
        List<MainListDto>[] mainLists = communityService.showMainList(pageable);
        return ResponseEntity.ok().body(mainLists);
    }

    @GetMapping("/with")
    public ResponseEntity<WithListDto> showWithList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10)Pageable pageable) throws Exception {
        WithListDto withLists = communityService.showWithList(pageable);
        return ResponseEntity.ok().body(withLists);
    }

    @GetMapping("/other")
    public ResponseEntity<OtherListDto>showOtherList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10)Pageable pageable){
        OtherListDto otherLists = communityService.showOtherList(pageable);
        return ResponseEntity.ok().body(otherLists);
    }

    @PatchMapping("/repost/{postIdx}")
    public ResponseEntity<?>reRegisterPost(@PathVariable Long postIdx){
        communityService.reRegisterPost(postIdx);
        return ResponseEntity.ok().body("success");
    }

    @PatchMapping("/complete/{postIdx}")
    public ResponseEntity<?>completePost(@PathVariable Long postIdx){
        communityService.completePost(postIdx);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/post-info/{postIdx}")
    public ResponseEntity<PostDto>showPost(@PathVariable Long postIdx) throws Exception {
        PostDto postDto = communityService.showPost(postIdx);
        return ResponseEntity.ok().body(postDto);
    }

    @PutMapping("/like/{postIdx}")
    public ResponseEntity<?> pushLike(@PathVariable Long postIdx, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) throws Exception {

        communityService.pushLike(postIdx,token);
        return ResponseEntity.ok().body("success");
    }

}
