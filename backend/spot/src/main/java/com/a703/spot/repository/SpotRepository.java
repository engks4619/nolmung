package com.a703.spot.repository;

import com.a703.spot.entity.Spot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SpotRepository extends JpaRepository<Spot, String> {

    Page<Spot> findAll(Specification<Spot> spec, Pageable pageable);

    @Query(
            value = "SET lng_diff = :distance / 2 / ST_DISTANCE_SPHERE(POINT(:lng, :lat), POINT(:lng + IF(:lng < 0, 1, -1), :lat));" +
                    "SELECT *, ST_DISTANCE_SPHERE(POINT(:lng, :lat), POINT(s.lng, s.lat)) AS distance_diff" +
                    "FROM tbl_spot AS s" +
                    "HAVING distance_diff <= :distance" +
                    "ORDER BY distance_diff",
            nativeQuery = true
    )
    Page<Spot> findByDistance(Pageable pageable, Specification<Spot> spec, @Param("lat") double lat,
                              @Param("lng") double lng, @Param("distance") Integer distance);
    Optional<Spot> findBySpotId(String spotId);
}
