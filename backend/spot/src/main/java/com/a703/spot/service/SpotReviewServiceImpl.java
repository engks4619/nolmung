package com.a703.spot.service;

import com.a703.spot.dto.request.SpotReviewRequest;
import com.a703.spot.dto.response.SpotReviewDto;
import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import com.a703.spot.exception.SpotReviewException;
import com.a703.spot.exception.model.AccountErrorCode;
import com.a703.spot.exception.model.SpotErrorCode;
import com.a703.spot.mapper.SpotReviewMapper;
import com.a703.spot.repository.SpotRepository;
import com.a703.spot.repository.SpotReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class SpotReviewServiceImpl implements SpotReviewService {

    private final SpotRepository spotRepository;
    private final SpotReviewRepository spotReviewRepository;

    @Override
    public void registReview(SpotReviewRequest request) {
        SpotReviewDto spotReviewDto
                = SpotReviewDto.builder()
                    .spotId(request.getSpotId())
                    .content(request.getContent())
                    .star(request.getStar())
                    .userIdx(request.getUserIdx())
                    .isDeleted(false)
                    .build();
        spotReviewRepository.save(SpotReviewMapper.mapper.toEntity(spotReviewDto));
    }

    @Override
    public void deleteReview(SpotReviewRequest request) {
        Spot spot = spotRepository.findBySpotId(request.getSpotId()).orElseThrow(
            //Spot Null Excetption 처리
                () -> new SpotReviewException(SpotErrorCode.SPOT_NOT_FOUND)
        );

        SpotReview spotReview = spotReviewRepository.findBySpot(spot);
        if(spotReview.getUserIdx() == request.getUserIdx()){
            spotReview.setIsDeleted(true);
            spotReviewRepository.save(spotReview);
        }else{
            // 유저 Exception 처리
            throw new SpotReviewException(AccountErrorCode.ACCOUNT_NOT_MATCH);
        }

    }
}
