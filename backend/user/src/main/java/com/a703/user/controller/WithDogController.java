package com.a703.user.controller;

import com.a703.user.vo.request.RequestWithdog;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/withdog")
public class WithDogController {
    @PostMapping
    ResponseEntity<?> completeWithDog(@RequestBody RequestWithdog requestWithdog){
        HttpStatus status = HttpStatus.OK;
        String msg = "Good";
        return ResponseEntity.status(status).body(msg);
    }
}
