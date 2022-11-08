package com.a703.community.controller;


import com.a703.community.dto.response.ChatDto;
import com.a703.community.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("{postIdx}")
    public ResponseEntity<?> saveChatHistory(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long postIdx){

        chatService.saveChat(postIdx, token);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping
    public ResponseEntity<List<ChatDto>> getChatList(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        List<ChatDto> chatListDtos =chatService.getChatList(token);
        return ResponseEntity.ok().body(chatListDtos);
    }
}
