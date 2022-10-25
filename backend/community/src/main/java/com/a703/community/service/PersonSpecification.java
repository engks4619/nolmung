package com.a703.community.service;

import com.a703.community.entity.TblPost;
import org.springframework.data.jpa.domain.Specification;

public class PersonSpecification {

    public static Specification<TblPost> equalLastName(String location) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("location"), location);
    }

    public static Specification<TblPost> equalAge(String dogBreed) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("dogBreed"), dogBreed);
    }

    public static Specification<TblPost> equalTeam(Integer pay) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("pay"), pay);
    }
}