package com.a703.withdog.controller;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.dto.WalkRes;
import com.a703.withdog.serrvice.WalkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/walk")
@RequiredArgsConstructor
public class WalkController {
    private final WalkService walkService;

    @GetMapping("/save")
    public ResponseEntity<?> saveWalk(@RequestBody WalkDTO walk) {
        /**
         * @Method Name : saveWalk
         * @Method 설명 : 산책 기록 저장 후 산책 id 반환
         */
        int walkIdx = walkService.saveWalk(walk);

        return ResponseEntity.ok().body(walkIdx);
    }

    @GetMapping("record/owner/{ownerIdx}")
    public ResponseEntity<?> getWalkListByOwner(@PathVariable int ownerIdx) {
        /**
         * @Method Name : getWalkListByOwner
         * @Method 설명 : 견주 id로 산책 기록들 조회
         */
        List<WalkRes> walkResList = walkService.findByOwnerIdx(ownerIdx);
        if (!walkResList.isEmpty()) {
            return ResponseEntity.ok().body(walkResList);
        }

        return ResponseEntity.badRequest().body(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/dog/{walkedDogIdx}")
    public ResponseEntity<?> getWalkListByWalkedDog(@PathVariable int walkedDogIdx) {
        /**
         * @Method Name : getWalkListByWalkedDog
         * @Method 설명 : 산책한 강아지 id로 산책 기록들 조회
         */
        List<WalkRes> walkResList = walkService.findByWalkedDog(walkedDogIdx);
        if (!walkResList.isEmpty()) {
            return ResponseEntity.ok().body(walkResList);
        }
        return ResponseEntity.badRequest().body(HttpStatus.NOT_FOUND);
    }
}
