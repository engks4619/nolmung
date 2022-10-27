package com.a703.community.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TblPostLike {


    @EmbeddedId
    private TblPostLikeId id;

}
