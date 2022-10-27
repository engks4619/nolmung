package com.a703.community.repository;

import com.a703.community.entity.TblPost;
import com.a703.community.type.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<TblPost,Long>, JpaSpecificationExecutor<TblPost> {

//    List<TblPost> findByCategoryTypeOrderByModifyDateDesc(CategoryType categoryType);
//
//    List<TblPost> findFirst10ByOrderByModifyDateDesc();

//    Page<TblPost> findAll(Pageable pageable, Specification<TblPost> spec);
    Page<TblPost> findByCategoryTypeAndWriterIdx(CategoryType categoryType,Long writerIdx, Pageable pageable);

    Page<TblPost> findByCategoryType(CategoryType categoryType, Pageable pageable);

    TblPost findByPostIdx(Long postIdx);

    @Query(value = "SELECT * FROM tbl_post a " +
            "WHERE a.post_idx in (SELECT b.post_idx FROM tbl_post_like b WHERE b.user_idx = :userIdx) " +
            "AND a.category_type = :categoryType", nativeQuery = true)
    Page<TblPost> findAllBySomething(@Param("userIdx") Long userIdx, @Param("categoryType") CategoryType categoryType, Pageable pageable);
}
