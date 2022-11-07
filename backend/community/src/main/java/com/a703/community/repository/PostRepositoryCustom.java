package com.a703.community.repository;

import com.a703.community.entity.Post;

public interface PostRepositoryCustom {

    Post findByPostIdx(Long postIdx);
//
//    Page<Post> findAllBySomething(Long userIdx,String categoryType, Pageable pageable);

}
