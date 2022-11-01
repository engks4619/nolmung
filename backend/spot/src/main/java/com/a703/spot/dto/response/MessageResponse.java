package com.a703.spot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class MessageResponse {
    HttpStatus status;
    String message;

    public static MessageResponse of(HttpStatus status, String message) {
        return new MessageResponse(status, message);
    }
}
