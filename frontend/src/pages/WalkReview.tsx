import axios from 'utils/axios';
import React, {useEffect, useState} from 'react';
import WalkReviewHeader from '~/organisms/WalkReviewHeader';
import WalkReviewTemplate from '~/templates/WalkReviewTemplate';
import {article} from '~/utils/type';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {Alert} from 'react-native';
import {AxiosResponse} from 'axios';

const WalkReview = ({navigation}: any) => {
  const [star, setStar] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [article, setArticle] = useState<article | null>(null);
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const userNickName = useSelector((state: RootState) => state.user.nickname);
  // 나중에 articleIdx, 채팅정보 받아와야함
  const articleIdx = 20;

  const chatInfo = {
    me: userNickName,
    opponent: '상대방이름',
  };

  const registReview = async () => {
    const requestBody = {
      postIdx: article?.postIdx,
      star,
      review,
      recordIdx: '1', // 나중에 받아와야함!
    };
    try {
      const response: AxiosResponse = await axios.post(
        `user/history`,
        requestBody,
      );
      if (response.status === 200) {
        Alert.alert('리뷰 작성 완료!');
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert('리뷰 작성 실패!', error);
      setClicked(false);
    }
  };
  const validateRegist = () => {
    if (!review || review === '') {
      setClicked(false);
      Alert.alert('입력을 완료해주세요!');
      return;
    }
    registReview();
  };
  useEffect(() => {
    if (!clicked) {
      return;
    }
    validateRegist();
  }, [clicked]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <WalkReviewHeader
          navigation={navigation}
          onBtnClicked={() => setClicked(true)}
          opponent={chatInfo.opponent}
        />
      ),
    });
  }, [navigation]);

  const getArticleData = async () => {
    const response = await axios.get(`community/post-info/${articleIdx}`);
    if (response.status === 200) {
      setArticle(response?.data);
    }
  };

  useEffect(() => {
    //게시글 정보 받아오기
    getArticleData();
  }, []);

  return (
    <WalkReviewTemplate
      star={star}
      setStar={setStar}
      article={article}
      chatInfo={chatInfo}
      review={review}
      setReview={setReview}
    />
  );
};

export default WalkReview;
