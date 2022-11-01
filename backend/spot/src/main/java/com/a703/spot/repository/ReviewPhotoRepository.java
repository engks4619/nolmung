package com.a703.spot.repository;

import com.a703.spot.entity.ReviewPhoto;
import com.a703.spot.entity.SpotReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewPhotoRepository extends JpaRepository<ReviewPhoto, Long> {
    List<ReviewPhoto> findBySpotReview(SpotReview spotReview);
}
