package com.a703.user.service;

import com.a703.user.dto.UserDto;
import com.a703.user.entity.User;
import com.a703.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void createUser(UserDto userDto) {
        userDto.setUserIdx((long) userDto.getPhone().hashCode());
        userDto.setNickname("user"+userDto.getUserIdx());
        userDto.setProfileImage("/images/user/default/default.png");
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
                .setFieldMatchingEnabled(true)
                .setMatchingStrategy(MatchingStrategies.STRICT);
        User userEntity = mapper.map(userDto, User.class);

        userRepository.save(userEntity);
    }

    @Override
    public UserDto getUserByUserIdx(Long userIdx) {
        User userEntity = userRepository.findByUserIdx(userIdx);

        if(userEntity == null){
            throw new UsernameNotFoundException("User not found");
        }

        UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);

        return userDto;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
