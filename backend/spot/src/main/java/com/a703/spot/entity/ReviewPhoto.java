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
    @Column(name = "review_photo_idx", unique = true, columnDefinition = "BIGINT")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewPhotoIdx;

    @ManyToOne
    @JoinColumn(name= "review_idx", updatable = false, nullable = false)
    private SpotReview spotReview;

    @Column(name = "photo_url", columnDefinition = "VARCHAR(255)")
    private String photoUrl;

}
