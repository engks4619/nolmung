package com.a703.spot.service;

import com.a703.spot.dto.request.SpotReviewRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface SpotReviewService {

    void registReview(SpotReviewRequest request, Map<String, Object> token, List<MultipartFile> files);
    void deleteReview(Long request, Map<String, Object> token);
}
