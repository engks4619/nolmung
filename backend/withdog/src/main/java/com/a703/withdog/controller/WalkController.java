package com.a703.withdog.controller;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.serrvice.WalkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(path = "/walk")
public class WalkController {

    @Autowired
    WalkService walkService;

    @GetMapping(value = "save")
    public int saveWalk(@RequestBody WalkDTO walk) {
        return walkService.saveWalk(walk);
    }

}
