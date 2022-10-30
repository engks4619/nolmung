package com.a703.spot.repository;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

public interface SpotRepositoryCustom {
    Page<SpotDto> search(SpotRequest request, Pageable pageable);
}
