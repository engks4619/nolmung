package com.a703.withdog.dto;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class Person {
    private String name;
    private String job;

    @Override
    public String toString() {
        return "name is " + name + " job is " + job;
    }
}
