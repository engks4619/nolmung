package com.a703.community.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "lucky_dog")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LuckyDog {

    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckyDogIdx;

    private Long userIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_idx", referencedColumnName = "post_idx")
    private Post post;


}
