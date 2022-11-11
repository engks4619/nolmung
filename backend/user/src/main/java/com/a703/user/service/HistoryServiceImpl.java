package com.a703.user.service;

import com.a703.user.dto.HistoryDto;
import com.a703.user.entity.HistoryEntity;
import com.a703.user.repository.HistoryRepository;
import com.a703.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    @Override
    public HistoryDto registerReview(Long userIdx, HistoryDto historyDto) {
        historyDto.setUser(userRepository.findById(userIdx).get());
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setFieldAccessLevel(Configuration.AccessLevel.PRIVATE).setFieldMatchingEnabled(true);
        HistoryEntity historyEntity = mapper.map(historyDto, HistoryEntity.class);
        HistoryEntity savedReview = historyRepository.save(historyEntity);
        return mapper.map(savedReview, HistoryDto.class);
    }

    @Override
    public List<HistoryDto> getReviewList(Long userIdx) {
        List<HistoryEntity> historyEntityList = historyRepository.findAllByUserUserIdx(userIdx);
        return historyEntityList.stream()
                .map(a -> new ModelMapper().map(a, HistoryDto.class))
                .collect(Collectors.toList());
    }
}
