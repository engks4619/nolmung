package com.a703.user.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@ToString
@Table(name = "tbl_user")
public class UserEntity extends BaseEntity {
    @Id
    Long userIdx;

    @Column(nullable = false, length = 15, unique = true)
    String phone;
    @Column(nullable = false)
    String password;
    @Setter
    @Column(nullable = false, length = 20, unique = true)
    String nickname;
    @Column(nullable = false)
    String profileImage;
}
