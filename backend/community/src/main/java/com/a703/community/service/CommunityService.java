package com.a703.community.service;

import com.a703.community.dto.request.RegisterPostRequest;
import com.a703.community.dto.response.*;
import com.a703.community.dto.response.connection.DogInfoDto;
import com.a703.community.dto.response.connection.UserInfoDto;
import com.a703.community.entity.*;
import com.a703.community.repository.*;
import com.a703.community.type.CategoryType;
import com.a703.community.util.ClientUtil;
import com.a703.community.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;

    private final PostPhotoRepository postPhotoRepository;

    private final FileUtil fileUtil;

    private final LuckyDogRepository luckyDogRepository;

    private final ChatRepository chatRepository;

    private final ClientUtil clientUtil;

    public Long registerPost(RegisterPostRequest registerPost, String token) throws IOException {



            UserInfoDto userInfoDto = clientUtil.requestUserInfo(token);
            Long userIdx = userInfoDto.getUserIdx();

            List<Long> dogIdxList = registerPost.getDogIdx();

            Post post = Post.builder()
                    .subject(registerPost.getSubject())
                    .categoryType(registerPost.getCategoryType())
                    .content(registerPost.getContent())
                    .writerIdx(userIdx)
                    .getDeleted(false)
                    .getCompleted(false)
                    .location(registerPost.getLocation())
                    .leadLine(registerPost.getLeadLine())
                    .pay(registerPost.getPay())
                    .poopBag(registerPost.getPoopBag())
                    .walkDate(registerPost.getWalkDate())
                    .reRegister(0)
                    .build();

            Post savePost = postRepository.save(post);

            List<LuckyDog> saveLuckyDog = dogIdxList.stream().map(luckdog -> LuckyDog.builder()
                            .id(LuckyDogId.builder()
                                    .dogIdx(luckdog)
                                    .post(savePost)
                                    .build())
                            .build())
                    .collect(Collectors.toList());

            luckyDogRepository.saveAll(saveLuckyDog);

        return savePost.getPostIdx();
    }

    //진짜 삭제하지말기
    public void deletePost(Long postIdx){
        Post post = postRepository.findByPostIdx(postIdx);
        post.setGetDeleted(Boolean.TRUE);
        postRepository.save(post);

    }
    //재등록
    public void reRegisterPost(Long postIdx){
        Post post = postRepository.findByPostIdx(postIdx);
        post.setReRegister(post.getReRegister()+1);
        postRepository.save(post);

    }

    public void completePost(Long postIdx){
        Post post = postRepository.findByPostIdx(postIdx);
        post.setGetCompleted(true);
        postRepository.save(post);

    }

    @Transactional
    public Boolean pushLike(Long postIdx,Long userIdx) {


        if(postLikeRepository.existsByIdUserIdxAndIdPostPostIdx(userIdx,postIdx)) {
            postLikeRepository.deleteByIdUserIdxAndIdPostPostIdx(userIdx,postIdx);
            return false;
        }else{
            Post post = postRepository.findByPostIdx(postIdx);

            PostLikeId id = PostLikeId.builder()
                    .userIdx(userIdx)
                    .post(post)
                    .build();

            PostLike postLike = PostLike.builder()
                    .id(id)
                    .build();

            postLikeRepository.save(postLike);
            return true;
        }
    }

    public PostDto showPost(Long postIdx) {

        List<PostPhoto> postPhotos = postPhotoRepository.findByPostPostIdx(postIdx);

        Post post = postRepository.findByPostIdx(postIdx);

        //유저 통신
        UserInfoDto writerInfoDto = clientUtil.requestOtherUserInfo(post.getWriterIdx());

        List<LuckyDog> luckyDogList = luckyDogRepository.findByIdPostPostIdx(postIdx);

        List<Long> dogIdxList = luckyDogList.stream().map(a -> {
            return a.getId().getDogIdx();
        }).collect(Collectors.toList());

        List<DogInfoDto> dogInfoDto = clientUtil.requestDogInfo(dogIdxList);

        String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(post.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(post.getPostIdx()).get(0).getPhotoUrl()
                : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(post.getPostIdx()).getId().getDogIdx())).get(0).getImage();


        return PostDto.builder()
                .thumbnailUrl(thumbnailUrl)
                .postIdx(post.getPostIdx())
                .getLike(postLikeRepository.existsByIdUserIdxAndIdPostPostIdx(post.getWriterIdx(),postIdx))
                .writerIdx(post.getWriterIdx())
                .writer(writerInfoDto.getNickname())
                .userImgUrl(writerInfoDto.getProfileImage())
                .subject(post.getSubject())
                .dogInfoList(dogInfoDto)
                .photoUrl(postPhotoRepository.existsByPostPostIdx(post.getPostIdx()) ? convertPostPhotoListToUrlList(postPhotos) : null)
                .categoryType(post.getCategoryType())
                .content(post.getContent())
                .leadLine(post.getLeadLine())
                .pay(post.getPay())
                .location(post.getLocation())
                .walkDate(post.getWalkDate())
                .modifyDate(post.getModifyDate())
                .poopBag(post.getPoopBag())
                .build();


    }
    public List<String> convertPostPhotoListToUrlList(List<PostPhoto> postPhotos){
        return postPhotos.stream().map(PostPhoto::getPhotoUrl).collect(Collectors.toList());
    }

    public List<MainListDto>[] showMainList(Pageable pageable){

        Page<Post> mainLists = postRepository.findAll(pageable);
        List<MainListDto>[] result = new List[2];
        result[0] = mainLists.stream().limit(5).map(main-> MainListDto.builder()
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(main.getPostIdx())))
                        .chatCnt(chatRepository.countChatByPost(main))
                        .postIdx(main.getPostIdx())
                        .subject(main.getSubject())
                        .categoryType(main.getCategoryType())
                        .build())
                .collect(Collectors.toList());
        result[1] = mainLists.stream().skip(5).map(main-> MainListDto.builder()
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(main.getPostIdx())))
                        .chatCnt(chatRepository.countChatByPost(main))
                        .postIdx(main.getPostIdx())
                        .subject(main.getSubject())
                        .categoryType(main.getCategoryType())
                        .build())
                .collect(Collectors.toList());

        return result;
    }

    public WithListDto showWithList(Pageable pageable) {

        Page<Post> withLists = postRepository.findByCategoryType(CategoryType.WITH,pageable);
        int totalPages = withLists.getTotalPages();

        List<WithDto> withDtoList = withLists.stream().map(with-> {
            UserInfoDto userInfoDto = clientUtil.requestOtherUserInfo(with.getWriterIdx());
            String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl()
                    : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(with.getPostIdx()).getId().getDogIdx())).get(0).getImage();

            return WithDto.builder()
                            .writer(userInfoDto.getNickname())
                            .userImgUrl(userInfoDto.getProfileImage())
                            .postIdx(with.getPostIdx())
                            .subject(with.getSubject())
                            .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                            .chatCnt(chatRepository.countChatByPost(with))
                            .location(with.getLocation())
                            .modifyDate(with.getModifyDate())
                            .thumbnailUrl(thumbnailUrl)
                            .walkDate(with.getWalkDate())
                            .build();
                })
                .collect(Collectors.toList());

        return WithListDto.builder()
                .withDtoList(withDtoList)
                .totalPage(totalPages)
                .build();
    }

    public OtherListDto showOtherList(Pageable pageable){

        Page<Post> otherLists =  postRepository.findByCategoryType(CategoryType.OTHER,pageable);

        int totalPages = otherLists.getTotalPages();

        List<OtherDto> otherDtoList = otherLists.stream().map(other-> {
            UserInfoDto userInfoDto = clientUtil.requestOtherUserInfo(other.getWriterIdx());
            String thumbnailUrl = postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl()
                    : clientUtil.requestDogInfo(Collections.singletonList(luckyDogRepository.findFirstByIdPostPostIdx(other.getPostIdx()).getId().getDogIdx())).get(0).getImage();

                    return OtherDto.builder()
                            .writer(userInfoDto.getNickname())
                            .userImgUrl(userInfoDto.getProfileImage())
                            .postIdx(other.getPostIdx())
                            .subject(other.getSubject())
                            .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                            .chatCnt(chatRepository.countChatByPost(other))
                            .location(other.getLocation())
                            .modifyDate(other.getModifyDate())
                            .walkDate(other.getWalkDate())
                            .pay(other.getPay())
                            .thumbnailUrl(thumbnailUrl)
                            .build();
                })
                .collect(Collectors.toList());

        return OtherListDto.builder()
                .otherDtoList(otherDtoList)
                .totalPage(totalPages)
                .build();
    }

}
