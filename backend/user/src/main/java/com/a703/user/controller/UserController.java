package com.a703.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/health_check")
    public String status() {
        return "It's Working in User Service " + "010-3060-1985".hashCode();
    }

//    @PostMapping("/")
//    public String createUser(@RequestBody RequestUser user){
//        return "Create user method is called";
//    }
}
