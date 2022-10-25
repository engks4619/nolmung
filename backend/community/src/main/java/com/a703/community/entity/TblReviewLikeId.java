package com.a703.community.entity;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

public class TblReviewLikeId implements Serializable {

    private Long userIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_idx", referencedColumnName = "post_idx")
    private TblPost post;

}
