package com.a703.spot.dto.response;

import com.a703.spot.exception.model.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
    private final int code;
    private final HttpStatus status;
    private final String message;

    public static ErrorResponse of(ErrorCode errorCode) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .status(errorCode.getHttpStatus())
                .message(errorCode.getMessage())
                .build();
    }
}