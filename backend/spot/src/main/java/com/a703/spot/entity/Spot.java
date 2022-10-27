package com.a703.spot.entity;

import com.a703.spot.dto.response.SpotTransferDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name = "tbl_spot")
//@NamedNativeQuery(
//        name = "find_spot_by_distance",
//        query = "SELECT *, ST_DISTANCE_SPHERE(POINT(:currLng,:currLat), POINT(s.lng, s.lat)) AS distance_diff " +
//                "FROM tbl_spot AS s " +
//                "HAVING distance_diff <= :dist " +
//                "ORDER BY distance_diff ",
//        resultSetMapping = "spot_transfer_dto"
//)
//@SqlResultSetMapping(
//        name="spot_transfer_dto",
//        classes = @ConstructorResult(
//                targetClass = SpotTransferDto.class,
//                columns = {
//                        @ColumnResult(name = "spot_id", type = String.class),
//                        @ColumnResult(name = "name", type = String.class),
//                        @ColumnResult(name = "address", type = String.class),
//                        @ColumnResult(name = "tel", type = String.class),
//                        @ColumnResult(name = "tag", type = String.class),
//                        @ColumnResult(name = "time", type = String.class),
//                        @ColumnResult(name = "menu", type = String.class),
//                        @ColumnResult(name = "description", type = String.class),
//                        @ColumnResult(name = "lat", type = Double.class),
//                        @ColumnResult(name = "lng", type = Double.class),
//                        @ColumnResult(name = "img_cnt", type = Integer.class),
//                        @ColumnResult(name = "category", type = String.class),
//                        @ColumnResult(name = "distance_diff", type = Double.class)
//                }
//        )
//)
public class Spot {
    @Id
    @Column(name = "spot_id", nullable = false, columnDefinition = "VARCHAR(255)")
    private String spotId;

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

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "menu", columnDefinition = "TEXT")
    private String menu;

    @Column(name = "lat", columnDefinition = "DOUBLE")
    private double lat;

    @Column(name = "lng", columnDefinition = "DOUBLE")
    private double lng;

    @Column(name = "img_cnt", columnDefinition = "INT")
    @ColumnDefault("0")
    private int imgCnt;

    @Column(name = "category", columnDefinition = "VARCHAR(10)")
    private String category;

//    @Column(name = "location")
//    private Point location;

}
