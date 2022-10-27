package com.a703.spot.dto.response;

import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Component;

public interface SpotDtoInterface {
    String getSpotId();
    String getName();
    String getAddress();
    String getTel();
    String getTag();
    String getTime();
    String getMenu();
    String getDescription();
    Double getLat();
    Double getLng();
    Integer getImgCnt();
    String getCategory();
//    Point getLocation();
    Double getDistanceDiff();
    Double getStar();
    Integer getReviewCnt();
}
