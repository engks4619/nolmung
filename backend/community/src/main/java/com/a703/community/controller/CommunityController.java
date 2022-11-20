package com.a703.community.controller;

import com.a703.community.dto.request.RegisterPostRequest;
import com.a703.community.dto.response.MainListDto;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.PostDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.dto.response.connection.DogInfoDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.a703.community.entity.Post;
import com.a703.community.repository.PostRepository;
import com.a703.community.service.CommunityService;
import com.a703.community.util.ClientUtil;
import com.a703.community.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community")

public class CommunityController {

    private final CommunityService communityService;

    private final FileUtil fileUtil;

    private final ClientUtil clientUtil;

    private final PostRepository postRepository;

    @PostMapping
    public ResponseEntity<?> registerPost(@RequestBody RegisterPostRequest registerPost, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) throws IOException {

        Long postIdx =communityService.registerPost(registerPost,token);
        return ResponseEntity.ok().body(postIdx);
    }

    @PostMapping("file/{postIdx}")
    public ResponseEntity<?> registerFile(@RequestParam("files") List<MultipartFile> files, @RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable Long postIdx) throws IOException {

        if (files != null) {
            for (MultipartFile multipartFile : files) {
                fileUtil.fileUpload(multipartFile, postIdx);
            }
        }
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
    public ResponseEntity<WithListDto> showWithList(@PageableDefault(sort = "modifyDate", direction = Sort.Direction.DESC,size = 10)Pageable pageable) {
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
    public ResponseEntity<PostDto>showPost(@PathVariable Long postIdx) {
        PostDto postDto = communityService.showPost(postIdx);
        return ResponseEntity.ok().body(postDto);
    }

    @PutMapping("/like/{postIdx}")
    public ResponseEntity<?> pushLike(@PathVariable Long postIdx, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        HttpStatus status;
        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long userIdx = userInfoDto.getUserIdx();
        Post post = postRepository.findByPostIdx(postIdx);
        Long writerIdx = post.getWriterIdx();
        Boolean flag;

        System.out.println(userIdx+"****"+writerIdx);
        if(userIdx.equals(writerIdx)){
            flag = null;
            status = HttpStatus.BAD_REQUEST;
        }else{
            flag = communityService.pushLike(postIdx,userIdx);
            status = HttpStatus.OK;
        }

        return ResponseEntity.status(status).body(flag);
    }

    @GetMapping("/post/dog-info/{postIdx}")
    public ResponseEntity<?>showPostDogInfo(@PathVariable Long postIdx) {
        List<DogInfoDto> dogInfoDto = communityService.showPostDogInfo(postIdx);
        return ResponseEntity.ok().body(dogInfoDto);
    }

}
