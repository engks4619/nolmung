package com.a703.community.entity;


import com.a703.community.type.CategoryType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class TblPost extends BaseEntity{

    @Id
    @Column(unique = true,name = "post_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postIdx;

    private Long dogIdx;

    private Long writerIdx;

    private Long albaIdx;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private CategoryType categoryType;

    private String subject;

    @Column(length = 200)
    private String content;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime walkDate;

    @ColumnDefault("false")
    private Boolean getCompleted;

    @ColumnDefault("false")
    private Boolean getDeleted;

    @Column(length = 100)
    private String location;

    private Integer pay;

    private Boolean leadLine;

    private Boolean poopBag;

    private Integer reRegister;



}
