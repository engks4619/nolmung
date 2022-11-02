package com.a703.spot.util;

import com.a703.spot.dto.request.SpotRequest;
import com.a703.spot.properties.ConstProperties;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ParameterUtil {
    private  final ConstProperties constProperties;
    public static int checkPage(String page) {
        if(!StringUtils.isNumeric(page) || Integer.parseInt(page) <= 0) {
            return 0;
        } else {
            return Integer.parseInt(page) - 1;
        }
    }
    public static int checkSort(String sort) {
        if(!StringUtils.isNumeric(sort) || Integer.parseInt(sort) <= 0) {
            return 0;
        } else {
            return Integer.parseInt(sort);
        }
    }

    public SpotRequest checkSpotRequest(SpotRequest request) {
        if(request.getLat() == null || request.getLng() == null || request.getLat() == 0 || request.getLng() == 0) { // 위치정보 동의 안했을 경우 기본 위치 설정
            request.setLat(constProperties.getDefaultLat());
            request.setLng(constProperties.getDefaultLng());
        }
        if(request.getSearchValue() == null) {
            request.setSearchValue("");
        }
        if(request.getLimitDistance() == null || request.getLimitDistance() == 0) {
            request.setLimitDistance(constProperties.getDefaultLimitDistance());
        }
        if(request.getCategory() == null || "".equals(request.getCategory())) {
            request.setCategory(constProperties.getDefaultCategory());
        }
        return request;
    }
}
