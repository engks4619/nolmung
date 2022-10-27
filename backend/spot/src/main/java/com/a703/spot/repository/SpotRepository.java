package com.a703.spot.repository;

import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotDtoInterface;
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
    Optional<Spot> findBySpotId(String spotId);
    @Query(value =
                "SELECT *, ST_DISTANCE_SPHERE(POINT(:currLng,:currLat), POINT(s.lng, s.lat)) AS distance_diff " +
                "FROM tbl_spot AS s " +
                "HAVING distance_diff <= :dist " +
                "ORDER BY distance_diff ",
            countQuery =
                    "SELECT count(*) " +
                    "FROM tbl_spot AS s " +
                    "WHERE ST_DISTANCE_SPHERE(POINT(:currLng,:currLat), POINT(s.lng, s.lat)) <= :dist ",
            nativeQuery = true)
    Page<SpotDtoInterface> getSpotByDistance(@Param("currLng") double currLng, @Param("currLat") double currLat,
                                             @Param("dist") int dist, Pageable pageable);

}
