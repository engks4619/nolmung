package com.a703.community.repository;

import com.a703.community.entity.PostLike;
import com.a703.community.entity.PostLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, PostLikeId> {

    Long countReviewLikeByIdPostPostIdx(Long postIdx);

    Boolean existsByIdUserIdxAndIdPostPostIdx(Long userIdx, Long postIdx);

}
