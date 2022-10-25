package com.a703.withdog.controller;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.serrvice.WalkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/walk")
@RequiredArgsConstructor
public class WalkController {

    private final WalkService walkService;

    @GetMapping("/save")
    public int saveWalk(@RequestBody WalkDTO walk) {
        return walkService.saveWalk(walk);
    }

}
