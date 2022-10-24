package com.a703.withdog.repository;

import com.a703.withdog.dto.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonMongoDBRepository extends MongoRepository<Person, String> {
    public Person findByName(String name);
}
