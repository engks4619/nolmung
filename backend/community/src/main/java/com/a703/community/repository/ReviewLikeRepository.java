package com.a703.community.repository;
import com.a703.community.entity.TblReviewLike;
import com.a703.community.entity.TblReviewLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewLikeRepository extends JpaRepository<TblReviewLike, TblReviewLikeId> {

    Long countReviewLikeByIdPostPostIdx(Long postIdx);


}
