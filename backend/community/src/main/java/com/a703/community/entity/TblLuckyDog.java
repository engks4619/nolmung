package com.a703.community.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "tbl_lucky_dog")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TblLuckyDog {

    @EmbeddedId
    private TblLuckyDogId id;




}
