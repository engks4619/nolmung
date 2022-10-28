package com.a703.community.repository;

import com.a703.community.entity.PostPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostPhotoRepository extends JpaRepository<PostPhoto,Long> {

    List<PostPhoto> findByPostPostIdx(Long postIdx);

    Boolean existsByPostPostIdx(Long postIdx);


}
