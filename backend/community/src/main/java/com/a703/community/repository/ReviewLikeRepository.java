package com.a703.community.repository;
import com.a703.community.entity.ReviewLike;
import com.a703.community.entity.ReviewLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewLikeRepository extends JpaRepository<ReviewLike, ReviewLikeId> {

    Long countReviewLikeByIdPostPostIdx(Long postIdx);


}
