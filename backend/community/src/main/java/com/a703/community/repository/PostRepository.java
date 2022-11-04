package com.a703.community.repository;

import com.a703.community.entity.Post;
import com.a703.community.type.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post,Long>, JpaSpecificationExecutor<Post> {

    Page<Post> findByCategoryTypeAndWriterIdx(CategoryType categoryType, Long writerIdx, Pageable pageable);

    Page<Post> findByCategoryType(CategoryType categoryType, Pageable pageable);

    Post findByPostIdx(Long postIdx);

    @Query(value = "SELECT * FROM tbl_post " +
            "WHERE tbl_post.post_idx in (SELECT tbl_post_like.post_idx FROM tbl_post_like WHERE tbl_post_like.user_idx = :userIdx) " +
            "AND tbl_post.category_type = :categoryType", nativeQuery = true)
    Page<Post> findAllBySomething(@Param("userIdx") Long userIdx, @Param("categoryType") String categoryType, Pageable pageable);
}
