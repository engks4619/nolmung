package com.a703.spot.util;

import org.apache.commons.lang3.StringUtils;
public class ParameterUtil {

    public static int checkPage(String page) {
        if(!StringUtils.isNumeric(page) || Integer.parseInt(page) <= 0) {
            return 0;
        } else {
            return Integer.parseInt(page) - 1;
        }
    }
    public static int checkDesc(String desc) {
        if(!StringUtils.isNumeric(desc) || Integer.parseInt(desc) <= 0) {
            return 0;
        } else {
            return Integer.parseInt(desc);
        }
    }
}
