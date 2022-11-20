package com.a703.spot.exception.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReviewErrorCode implements ErrorCode {
    REVIEW_NOT_FOUND(1000, HttpStatus.NOT_FOUND, "Review is Not Found"),
    FILE_UPLOAD_FAILED(1001, HttpStatus.EXPECTATION_FAILED, "File Upload Failed")
    ;

    private final int code;
    private final HttpStatus httpStatus;
    private final String message;
}
