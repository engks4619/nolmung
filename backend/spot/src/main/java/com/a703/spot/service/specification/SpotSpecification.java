package com.a703.spot.service.specification;

import com.a703.spot.entity.Spot;
import org.springframework.data.jpa.domain.Specification;

public class SpotSpecification {
    public static Specification<Spot> containsName(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%"+name+"%");
    }

    public static Specification<Spot> equalCategory(String category) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category"), category);
    }



}
