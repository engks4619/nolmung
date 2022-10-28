package com.a703.community.service;


import com.a703.community.dto.request.SearchRequest;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.entity.Post;
import com.a703.community.repository.PostLikeRepository;
import com.a703.community.repository.PostPhotoRepository;
import com.a703.community.repository.PostRepository;
import com.a703.community.search.PostSpecification;
import com.a703.community.type.CategoryType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;

    private final PostPhotoRepository postPhotoRepository;

    public List<OtherListDto> searchOther(SearchRequest searchRequest, Pageable pageable){

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

        Page<Post> otherLists = postRepository.findAll(spec,pageable);
        //견종 통신해서 추가해야됨

        return otherLists.stream().map(other-> OtherListDto.builder()
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

    public List<WithListDto> searchWith(SearchRequest searchRequest,Pageable pageable){

        Specification<Post> spec = (root, query, criteriaBuilder) ->null;

        spec = spec.and(PostSpecification.equalCategoryTpye(CategoryType.WITH));

        if (searchRequest.getLocation() != null){
            spec = spec.and(PostSpecification.equalLocation(searchRequest.getLocation()));
        }
        if (searchRequest.getStartWalkDate() != null){
            spec = spec.and(PostSpecification.greaterThanWalkDate(searchRequest.getStartWalkDate()));
            spec = spec.and(PostSpecification.lessThanWalkeDate(searchRequest.getEndWalkDate()));
        }

        Page<Post> withLists = postRepository.findAll(spec,pageable);
        //견종 통신해서 추가해야됨

        return withLists.stream().map(with-> WithListDto.builder()
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
