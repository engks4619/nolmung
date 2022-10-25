package com.a703.spot.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "tbl_spot_review")
public class SpotReview extends BaseTime {
    @Id
    @Column(name = "review_idx", nullable = false)
    private long reviewIdx;

    @ManyToOne
    @JoinColumn(name= "spot_id", insertable = false, updatable = false, nullable = false)
    private Spot spot;

    @Column(name = "star", columnDefinition = "DOUBLE")
    private double star;

    @Column(name = "content", columnDefinition = "VARCHAR(255)")
    private String content;

    @Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
    private boolean isDeleted;

    @Column(name = "user_idx", columnDefinition = "BIGINT", nullable = false)
    private long userIdx;

}
