package com.a703.community.repository;

import com.a703.community.entity.LuckyDog;
import com.a703.community.entity.LuckyDogId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LuckyDogRepository extends JpaRepository<LuckyDog, LuckyDogId> , JpaSpecificationExecutor<LuckyDog> {
    List<LuckyDog> findByIdPostPostIdx(Long postIdx);
    List<LuckyDog> findAllByIdDogIdxIn(List<Long> dogIdx);
}
