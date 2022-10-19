package com.a703.community.repository;
import com.a703.community.entity.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<ReviewLike,Long> {


}
