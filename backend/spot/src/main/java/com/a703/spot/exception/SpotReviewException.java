package com.a703.spot.exception;

import com.a703.spot.exception.model.ErrorCode;
import lombok.Getter;

@Getter
public class SpotReviewException extends RuntimeException {

    private final ErrorCode errorCode;
    public SpotReviewException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
