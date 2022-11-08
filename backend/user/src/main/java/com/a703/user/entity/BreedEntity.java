package com.a703.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Transactional(readOnly = true)
@Table(name = "tbl_breed")
public class BreedEntity {
    @Id
    Integer breedCode;
    String breedCodeValue;
}
