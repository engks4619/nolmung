package com.a703.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/auth")
public class AuthController {
    @PostMapping
    public ResponseEntity<?> signIn(@RequestBody String phone, @RequestBody String password){

        return null;
    }
}
