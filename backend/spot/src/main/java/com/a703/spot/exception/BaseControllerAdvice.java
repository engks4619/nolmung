package com.a703.spot.exception;

import com.a703.spot.dto.response.ErrorResponse;
import com.a703.spot.dto.response.MessageResponse;
import com.a703.spot.exception.model.BaseErrorCode;
import com.a703.spot.exception.model.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException e, HttpServletRequest req) {
        log.error(req.getRequestURI());
        log.error(e.getClass().getCanonicalName());
        e.printStackTrace();
        log.error(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(new BaseErrorCode(
                        400,
                        HttpStatus.BAD_REQUEST,
                        e.getBindingResult().getAllErrors().get(0).getDefaultMessage())));
    }
}
