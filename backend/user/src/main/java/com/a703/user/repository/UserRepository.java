package com.a703.user.repository;

import com.a703.user.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUserIdx(Long userIdx);
}
