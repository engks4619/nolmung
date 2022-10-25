package com.a703.community.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TblReviewLike {


    @EmbeddedId
    private TblReviewLikeId id;

}
