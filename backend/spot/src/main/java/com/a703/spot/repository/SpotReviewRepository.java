package com.a703.spot.repository;

import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpotReviewRepository extends JpaRepository<SpotReview, String>, SpotReviewRepositoryCustom {

    Page<SpotReview> findBySpot(Spot spot, Pageable pageable);
}
