package com.a703.user.service;

import com.a703.user.dto.HistoryDto;
import com.a703.user.entity.HistoryEntity;
import com.a703.user.repository.HistoryRepository;
import com.a703.user.repository.UserRepository;
import com.a703.user.util.CommUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final CommUtil commUtil;

    @Override
    public void registerReview(Long userIdx, Long postIdx, HistoryDto historyDto) {
        var map = commUtil.getPostInfo(postIdx);
        if(userIdx == map.get("writerIdx")){
            historyDto.setOwner(false);
            historyDto.setReviewee(userRepository.findById(((Number) map.get("albaIdx")).longValue()).get());
        }else{
            historyDto.setOwner(true);
            historyDto.setReviewee(userRepository.findById(((Number) map.get("writerIdx")).longValue()).get());
        }
        historyDto.setReviewer(userRepository.findById(userIdx).get());
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setSkipNullEnabled(true).setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true).setMatchingStrategy(MatchingStrategies.STRICT);
        HistoryEntity historyEntity = mapper.map(historyDto, HistoryEntity.class);
        historyRepository.save(historyEntity);
    }

    @Override
    public List<HistoryDto> getReviewList(Long userIdx, boolean owner) {
        List<HistoryEntity> historyEntityList = historyRepository.findAllByRevieweeUserIdxAndOwner(userIdx, owner);
        return historyEntityList.stream()
                .map(a -> new ModelMapper().map(a, HistoryDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<HistoryDto> getReviewList(Long userIdx) {
        List<HistoryEntity> historyEntityList = historyRepository.findAllByReviewerUserIdx(userIdx);
        return historyEntityList.stream()
                .map(a -> new ModelMapper().map(a, HistoryDto.class))
                .collect(Collectors.toList());
    }
}
