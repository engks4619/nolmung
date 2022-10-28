package com.a703.community.repository;

import com.a703.community.entity.TblPostPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostPhotoRepository extends JpaRepository<TblPostPhoto,Long> {

    List<TblPostPhoto> findByPostPostIdx(Long postIdx);


}
