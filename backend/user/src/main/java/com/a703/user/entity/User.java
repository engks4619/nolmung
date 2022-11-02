package com.a703.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@ToString
@RequiredArgsConstructor

@Table(name = "tbl_user")
public class User extends BaseEntity {
    @Id
    Long userIdx;

    @Column(nullable = false, length = 15, unique = true)
    String phone;
    @Column(nullable = false, length = 20)
    String password;
    @Column(nullable = false, length = 20, unique = true)
    String nickname;
    @Column(nullable = false)
    String profileImage;
}
