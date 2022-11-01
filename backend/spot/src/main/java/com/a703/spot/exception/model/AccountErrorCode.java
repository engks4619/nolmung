package com.a703.spot.exception.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AccountErrorCode implements ErrorCode {

    ACCOUNT_NOT_FOUND(1000, HttpStatus.NOT_FOUND, "User is Not Found"),
    ACCOUNT_WRONG_PASSWORD(1001, HttpStatus.OK, "Wrong Password"),
    ACCOUNT_NOT_MATCH(1002, HttpStatus.FORBIDDEN, "Permission Denied ")
    ;

    private final int code;
    private final HttpStatus httpStatus;
    private final String message;
}
