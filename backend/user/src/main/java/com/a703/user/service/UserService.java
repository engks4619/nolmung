package com.a703.user.service;

import com.a703.user.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    void createUser(UserDto userDto);
    UserDto getUserByUserIdx(Long userIdx);
    UserDto getUserByPhone(String phone);
    boolean exist(String phone);
}
