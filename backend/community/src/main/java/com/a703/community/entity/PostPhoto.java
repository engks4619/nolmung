package com.a703.community.entity;

import lombok.*;

import javax.persistence.*;

@Table(name = "tbl_post_photo")
@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostPhoto {
    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postPhotoIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_idx", referencedColumnName = "post_idx")
    private Post post;

    private String photoUrl;
}
