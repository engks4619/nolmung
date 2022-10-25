package com.a703.community.repository;

import com.a703.community.entity.TblPost;
import com.a703.community.type.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<TblPost,Long> {

    List<TblPost> findByCategoryTypeOrderByModifyDateDesc(CategoryType categoryType);

    List<TblPost> findFirst10ByOrderByModifyDateDesc();

    TblPost findByPostIdx(Long postIdx);


}
