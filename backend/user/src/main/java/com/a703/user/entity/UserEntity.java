package com.a703.user.entity;

import lombok.Getter;
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
    private Long userIdx;

    @Column(nullable = false, length = 15, unique = true)
    private String phone;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, length = 20, unique = true)
    private String nickname;
    @Column(nullable = false)
    private String profileImage;

    public void modifyPassword(String encryptedPassword){
        this.password = encryptedPassword;
    }

    public void modifyNickname(String nickname){
        this.nickname = nickname;
    }

    public void modifyProfileImage(String profileImage){
        this.profileImage = profileImage;
    }
}
