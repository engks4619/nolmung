package com.a703.user.service;

import com.a703.user.dto.UserDto;
import com.a703.user.entity.User;
import com.a703.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setUserIdx((long) userDto.getPhone().hashCode());

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User userEntity = mapper.map(userDto, User.class);
        userRepository.save(userEntity);
        return null;
    }
}
