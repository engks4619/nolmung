package com.a703.community.service;


import com.a703.community.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final PostRepository postRepository;

//    public List<OtherListDto> searchOther(SearchRequest searchRequest){
//
//        List<OtherListDto> otherListDtos = postRepository.findBy()
//
//        return
//    }

//    public List<WithListDto> searchWith(SearchRequest searchRequest){
//
//        List<WithListDto> withListDtos
//
//        return
//    }
}
