package com.a703.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_user_variable")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Getter
public class UserVariableEntity {
    @Id
    private Long userIdx;
    @ColumnDefault("0")
    private Integer point;
    @ColumnDefault("0")
    private Double sumOwnerStar;
    @ColumnDefault("0")
    private Integer cntOwnerStar;
    @ColumnDefault("0")
    private Double sumAlbaStar;
    @ColumnDefault("0")
    private Integer cntAlbaStar;
    @ColumnDefault("0")
    private Integer cntWalk;
    @ColumnDefault("0")
    private Double totalDistance;
    @ColumnDefault("0")
    private Integer totalTime;

    public void addOwnerReview(Double star) {
        this.cntOwnerStar++;
        this.sumOwnerStar += star;
    }

    public void addAlbaReview(Double star) {
        this.cntAlbaStar++;
        this.sumAlbaStar += star;
    }

    public void addWalk(Double distance, Integer time) {
        this.point += distance.intValue() / 100;
        this.totalDistance += distance;
        this.totalTime += time;
        this.cntWalk++;
    }
}
