package com.a703.community.service;

import com.a703.community.dto.request.AlbaReuest;
import com.a703.community.dto.response.AlbaDto;
import com.a703.community.entity.Post;
import com.a703.community.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AlbaService {

    private final PostRepository postRepository;

    public void fixAlba(AlbaReuest albaReuest){

        Post post = postRepository.findByPostIdx(albaReuest.getPostIdx());
        post.setAlbaIdx(albaReuest.getAlbaIdx());
        postRepository.save(post);

    }

    public void deleteAlba(Long postIdx){

        Post post = postRepository.findByPostIdx(postIdx);
        post.setAlbaIdx(null);
        post.setGetCompleted(false);
        postRepository.save(post);

    }

    public AlbaDto showAlba(Long postIdx){
        Post post = postRepository.findByPostIdx(postIdx);
        return AlbaDto.builder()
                .writerIdx(post.getWriterIdx())
                .albaIdx(post.getAlbaIdx())
                .build();
    }
}
