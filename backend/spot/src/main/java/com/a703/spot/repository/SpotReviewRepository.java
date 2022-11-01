package com.a703.spot.repository;

import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpotReviewRepository extends JpaRepository<SpotReview, Long>, SpotReviewRepositoryCustom {
    List<SpotReview> findBySpot(Spot spot);
//    SpotReview findBySpot(Spot spot);
    Optional<SpotReview> findByReviewIdx(Long reviewIdx);
}
