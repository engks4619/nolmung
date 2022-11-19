package com.a703.user.service;

import com.a703.user.entity.UserVariableEntity;
import com.a703.user.repository.UserVariableRepository;
import com.a703.user.vo.request.RequestWithdog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WithDogServiceImpl implements WithDogService{
    private final UserVariableRepository userVariableRepository;

    @Override
    public void withDogFinish(RequestWithdog requestWithdog) {
        if(Objects.equals(requestWithdog.getOwnerIdx(), requestWithdog.getWalkerIdx())){
            UserVariableEntity userVariableEntity
                    = userVariableRepository.findById(requestWithdog.getOwnerIdx()).orElseThrow(NoSuchElementException::new);
            userVariableEntity.addWalk(requestWithdog.getDistance(), requestWithdog.getTime());
            userVariableRepository.save(userVariableEntity);
        }
    }
}
