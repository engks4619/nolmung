package com.a703.community.search;

import com.a703.community.entity.Post;
import com.a703.community.type.CategoryType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class PostSpecification {

    public static Specification<Post> equalLocation(String location) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("location"), location);
    }

    public static Specification<Post> equalCategoryTpye(CategoryType categoryType) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categoryType"), categoryType);
    }

    public static Specification<Post> greaterThanPay(Integer startPay) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("pay"), startPay);
    }

    public static Specification<Post> lessThanPay(Integer endPay) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("pay"), endPay);

    }

    public static Specification<Post> greaterThanWalkDate(LocalDateTime startWalkDate) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("walkDate"), startWalkDate);
    }

    public static Specification<Post> lessThanWalkeDate(LocalDateTime endWalkDate) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("walkDate"), endWalkDate);

    }

}