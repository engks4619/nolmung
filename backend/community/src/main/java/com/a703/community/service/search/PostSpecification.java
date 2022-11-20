package com.a703.community.service.search;

import com.a703.community.entity.Post;
import com.a703.community.type.CategoryType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PostSpecification {
//    private static LuckyDogRepository luckyDogRepository;

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

    public static Specification<Post> findDogBreedByPostIdx(List<Long> postIdxList) {
        return (root, query, criteriaBuilder) -> root.get("postIdx").in(postIdxList);
    }
    public static Specification<Post> findTitle(String title){
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("subject"), "%" + title.trim() + "%");
    }
    public static Specification<Post> findAddress(String address){
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("subject"), "%" + address.substring(0,4) + "%");
    }
}