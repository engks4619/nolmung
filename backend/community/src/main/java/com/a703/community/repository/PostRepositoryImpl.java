package com.a703.community.repository;

import com.a703.community.entity.Post;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import static com.a703.community.entity.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final EntityManager em;

    private final JPAQueryFactory queryFactory;

    @Override
    public Post findByPostIdx(Long postIdx) {
        return  queryFactory
                .selectFrom(post)
                .where(post.postIdx.eq(postIdx))
                .orderBy(post.modifyDate.desc())
                .fetchOne();
    }

//    @Override
//    public Page<Post> findAllBySomething(Long userIdx, String categoryType, Pageable pageable) {
//
//        return queryFactory
//                .selectFrom(post)
//                .where(post.postIdx.in(
//                        JPAExpressions
//                                .select(postLike.id.)
//                                .from(postLike)
//                                .where(postLike.id.getType().)
//
//                ));
//    }
}
