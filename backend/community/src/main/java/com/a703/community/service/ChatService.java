package com.a703.community.service;

import com.a703.community.dto.response.ChatDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.a703.community.entity.Chat;
import com.a703.community.entity.Post;
import com.a703.community.repository.ChatRepository;
import com.a703.community.repository.LuckyDogRepository;
import com.a703.community.repository.PostPhotoRepository;
import com.a703.community.repository.PostRepository;
import com.a703.community.util.ClientUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;

    private final PostRepository postRepository;

    private final ClientUtil clientUtil;

    private final PostPhotoRepository postPhotoRepository;

    private final LuckyDogRepository luckyDogRepository;

    public void saveChat(Long postIdx, String token){

        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long userIdx = userInfoDto.getUserIdx();


        Post post = postRepository.findByPostIdx(postIdx);

        Chat chat = Chat.builder()
                .callerUserIdx(userIdx)
                .post(post)
                .build();
        chatRepository.save(chat);
    }

    public List<ChatDto> getChatList(String token){
        UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
        Long userIdx = userInfoDto.getUserIdx();

        List<Chat> callerChatList =chatRepository.findByCallerUserIdx(userIdx);
        List<Chat> writerChatList =chatRepository.findByPostWriterIdx(userIdx);
        List<ChatDto> callerChatDto = callerChatList.stream().map(chat -> {
            UserInfoDto writerInfo = clientUtil.requestOtherUserInfo(chat.getPost().getWriterIdx());

            String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(chat.getPost().getPostIdx()) ? postPhotoRepository.findByPostPostIdx(chat.getPost().getPostIdx()).get(0).getPhotoUrl()
                    : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(chat.getPost().getPostIdx()).getId().getDogIdx())).get(0).getImage();


                    return ChatDto.builder()
                            .Completed(chat.getPost().getGetCompleted())
                            .nickname(writerInfo.getNickname())
                            .userImgUrl(writerInfo.getProfileImage())
                            .isOwner(false)
                            .chatUserIdx(chat.getPost().getWriterIdx())
                            .postIdx(chat.getPost().getPostIdx())
                            .categoryType(chat.getPost().getCategoryType())
                            .subject(chat.getPost().getSubject())
                            .thumbnailUrl(thumbnailUrl)
                            .build();
                })
                .collect(Collectors.toList());
        List<ChatDto> writerChatDto = writerChatList.stream().map(chat -> {
                    UserInfoDto callerInfo = clientUtil.requestOtherUserInfo(chat.getCallerUserIdx());

                    String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(chat.getPost().getPostIdx()) ? postPhotoRepository.findByPostPostIdx(chat.getPost().getPostIdx()).get(0).getPhotoUrl()
                            : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(chat.getPost().getPostIdx()).getId().getDogIdx())).get(0).getImage();


                    return ChatDto.builder()
                            .isOwner(true)
                            .Completed(chat.getPost().getGetCompleted())
                            .chatUserIdx(chat.getCallerUserIdx())
                            .postIdx(chat.getPost().getPostIdx())
                            .nickname(callerInfo.getNickname())
                            .userImgUrl(callerInfo.getProfileImage())
                            .categoryType(chat.getPost().getCategoryType())
                            .subject(chat.getPost().getSubject())
                            .thumbnailUrl(thumbnailUrl)
                            .build();
                })
                .collect(Collectors.toList());
        callerChatDto.addAll(writerChatDto);
        return callerChatDto;


    }
}
