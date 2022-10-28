package com.a703.community.service;

import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.entity.Post;
import com.a703.community.repository.PostLikeRepository;
import com.a703.community.repository.PostPhotoRepository;
import com.a703.community.repository.PostRepository;
import com.a703.community.type.CategoryType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MyListService {
    private final PostLikeRepository postLikeRepository;

    private final PostRepository postRepository;

    private final PostPhotoRepository postPhotoRepository;

    public List<WithListDto> showMyWithList(Pageable pageable, Map<String, Object> token) {

        //통신필요
        Long writerIdx = 1L;

        Page<Post> myWithLists = postRepository.findByCategoryTypeAndWriterIdx(CategoryType.WITH, writerIdx, pageable);

        return myWithLists.stream().map(with -> WithListDto.builder()
                        .writer("토큰보내서 내이름 가져오기")
                        .postIdx(with.getPostIdx())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                        .location(with.getLocation())
                        .modifyDate(with.getModifyDate())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl() : null)
                        .walkDate(with.getWalkDate())
                        .build())
                .collect(Collectors.toList());
    }

    public List<OtherListDto> showMyOtherList(Pageable pageable, Map<String, Object> token) {

        //통신필요
        Long writerIdx = 1L;

        Page<Post> myOtherLists = postRepository.findByCategoryTypeAndWriterIdx(CategoryType.OTHER, writerIdx, pageable);

        return myOtherLists.stream().map(other -> OtherListDto.builder()
                        .writer("통신필요")
                        .postIdx(other.getPostIdx())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                        .location(other.getLocation())
                        .modifyDate(other.getModifyDate())
                        .walkDate(other.getWalkDate())
                        .pay(other.getPay())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl() : null)
                        .build())
                .collect(Collectors.toList());
    }

    public List<OtherListDto> showMyLikeOtherList(Pageable pageable, Map<String, Object> token) {

        //통신필요
        Long userIdx = 1L;

        Page<Post> myLikeOtherLists = postRepository.findAllBySomething(userIdx,"OTHER",pageable);

        return myLikeOtherLists.stream().map(other -> OtherListDto.builder()
                        .writer("통신필요")
                        .postIdx(other.getPostIdx())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                        .location(other.getLocation())
                        .modifyDate(other.getModifyDate())
                        .walkDate(other.getWalkDate())
                        .pay(other.getPay())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl() : null)
                        .build())
                .collect(Collectors.toList());
    }

    public List<WithListDto> showMyLikeWithList(Pageable pageable, Map<String, Object> token) {

        //통신필요
        Long userIdx = 1L;

        Page<Post> myLikeWithLists = postRepository.findAllBySomething(userIdx,"WITH",pageable);

        return myLikeWithLists.stream().map(with -> WithListDto.builder()
                        .writer("통신필요")
                        .postIdx(with.getPostIdx())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                        .location(with.getLocation())
                        .modifyDate(with.getModifyDate())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl() : null)
                        .walkDate(with.getWalkDate())
                        .build())
                .collect(Collectors.toList());
    }
}
