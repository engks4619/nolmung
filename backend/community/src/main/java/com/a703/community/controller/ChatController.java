package com.a703.community.controller;


import com.a703.community.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("{postIdx}")
    public ResponseEntity<?> saveChatHistory(@RequestHeader Map<String, Object> token, @PathVariable Long postIdx){

        chatService.saveChat(postIdx, token);
        return ResponseEntity.ok().body("success");
    }
}
