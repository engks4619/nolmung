package com.a703.user.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "cert", timeToLive = 300)
@Builder
@Getter
public class CertEntity {
    @Id
    private String phone;
    private String cert;
}
