package com.a703.community.repository;

import com.a703.community.entity.TblPostLike;
import com.a703.community.entity.TblPostLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<TblPostLike, TblPostLikeId> {

    Long countReviewLikeByIdPostPostIdx(Long postIdx);

    Boolean existsByIdUserIdxAndIdPostPostIdx(Long userIdx, Long postIdx);

//    Page<TblPost> findAllPostByIdUserIdx(Long userIdx,Pageable pageable);
////    Page<TblPostLike> findAllByIdUserIdx(Long userIdx, Pageable pageable);




}
