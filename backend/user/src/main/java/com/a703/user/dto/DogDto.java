package com.a703.user.dto;

import com.a703.user.entity.BreedEntity;
import com.a703.user.entity.UserEntity;
import lombok.Data;

@Data
public class DogDto {
    private Long dogIdx;
    private String dogName;
    private Boolean neuter;
    private Boolean vaccination;
    private Character gender;
    private String image;
    private String description;
    private UserEntity user;
    private BreedEntity breed;


    public String getBreedCodeValue(){
        return this.breed.getBreedCodeValue();
    }
}
