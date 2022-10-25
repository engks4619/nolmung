package com.a703.community.repository;

import com.a703.community.entity.TblPost;
import com.a703.community.type.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<TblPost,Long> {

//    List<TblPost> findByCategoryTypeOrderByModifyDateDesc(CategoryType categoryType);
//
//    List<TblPost> findFirst10ByOrderByModifyDateDesc();

    Page<TblPost> findByCategoryType(CategoryType categoryType, Pageable pageable);

    TblPost findByPostIdx(Long postIdx);


}
