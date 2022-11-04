package com.a703.spot.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
@Slf4j
public class BaseControllerAdvice {

    @ExceptionHandler(SpotReviewException.class)
    public ResponseEntity<String> spotReviewException(SpotReviewException e, HttpServletRequest req) {
        log.error(req.getRequestURI());
        log.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        log.error(e.getMessage());

        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(e.getErrorCode().getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValid(MethodArgumentNotValidException e, HttpServletRequest req) {
        log.error(req.getRequestURI());
        log.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        log.error(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }
}
