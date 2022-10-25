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
@Table(name = "tbl_review_photo")
public class ReviewPhoto {
    @Id
    @Column(name = "review_photo_idx", nullable = false, columnDefinition = "BIGINT")
    private long reviewPhotoIdx;

    @ManyToOne
    @JoinColumn(name= "review_idx", insertable = false, updatable = false, nullable = false)
    private SpotReview spotReview;

    @Column(name = "review_url", columnDefinition = "VARCHAR(255)")
    private String reviewUrl;

}
