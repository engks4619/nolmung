package com.a703.community.service;

import com.a703.community.dto.request.RegisterPostRequest;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.entity.Post;
import com.a703.community.repository.PostRepository;
import com.a703.community.repository.ReviewLikeRepository;
import com.a703.community.type.CategoryType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final PostRepository postRepository;

    private final ReviewLikeRepository reviewLikeRepository;

    public void registerPost(RegisterPostRequest registerPost, Map<String, Object> token, List<MultipartFile> files){

        Long userIdx = 1L;// 토큰 받아서 유저서버에 보내서 받아오기
        Long dogIdx = 1L;//통신해서 받아와야함


        Post post = Post.builder()
                .categoryType(registerPost.getCategoryType())
                .content(registerPost.getContent())
                .createDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .modifyDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .dogIdx(dogIdx)
                .writerIdx(userIdx)
                .getDeleted(false)
                .getCompleted(false)
                .location(registerPost.getLocation())
                .leadLine(registerPost.getLeadLine())
                .pay(registerPost.getPay())
                .poopBag(registerPost.getPoopBag())
                .walkDate(registerPost.getWalkDate())
                .build();

        postRepository.save(post);

    }
    //진짜 삭제하지말기
    public void deletePost(){

    }
    //구인여부나
    public void updatePost(){

    }

    public List<WithListDto> showWithList(){

        List<Post> withLists =postRepository.findByCategoryTypeOrderByModifyDateDesc(CategoryType.WITH);

        return withLists.stream().map(with-> WithListDto.builder()
                .postIdx(with.getPostIdx())
                .likeCnt(Math.toIntExact(reviewLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                .location(with.getLocation())
                .modifyDate(with.getModifyDate())
                .walkDate(with.getWalkDate())
                .build())
                .collect(Collectors.toList());
    }

    public List<OtherListDto> showOtherList(){
        List<Post> withLists =postRepository.findByCategoryTypeOrderByModifyDateDesc(CategoryType.OTHER);
        return withLists.stream().map(with-> OtherListDto.builder()
                        .postIdx(with.getPostIdx())
                        .likeCnt(Math.toIntExact(reviewLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                        .location(with.getLocation())
                        .modifyDate(with.getModifyDate())
                        .walkDate(with.getWalkDate())
                        .pay(with.getPay())
                        .build())
                .collect(Collectors.toList());
    }

}
