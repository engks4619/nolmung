package com.a703.community.controller;

import com.a703.community.dto.request.AlbaReuest;
import com.a703.community.dto.response.AlbaDto;
import com.a703.community.service.AlbaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/alba")
public class AlbaController {

    private final AlbaService albaService;

    @PostMapping()
    public ResponseEntity<?> fixAlba(@RequestBody AlbaReuest albaReuest) {

        albaService.fixAlba(albaReuest);
        return ResponseEntity.ok().body("success");
    }

    @PutMapping("/{postIdx}")
    public ResponseEntity<?> deleteAlba(@PathVariable Long postIdx) {

        albaService.deleteAlba(postIdx);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/{postIdx}")
    public ResponseEntity<?> showAlba(@PathVariable Long postIdx) {

        AlbaDto albaDto =albaService.showAlba(postIdx);
        return ResponseEntity.ok().body(albaDto);
    }


}
