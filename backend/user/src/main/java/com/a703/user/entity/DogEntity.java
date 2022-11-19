package com.a703.user.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Table(name = "tbl_dog")
@Entity
@Getter
@ToString
@DynamicUpdate
public class DogEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dogIdx;

    private String dogName;
    private Boolean neuter;
    private Boolean vaccination;
    private Character gender;
    private String image;
    private String description;
    private Boolean deleted;

    @ManyToOne
    @JoinColumn(name = "userIdx")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "breedCode")
    private BreedEntity breed;

    public void changeDogImage(String savePath) {
        this.image = savePath;
    }

    public void deleteDog() {
        this.deleted = true;
    }
}
