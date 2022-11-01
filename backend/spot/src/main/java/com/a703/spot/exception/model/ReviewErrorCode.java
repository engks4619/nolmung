package com.a703.spot.exception.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReviewErrorCode implements ErrorCode {
    REVIEW_NOT_FOUND(1000, HttpStatus.NOT_FOUND, "Review is Not Found"),
    ;

    private final int code;
    private final HttpStatus httpStatus;
    private final String message;
}
