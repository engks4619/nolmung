package com.a703.user.service;

import com.a703.user.dto.UserDto;
import com.a703.user.vo.response.ResponseUser;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService extends UserDetailsService {
    void createUser(UserDto userDto);
    UserDto getUserByUserIdx(Long userIdx);
    UserDto getUserByPhone(String phone);
    boolean exist(String phone);
    ResponseUser modifyProfile(Long userIdx, MultipartFile file, String nickname) throws IOException;
}
