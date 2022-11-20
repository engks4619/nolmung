package com.a703.user.controller;

import com.a703.user.service.WithDogService;
import com.a703.user.vo.request.RequestWithdog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/withdog")
@RequiredArgsConstructor
public class WithDogController {
    private final WithDogService withDogService;

    @PostMapping
    ResponseEntity<?> completeWithDog(@RequestBody RequestWithdog requestWithdog){
        withDogService.withDogFinish(requestWithdog);
        return ResponseEntity.ok().build();
    }
}
