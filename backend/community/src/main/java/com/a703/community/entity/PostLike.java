package com.a703.community.entity;

import lombok.*;

import javax.persistence.*;

@Table(name = "tbl_post_like")
@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostLike {

    @EmbeddedId
    private PostLikeId id;

}
