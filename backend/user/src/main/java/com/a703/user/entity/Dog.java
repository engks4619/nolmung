package com.a703.user.entity;

import javax.persistence.Id;

public class Dog extends BaseEntity {
    @Id
    Long dogIdx;
    String dogName;
    Boolean neuter;
    Boolean vaccination;
    Character gender;
    String image;
    String desc;
}
