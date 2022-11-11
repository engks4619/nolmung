import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import CommDetailTemplate from '@templates/CommDetailTemplate';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityParamList} from '@pages/Community';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {DetailDogProps} from '@molecules/DetailDog';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {useAppDispatch} from '~/store';
import {setPostInfo} from '~/slices/postSlice';

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

type CommScreenProp = NativeStackScreenProps<CommunityParamList, 'CommDetail'>;

function CommDetail({route}: CommScreenProp) {
  const postIdx: number = route.params.postIdx;
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const dispatch = useAppDispatch();

  const [detailContent, setDetailContent] = useState<DetailProps>([]);

  const getDetailPost = async (postId: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `community/post-info/${postId}`,
      );
      const data: DetailProps = response.data;
      setDetailContent(data);
      const {writerIdx, pay, subject, photoUrl} = data;
      dispatch(setPostInfo({postIdx, writerIdx, pay, subject, photoUrl}));
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error.response.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  useEffect(() => {
    getDetailPost(postIdx);
  }, [postIdx]);

  return <CommDetailTemplate detailContent={detailContent} userIdx={userIdx} />;
}

export default CommDetail;
