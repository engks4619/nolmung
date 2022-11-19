import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import CommDetailTemplate from '@templates/CommDetailTemplate';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {DetailDogProps} from '@molecules/DetailDog';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {useAppDispatch} from '~/store';
import CommDetailHeader from '~/molecules/CommDetailHeader';
import {useRoomSocket} from '~/hooks/useSocket';
import {setChatPostInfo} from '~/slices/chatSlice';
import {setPostInfo} from '~/slices/postSlice';

export interface DetailProps {
  dogInfoList: DetailDogProps[];
  postIdx: number;
  writer: string;
  writerIdx: number;
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
  thumbnailUrl: string;
}

function CommDetail({route, navigation}: any) {
  const postIdx: number = route.params.postIdx;
  const userIdx: number = useSelector((state: RootState) => state.user.userIdx);
  const dispatch = useAppDispatch();

  const [roomSocket, roomDisconnect] = useRoomSocket();

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
      setIsLiked(data.getLike);
      setCategory(data.categoryType);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error?.response?.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const putLike = useCallback(async () => {
    try {
      const response = await axios.put(`community/like/${postIdx}`);
      if (response.status === 200) {
        setIsLiked(response.data);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        Alert.alert('알림', '본인 게시글에는 좋아요를 누를 수 없습니다.');
        return;
      }
      Alert.alert(
        `에러코드 ${error?.response?.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  }, [postIdx]);

  const startChat = () => {
    const socketData = {
      ownerIdx: userIdx,
      postIdx,
      opponentIdx: detailContent.writerIdx,
    };
    const {
      writerIdx,
      pay,
      subject,
      userImgUrl,
      thumbnailUrl,
      writer,
      categoryType,
      completed,
    } = detailContent;
    dispatch(
      setChatPostInfo({
        postIdx,
        writerIdx,
        pay,
        subject,
        userImgUrl,
        thumbnailUrl,
        writer,
        categoryType,
        completed,
      }),
    );
    if (roomSocket && userIdx) {
      roomSocket.emit('newRoom', socketData);
      roomSocket.on('newRoomId', (roomId: string) =>
        navigation.navigate('ChatList', {
          screen: 'ChatsDetail',
          params: {roomId},
        }),
      );
    }
  };

  const naviOppent = (oppentIdx: number) => {
    if (userIdx === detailContent.writerIdx) {
      return;
    }
    dispatch(
      setPostInfo({
        writerIdx: detailContent.writerIdx,
        userImgUrl: detailContent.userImgUrl,
        writerName: detailContent.writer,
      }),
    );
    navigation.navigate('Oppent', {oppentIdx});
  };

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
      startChat={startChat}
      naviOppent={naviOppent}
    />
  );
}

export default CommDetail;
