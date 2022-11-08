package com.a703.community.service;

import com.a703.community.dto.response.ChatDto;
import com.a703.community.entity.Chat;
import com.a703.community.entity.Post;
import com.a703.community.repository.ChatRepository;
import com.a703.community.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;

    private final PostRepository postRepository;

    public void saveChat(Long postIdx, String token){

//        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
//        Long userIdx = userInfoDto.getUserIdx();
        //통신필요
        Long userIdx = 1L;

        Post post = postRepository.findByPostIdx(postIdx);

        Chat chat = Chat.builder()
                .callerUserIdx(userIdx)
                .post(post)
                .build();
        chatRepository.save(chat);
    }

    public List<ChatDto> getChatList(String token){
        //        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
//        Long userIdx = userInfoDto.getUserIdx();
        //통신필요
        Long userIdx = 1L;

        List<Chat> callerChatList =chatRepository.findByCallerUserIdx(userIdx);
        List<Chat> writerChatList =chatRepository.findByPostWriterIdx(userIdx);
        List<ChatDto> callerChatDto = callerChatList.stream().map(chat -> ChatDto.builder()
                .chatUserIdx(chat.getPost().getWriterIdx())
                .postIdx(chat.getPost().getPostIdx())
                .build())
                .collect(Collectors.toList());
        List<ChatDto> writerChatDto = writerChatList.stream().map(chat -> ChatDto.builder()
                        .chatUserIdx(chat.getCallerUserIdx())
                        .postIdx(chat.getPost().getPostIdx())
                        .build())
                .collect(Collectors.toList());
        callerChatDto.addAll(writerChatDto);
        return callerChatDto;


    }
}
