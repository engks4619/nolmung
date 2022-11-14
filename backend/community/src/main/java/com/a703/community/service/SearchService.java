package com.a703.community.service;


import com.a703.community.dto.request.SearchRequest;
import com.a703.community.dto.response.OtherDto;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.a703.community.entity.LuckyDog;
import com.a703.community.entity.Post;
import com.a703.community.repository.*;
import com.a703.community.service.search.PostSpecification;
import com.a703.community.type.CategoryType;
import com.a703.community.util.ClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class SearchService {

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;

    private final PostPhotoRepository postPhotoRepository;

    private final LuckyDogRepository luckyDogRepository;

    private final ChatRepository chatRepository;

    private final ClientUtil clientUtil;

    public OtherListDto searchOther(SearchRequest searchRequest, Pageable pageable) {

        Specification<Post> spec = (root, query, criteriaBuilder) ->null;

        spec = spec.and(PostSpecification.equalCategoryTpye(CategoryType.OTHER));

        if (searchRequest.getLocation() != null){
            spec = spec.and(PostSpecification.equalLocation(searchRequest.getLocation()));
        }
        if (searchRequest.getStartWalkDate() != null){
            spec = spec.and(PostSpecification.greaterThanWalkDate(searchRequest.getStartWalkDate()));
            spec = spec.and(PostSpecification.lessThanWalkeDate(searchRequest.getEndWalkDate()));
        }
        if (searchRequest.getStartPay() != null){
            spec = spec.and(PostSpecification.greaterThanPay(searchRequest.getStartPay()));
            spec = spec.and(PostSpecification.lessThanPay(searchRequest.getEndPay()));
        }

        if (searchRequest.getDogBreed() != null){
            List<Long> dogIdxList =clientUtil.requestSearchDogInfo(searchRequest.getDogBreed());

            List<LuckyDog> luckyDogList = luckyDogRepository.findAllByIdDogIdxIn(dogIdxList);
            List<Long> findPostIdx = luckyDogList.stream().map(luckyDog -> {
                return luckyDog.getId().getPost().getPostIdx();
            }).collect(Collectors.toList());

            spec = spec.and(PostSpecification.findDogBreedByPostIdx(findPostIdx));
        }

        Page<Post> otherLists = postRepository.findAll(spec,pageable);

        int totalPages = otherLists.getTotalPages();

        List<OtherDto> otherDtoList = otherLists.stream().map(other-> {

            UserInfoDto writerInfoDto = clientUtil.requestOtherUserInfo(other.getWriterIdx());
            String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl()
                    : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(other.getPostIdx()).getId().getDogIdx())).get(0).getImage();


            return OtherDto.builder()
                            .postIdx(other.getPostIdx())
                            .writer(writerInfoDto.getNickname())
                            .userImgUrl(writerInfoDto.getProfileImage())
                            .subject(other.getSubject())
                            .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                            .chatCnt(chatRepository.countChatByPost(other))
                            .location(other.getLocation())
                            .modifyDate(other.getModifyDate())
                            .walkDate(other.getWalkDate())
                            .pay(other.getPay())
                            .thumbnailUrl(thumbnailUrl)
                            .build();
                })
                .collect(Collectors.toList());

        return OtherListDto.builder()
                .otherDtoList(otherDtoList)
                .totalPage(totalPages)
                .build();
    }

    public WithListDto searchWith(SearchRequest searchRequest, Pageable pageable) {

        Specification<Post> spec = (root, query, criteriaBuilder) ->null;

        spec = spec.and(PostSpecification.equalCategoryTpye(CategoryType.WITH));

        if (searchRequest.getLocation() != null){
            spec = spec.and(PostSpecification.equalLocation(searchRequest.getLocation()));
        }
        if (searchRequest.getStartWalkDate() != null){
            spec = spec.and(PostSpecification.greaterThanWalkDate(searchRequest.getStartWalkDate()));
            spec = spec.and(PostSpecification.lessThanWalkeDate(searchRequest.getEndWalkDate()));
        }
        if (searchRequest.getDogBreed() != null){
            List<Long> dogIdxList =clientUtil.requestSearchDogInfo(searchRequest.getDogBreed());

            List<LuckyDog> luckyDogList = luckyDogRepository.findAllByIdDogIdxIn(dogIdxList);
            List<Long> findPostIdx = luckyDogList.stream().map(luckyDog -> {
                return luckyDog.getId().getPost().getPostIdx();
            }).collect(Collectors.toList());

            spec = spec.and(PostSpecification.findDogBreedByPostIdx(findPostIdx));
        }

        Page<Post> withLists = postRepository.findAll(spec,pageable);

        int totalPages = withLists.getTotalPages();

        List<WithDto> withDtoList = withLists.stream().map(with-> {
            UserInfoDto writerInfoDto = clientUtil.requestOtherUserInfo(with.getWriterIdx());
            String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl()
                    : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(with.getPostIdx()).getId().getDogIdx())).get(0).getImage();


                    return WithDto.builder()
                            .postIdx(with.getPostIdx())
                            .writer(writerInfoDto.getNickname())
                            .userImgUrl(writerInfoDto.getProfileImage())
                            .subject(with.getSubject())
                            .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                            .chatCnt(chatRepository.countChatByPost(with))
                            .location(with.getLocation())
                            .modifyDate(with.getModifyDate())
                            .thumbnailUrl(thumbnailUrl)
                            .walkDate(with.getWalkDate())
                            .build();
                })
                .collect(Collectors.toList());

        return WithListDto.builder()
                .withDtoList(withDtoList)
                .totalPage(totalPages)
                .build();
    }
}
