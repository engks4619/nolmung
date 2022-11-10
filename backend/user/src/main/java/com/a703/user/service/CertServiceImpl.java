package com.a703.user.service;

import com.a703.user.entity.CertEntity;
import com.a703.user.repository.CertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CertServiceImpl implements CertService {
    private final CertRepository certRepository;

    @Override
    public CertEntity save(CertEntity certEntity) {
        return certRepository.save(certEntity);
    }

    @Override
    public CertEntity find(String phone) {
        return certRepository.findById(phone).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public Boolean exist(String phone) {
        return certRepository.existsById(phone);
    }
}
