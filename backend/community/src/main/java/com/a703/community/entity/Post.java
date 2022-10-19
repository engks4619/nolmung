package com.a703.community.entity;


import com.a703.community.type.CategoryType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post {

    @Id
    @Column(unique = true,name = "post_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postIdx;

    private Long dogIdx;

    private Long userIdx;

    @Column(length = 20)
    private CategoryType categoryType;

    private String subject;

    @Column(length = 200)
    private String content;

    private LocalDateTime createDate;

    //재등록
    private LocalDateTime modifyDate;

    private LocalDateTime walkDate;

    private Boolean getCompleted;

    private Boolean get_deleted;

    @Column(length = 100)
    private String location;

    private Integer pay;

    private Boolean lead;

    private Boolean poopBag;

//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//    private Set<ReviewLike> reviewLikes = new HashSet<>();
//
//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//    private Set<LuckyDog> luckyDogs = new HashSet<>();


}
