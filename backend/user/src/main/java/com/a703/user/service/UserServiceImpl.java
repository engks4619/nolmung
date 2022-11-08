package com.a703.user.service;

import com.a703.user.dto.UserDto;
import com.a703.user.entity.UserEntity;
import com.a703.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void createUser(UserDto userDto) {
        userDto.setUserIdx((long) userDto.getPhone().hashCode());
        userDto.setNickname("user" + userDto.getUserIdx());
        userDto.setProfileImage("/images/user/default/default.png");
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true)
                .setMatchingStrategy(MatchingStrategies.STRICT);
        UserEntity userEntity = mapper.map(userDto, UserEntity.class);

        userRepository.save(userEntity);
    }

    @Override
    public UserDto getUserByUserIdx(Long userIdx) {
        UserEntity userEntity = userRepository.findById(userIdx).orElseThrow(NoSuchElementException::new);

        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new ModelMapper().map(userEntity, UserDto.class);
    }

    @Override
    public UserDto getUserByPhone(String phone) {
        return this.getUserByUserIdx((long) phone.hashCode());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findById((long) username.hashCode()).orElseThrow(NoSuchElementException::new);

        if (userEntity == null) {
            throw new UsernameNotFoundException(username);
        }

        return new User(userEntity.getPhone(), userEntity.getPassword(), true, true, true, true, new ArrayList<>());
    }
}
