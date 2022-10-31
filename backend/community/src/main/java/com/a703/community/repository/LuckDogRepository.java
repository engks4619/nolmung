package com.a703.community.repository;

import com.a703.community.entity.LuckyDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LuckDogRepository extends JpaRepository<LuckyDog,Long> {
    List<LuckyDog> findByIdPostPostIdx(Long postIdx);
}
