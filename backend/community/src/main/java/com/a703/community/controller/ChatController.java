package com.a703.community.controller;


import com.a703.community.dto.response.ChatDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.a703.community.service.ChatService;
import com.a703.community.util.ClientUtil;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community/chat")
public class ChatController {

    private final ChatService chatService;
    private final ClientUtil clientUtil;

    @PostMapping("{postIdx}")
    public ResponseEntity<?> saveChatHistory(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long postIdx, @RequestBody Map<String, Object> body){

        chatService.saveChat(postIdx, (String) body.get("roomId"), token);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping
    public ResponseEntity<List<ChatDto>> getChatList(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        List<ChatDto> chatListDtos =chatService.getChatList(userInfoDto.getUserIdx());
        return ResponseEntity.ok().body(chatListDtos);
    }

    @GetMapping("/{userIdx}")
    public ResponseEntity<List<ChatDto>> getChatList(@PathVariable Long userIdx){
        List<ChatDto> chatListDtos =chatService.getChatList(userIdx);
        return ResponseEntity.ok().body(chatListDtos);
    }
}
