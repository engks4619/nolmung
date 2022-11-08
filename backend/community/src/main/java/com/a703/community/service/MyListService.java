package com.a703.community.service;

import com.a703.community.dto.response.OtherDto;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.a703.community.entity.Post;
import com.a703.community.repository.ChatRepository;
import com.a703.community.repository.PostLikeRepository;
import com.a703.community.repository.PostPhotoRepository;
import com.a703.community.repository.PostRepository;
import com.a703.community.type.CategoryType;
import com.a703.community.util.ClientUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MyListService {
    private final PostLikeRepository postLikeRepository;

    private final PostRepository postRepository;

    private final PostPhotoRepository postPhotoRepository;

    private final ChatRepository chatRepository;

    private final ClientUtil clientUtil;

    public WithListDto showMyWithList(Pageable pageable, String token) throws Exception {

        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long writerIdx = userInfoDto.getUserIdx();

        Page<Post> myWithLists = postRepository.findByCategoryTypeAndWriterIdx(CategoryType.WITH, writerIdx, pageable);
        int totalPages = myWithLists.getTotalPages();

        List<WithDto> myWithDtoList = myWithLists.stream().map(with -> WithDto.builder()
                        .writer(userInfoDto.getNickname())
                        .subject(with.getSubject())
                        .postIdx(with.getPostIdx())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                        .chatCnt(chatRepository.countChatByPost(with))
                        .location(with.getLocation())
                        .modifyDate(with.getModifyDate())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl() : null)
                        .walkDate(with.getWalkDate())
                        .build())
                .collect(Collectors.toList());

        return WithListDto.builder()
                .withDtoList(myWithDtoList)
                .totalPage(totalPages)
                .build();
    }

    public OtherListDto showMyOtherList(Pageable pageable, String token) throws Exception {

        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long writerIdx = userInfoDto.getUserIdx();

        Page<Post> myOtherLists = postRepository.findByCategoryTypeAndWriterIdx(CategoryType.OTHER, writerIdx, pageable);
        int totalPages = myOtherLists.getTotalPages();

        List<OtherDto> myOtherDtoList = myOtherLists.stream().map(other -> OtherDto.builder()
                        .writer(userInfoDto.getNickname())
                        .postIdx(other.getPostIdx())
                        .subject(other.getSubject())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                        .chatCnt(chatRepository.countChatByPost(other))
                        .location(other.getLocation())
                        .modifyDate(other.getModifyDate())
                        .walkDate(other.getWalkDate())
                        .pay(other.getPay())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl() : null)
                        .build())
                .collect(Collectors.toList());

        return OtherListDto.builder()
                .otherDtoList(myOtherDtoList)
                .totalPage(totalPages)
                .build();
    }

    public OtherListDto showMyLikeOtherList(Pageable pageable, String token) throws Exception {

        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long userIdx = userInfoDto.getUserIdx();

        Page<Post> myLikeOtherLists = postRepository.findAllBySomething(userIdx,"OTHER",pageable);

        int totalPages = myLikeOtherLists.getTotalPages();

        List<OtherDto> myLikeOtherDtoList = myLikeOtherLists.stream().map(other -> OtherDto.builder()
                        .writer(clientUtil.requestOtherUserInfo(other.getWriterIdx()).getNickname())
                        .userImgUrl(clientUtil.requestOtherUserInfo(other.getWriterIdx()).getProfileImage())
                        .postIdx(other.getPostIdx())
                        .subject(other.getSubject())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                        .chatCnt(chatRepository.countChatByPost(other))
                        .location(other.getLocation())
                        .modifyDate(other.getModifyDate())
                        .walkDate(other.getWalkDate())
                        .pay(other.getPay())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl() : null)
                        .build())
                .collect(Collectors.toList());

        return OtherListDto.builder()
                .otherDtoList(myLikeOtherDtoList)
                .totalPage(totalPages)
                .build();
    }

    public WithListDto showMyLikeWithList(Pageable pageable, String token) throws Exception {

        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long userIdx = userInfoDto.getUserIdx();


        Page<Post> myLikeWithLists = postRepository.findAllBySomething(userIdx,"WITH",pageable);

        int totalPages = myLikeWithLists.getTotalPages();

        List<WithDto> myWithLikeDtoList = myLikeWithLists.stream().map(with -> WithDto.builder()
                        .writer(clientUtil.requestOtherUserInfo(with.getWriterIdx()).getNickname())
                        .userImgUrl(clientUtil.requestOtherUserInfo(with.getWriterIdx()).getProfileImage())
                        .postIdx(with.getPostIdx())
                        .subject(with.getSubject())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                        .chatCnt(chatRepository.countChatByPost(with))
                        .location(with.getLocation())
                        .modifyDate(with.getModifyDate())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl() : null)
                        .walkDate(with.getWalkDate())
                        .build())
                .collect(Collectors.toList());

        return WithListDto.builder()
                .withDtoList(myWithLikeDtoList)
                .totalPage(totalPages)
                .build();
    }
}
