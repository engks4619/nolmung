package com.a703.spot.service;

import com.a703.spot.dto.request.SpotReviewRequest;
import com.a703.spot.dto.response.SpotReviewDto;
import com.a703.spot.dto.response.connection.UserInfoDto;
import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import com.a703.spot.exception.SpotReviewException;
import com.a703.spot.exception.model.AccountErrorCode;
import com.a703.spot.exception.model.ReviewErrorCode;
import com.a703.spot.exception.model.SpotErrorCode;
import com.a703.spot.mapper.SpotReviewMapper;
import com.a703.spot.repository.ReviewPhotoRepository;
import com.a703.spot.repository.SpotRepository;
import com.a703.spot.repository.SpotReviewRepository;
import com.a703.spot.util.ClientUtil;
import com.a703.spot.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpotReviewServiceImpl implements SpotReviewService {

    private final SpotRepository spotRepository;
    private final SpotReviewRepository spotReviewRepository;
    private final ReviewPhotoRepository reviewPhotoRepository;
    private final ClientUtil clientUtil;
    private final FileUtil fileUtil;

    @Override
    public Long registReview(SpotReviewRequest request,String token) {
        try {
            // 리뷰 저장
            UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
            SpotReviewDto spotReviewDto
                    = SpotReviewDto.builder()
                    .spotId(request.getSpotId())
                    .content(request.getContent())
                    .star(request.getStar())
                    .nickname(userInfoDto.getNickname())
                    .profileImage(userInfoDto.getProfileImage())
                    .userIdx(userInfoDto.getUserIdx())
                    .deleted(false)
                    .build();
//
            SpotReview spotReviewEntity = SpotReviewMapper.mapper.toEntity(spotReviewDto);
//
            SpotReview spotReview = spotReviewRepository.save(spotReviewEntity);
            
            return spotReview.getReviewIdx();

        }catch (Exception e) {
            throw new SpotReviewException(AccountErrorCode.ACCOUNT_NOT_FOUND);
        }
        
    }

    @Override
    public void deleteReview(Long reviewIdx, String token) {
        SpotReview spotReview = spotReviewRepository.findByReviewIdx(reviewIdx).orElseThrow(
                () -> new SpotReviewException(ReviewErrorCode.REVIEW_NOT_FOUND)
        );
        try {
            UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
//            UserInfoDto userInfoDto = UserInfoDto.builder().userIdx(1L).build();

            if(spotReview.getUserIdx() == userInfoDto.getUserIdx()) {
                spotReview.setIsDeleted(true);
                spotReviewRepository.save(spotReview);
            }else { // 리뷰 작성한 유저가 아닌 경우
                throw new SpotReviewException(AccountErrorCode.ACCOUNT_NOT_MATCH);
            }

        } catch (Exception e) { // 유저를 찾을 수 없는 경우
            throw new SpotReviewException(AccountErrorCode.ACCOUNT_NOT_FOUND);
        }
    }

}
