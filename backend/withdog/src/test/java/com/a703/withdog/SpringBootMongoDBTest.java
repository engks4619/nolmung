package com.a703.withdog;

import com.a703.withdog.repository.PersonMongoDBRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SpringBootMongoDBTest {

    @Autowired
    private PersonMongoDBRepository personMongoDBRepository;

    @Test
    public void printPersonData(){
        System.out.println("실행시작");
        System.out.println(personMongoDBRepository.findAll());
        System.out.println(personMongoDBRepository.findByName("Jackson"));
        System.out.println("실행완료");
    }
}
