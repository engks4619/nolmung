package com.a703.community.repository;

import com.a703.community.entity.Chat;
import com.a703.community.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long>{

    Integer countChatByPost(Post post);

    List<Chat> findByCallerUserIdx(Long callerUserIdx);

    List<Chat> findByPostWriterIdx(Long userIdx);

}
