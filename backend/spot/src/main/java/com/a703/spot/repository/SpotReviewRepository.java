package com.a703.spot.repository;

import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpotReviewRepository extends JpaRepository<SpotReview, Long>, SpotReviewRepositoryCustom {
    Page<SpotReview> findBySpot(Spot spot, Pageable pageable);
//    SpotReview findBySpot(Spot spot);
    Optional<SpotReview> findByReviewIdx(Long reviewIdx);
}
