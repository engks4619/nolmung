package com.a703.spot.repository;

import com.a703.spot.entity.Spot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface SpotRepository extends JpaRepository<Spot, String>, SpotRepositoryCustom {

    Page<Spot> findAll(Specification<Spot> spec, Pageable pageable);
    Optional<Spot> findBySpotId(String spotId);

}
