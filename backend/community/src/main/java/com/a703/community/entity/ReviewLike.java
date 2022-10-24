package com.a703.community.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ReviewLike {


    @EmbeddedId
    private ReviewLikeId id;



//    @Id
//    @Column(unique = true)
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long reviewLikeIdx;


//    private Long userIdx;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "post_idx", referencedColumnName = "post_idx")
//    private Post post;



}
