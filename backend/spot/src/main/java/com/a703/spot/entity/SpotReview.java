package com.a703.spot.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Table(name = "tbl_spot_review")
public class SpotReview extends BaseTime {
    @Id
    @Column(name = "review_idx", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewIdx;

    @ManyToOne
    @JoinColumn(name = "spot_id", updatable = false, nullable = false)
    private Spot spot;

    @Column(name = "star", columnDefinition = "DOUBLE")
    private double star;

    @Column(name = "content", columnDefinition = "VARCHAR(255)")
    private String content;

    @Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
    @ColumnDefault("0")
    private boolean isDeleted;

    @Column(name = "user_idx", columnDefinition = "BIGINT", nullable = false)
    private long userIdx;

    public void setIsDeleted(boolean flag) {
        this.isDeleted = flag;
    }
}
