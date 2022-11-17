package com.a703.user.service;

import com.a703.user.entity.UserVariableEntity;
import com.a703.user.repository.UserVariableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserVariableServiceImpl implements UserVariableService{

    private final UserVariableRepository userVariableRepository;

    @Override
    public UserVariableEntity getWalkData(Long userIdx) {
        return userVariableRepository.findById(userIdx).orElseThrow(NoSuchElementException::new);
    }
}
