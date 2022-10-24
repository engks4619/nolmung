package com.a703.spot.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "tbl_spot")
public class Spot {
    @Id
    @Column(name = "spot_idx", nullable = false)
    private long idx;

    @Column(name = "name", columnDefinition = "VARCHAR(255)")
    private String name;

    @Column(name = "address", columnDefinition = "VARCHAR(255)")
    private String address;

    @Column(name = "tel", columnDefinition = "VARCHAR(255)")
    private String tel;

    @Column(name = "tag", columnDefinition = "VARCHAR(255)")
    private String tag;

    @Column(name = "time", columnDefinition = "VARCHAR(255)")
    private String time;

    @Column(name = "desc", columnDefinition = "TEXT")
    private String desc;

    @Column(name = "menu", columnDefinition = "TEXT")
    private String menu;

    @Column(name = "lat", columnDefinition = "DOUBLE")
    private double lat;

    @Column(name = "lng", columnDefinition = "DOUBLE")
    private double lng;
}
