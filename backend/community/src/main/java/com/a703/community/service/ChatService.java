package com.a703.community.service;

import com.a703.community.entity.Chat;
import com.a703.community.entity.Post;
import com.a703.community.repository.ChatRepository;
import com.a703.community.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;

    private final PostRepository postRepository;

    public void saveChat(Long postIdx, Map<String,Object> token){

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
}
