import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import CommDetailTemplate from '@templates/CommDetailTemplate';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityParamList} from '@pages/Community';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';

export interface DetailProps {
  dogInfoList: undefined;
  postIdx: number;
  writer: string;
  getLike: boolean;
  categoryType: string;
  subject: string;
  content: string;
  location: string;
  pay: number;
  leadLine: boolean;
  poopBag: boolean;
  walkDate: string;
  modifyDate: string;
  photoUrl: string[];
  userImgUrl: string;
}

type CommScreenProp = NativeStackScreenProps<CommunityParamList, 'CommDetail'>;

function CommDetail({route}: CommScreenProp) {
  const postIdx: number = route.params.postIdx;

  const [detailContent, setDetailContent] = useState<DetailProps>([]);

  const getDetailPost = async (postId: number) => {
    try {
      console.log(postId);
      const response: AxiosResponse = await axios.get(
        `community/post-info/${postId}`,
      );
      const data: DetailProps = response.data;
      console.log(data);
      setDetailContent(data);
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

  return <CommDetailTemplate detailContent={detailContent} />;
}

export default CommDetail;
