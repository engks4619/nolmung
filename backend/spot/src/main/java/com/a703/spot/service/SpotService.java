package com.a703.spot.service;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotListDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SpotService {

    SpotListDto getSpotList(SpotRequest request, int page, int desc);
    Pageable getPageable(int page, int desc);
}
