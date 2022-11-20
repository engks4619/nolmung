package com.a703.user.repository;

import com.a703.user.entity.HistoryEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HistoryRepository extends CrudRepository<HistoryEntity, Long> {
    List<HistoryEntity> findAllByRevieweeUserIdxAndOwner(Long userIdx, boolean owner);
    List<HistoryEntity> findAllByReviewerUserIdx(Long userIdx);
}
