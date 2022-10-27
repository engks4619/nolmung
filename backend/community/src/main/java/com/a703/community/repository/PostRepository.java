package com.a703.community.repository;

import com.a703.community.entity.TblPost;
import com.a703.community.type.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<TblPost,Long>, JpaSpecificationExecutor<TblPost> {

//    List<TblPost> findByCategoryTypeOrderByModifyDateDesc(CategoryType categoryType);
//
//    List<TblPost> findFirst10ByOrderByModifyDateDesc();

//    Page<TblPost> findAll(Pageable pageable, Specification<TblPost> spec);

    Page<TblPost> findByCategoryType(CategoryType categoryType, Pageable pageable);

    TblPost findByPostIdx(Long postIdx);


}
