package com.a703.user.service;

import com.a703.user.dto.HistoryDto;

import java.util.List;

public interface HistoryService {
    void registerReview(Long userIdx, Long postIdx, HistoryDto historyDto);
    List<HistoryDto> getReviewList(Long userIdx, boolean owner);
    List<HistoryDto> getReviewList(Long userIdx);
}
