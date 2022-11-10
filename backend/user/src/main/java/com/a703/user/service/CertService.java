package com.a703.user.service;

import com.a703.user.entity.CertEntity;

public interface CertService {
    CertEntity save(CertEntity certEntity);
    CertEntity find(String phone);
    Boolean exist(String phone);
}
