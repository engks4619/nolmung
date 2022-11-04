package com.a703.spot.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Getter
@RequiredArgsConstructor
@ConstructorBinding
@ConfigurationProperties(prefix = "const")
public class ConstProperties {
    private final int spotListSize;
    private final Double defaultLat;
    private final Double defaultLng;
    private final Integer defaultLimitDistance;
    private final String defaultCategory;
}
