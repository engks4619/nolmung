import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import CommDetailTemplate from '@templates/CommDetailTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {DetailDogProps} from '@molecules/DetailDog';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {useAppDispatch} from '~/store';
import {setPostInfo} from '~/slices/postSlice';
import CommDetailHeader from '~/molecules/CommDetailHeader';

export interface DetailProps {
  dogInfoList: DetailDogProps[];
  postIdx: number;
  writer: string;
  getLike: boolean;
  categoryType: string;
  subject: string;
  content: string;
  location: string;
  pay?: number;
  leadLine: boolean;
  poopBag: boolean;
  walkDate: string;
  modifyDate: string;
  photoUrl: string[];
  userImgUrl: string;
  writerIdx: number;
}

function CommDetail({route, navigation}: any) {
  const postIdx: number = route.params.postIdx;
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const dispatch = useAppDispatch();

  const [detailContent, setDetailContent] = useState<DetailProps>([]);
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const [category, setCategory] = useState<string>('');

  const getDetailPost = async (postId: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `community/post-info/${postId}`,
      );
      const data: DetailProps = response.data;
      setDetailContent(data);
      const {writerIdx, pay, subject, photoUrl} = data;
      dispatch(setPostInfo({postIdx, writerIdx, pay, subject, photoUrl}));
      setIsLiked(data.getLike);
      setCategory(data.categoryType);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const putLike = useCallback(async () => {
    try {
      const response = await axios.put(`community/like/${postIdx}`);
      if (response.status === 200) {
        setIsLiked(!isLiked);
      }
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  }, [postIdx, isLiked]);

  useEffect(() => {
    getDetailPost(postIdx);
  }, [postIdx]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CommDetailHeader navigation={navigation} category={category} />
      ),
    });
  }, [navigation, category]);

  return (
    <CommDetailTemplate
      detailContent={detailContent}
      isLiked={isLiked}
      putLike={putLike}
      userIdx={userIdx}
    />
  );
}

export default CommDetail;
