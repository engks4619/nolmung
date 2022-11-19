package com.a703.user.service;

import com.a703.user.dto.HistoryDto;
import com.a703.user.entity.HistoryEntity;
import com.a703.user.entity.UserVariableEntity;
import com.a703.user.repository.HistoryRepository;
import com.a703.user.repository.UserRepository;
import com.a703.user.repository.UserVariableRepository;
import com.a703.user.util.CommUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final UserVariableRepository userVariableRepository;
    private final CommUtil commUtil;

    @Override
    public void registerReview(Long userIdx, Long postIdx, HistoryDto historyDto) {
        var map = commUtil.getPostInfo(postIdx);
        if(userIdx == map.get("writerIdx")){
            historyDto.setOwner(false);
            historyDto.setReviewee(userRepository.findById(((Number) map.get("albaIdx")).longValue()).orElseThrow());
        }else{
            historyDto.setOwner(true);
            historyDto.setReviewee(userRepository.findById(((Number) map.get("writerIdx")).longValue()).orElseThrow());
        }
        historyDto.setReviewer(userRepository.findById(userIdx).orElseThrow());
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setSkipNullEnabled(true).setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true).setMatchingStrategy(MatchingStrategies.STRICT);
        HistoryEntity historyEntity = mapper.map(historyDto, HistoryEntity.class);
        historyRepository.save(historyEntity);

        UserVariableEntity userVariableEntity = userVariableRepository.findById(historyDto.getReviewee().getUserIdx())
                .orElseThrow(NoSuchElementException::new);
        if(historyDto.getOwner()){
            userVariableEntity.addOwnerReview(historyDto.getStar());
        }else{
            userVariableEntity.addAlbaReview(historyDto.getStar());
        }
        userVariableRepository.save(userVariableEntity);
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
