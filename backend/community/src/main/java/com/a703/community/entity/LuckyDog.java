package com.a703.community.entity;

import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Builder
@Table(name = "tbl_lucky_dog")
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LuckyDog {

    @EmbeddedId
    private LuckyDogId id;




}
