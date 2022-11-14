package com.a703.user.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
@Table(name = "tbl_history")
public class HistoryEntity extends BaseEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyIdx;

    @ManyToOne
    @JoinColumn(name = "userIdx")
    private UserEntity user;

    private Boolean owner;
    private Double star;
    private String review;
    private String recordIdx;
}