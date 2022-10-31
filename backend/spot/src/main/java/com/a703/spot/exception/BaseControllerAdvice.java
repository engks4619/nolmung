package com.a703.spot.exception;

import com.a703.spot.dto.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
@Slf4j
public class BaseControllerAdvice {

    @ExceptionHandler(SpotReviewException.class)
    public ResponseEntity<ErrorResponse> spotReviewException(SpotReviewException e, HttpServletRequest req) {
        log.error(req.getRequestURI());
        log.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        log.error(e.getMessage());

        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.of(e.getErrorCode()));
    }
}
