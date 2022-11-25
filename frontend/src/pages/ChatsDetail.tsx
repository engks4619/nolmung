import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ChatsDetailTemplate from '~/templates/ChatsDetailTemplate';
import {useChatSocket, useLocationSocket} from '~/hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import CustomHeader from '~/headers/CustomHeader';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {useAppDispatch} from '~/store';
import {setPostInfo} from '~/slices/postSlice';
import {startWalking} from '~/utils/SocketPositionFunctions';
import {setWalkRoomId} from '~/slices/socketPositionSlice';
import PushNotification from 'react-native-push-notification';
import {setPath, addDistance} from '~/slices/watcherSlice';
export interface chatType {
  chat: string;
  sender: number;
  roomId: string;
  createdAt: string;
}

function ChatsDetail({route, navigation}: any) {
  const dispatch = useAppDispatch();
  const roomId: string = route.params.roomId;

  const [chatSocket, chatDisconnect] = useChatSocket();
  const [locationSocket, locationDisconnect] = useLocationSocket();

  const [isFirstChat, setIsFirstChat] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.userIdx);

  const postSubject = useSelector((state: RootState) => state.chat.subject);
  const postImage = useSelector((state: RootState) => state.chat.postImage);
  const postPay = useSelector((state: RootState) => state.chat.pay);
  const postIdx = useSelector((state: RootState) => state.chat.postIdx);
  const oppentImg = useSelector((state: RootState) => state.chat.oppentImg);
  const oppentName = useSelector((state: RootState) => state.chat.oppentName);
  const isWriter = useSelector((state: RootState) => state.chat.isWriter);
  const oppentIdx = useSelector((state: RootState) => state.chat.oppentIdx);

  const [serverMsg, setServerMsg] = useState<chatType[]>([]);
  const [localMsg, setLocalMsg] = useState<chatType>();
  const [fullMsg, setFullMsg] = useState<chatType[]>([]);

  const alarmConfirm = () => {
    PushNotification.localNotification({
      channelId: 'chats',
      message: `${oppentName}과 산책이 확정되었습니다.`,
    });
  };

  const alarmWalkStatus = (status: boolean) => {
    const msg = status
      ? `${oppentName}님이 산책을 시작하였습니다!`
      : `${oppentName}님이 산책을 종료하였습니다!`;
    PushNotification.localNotification({
      channelId: 'chats',
      message: msg,
    });
  };

  useEffect(() => {
    setFullMsg([]);
    if (chatSocket && locationSocket && roomId) {
      chatSocket.emit('join', roomId);

      chatSocket.on('chats', (serverChats: chatType[]) => {
        if (serverChats.length) {
          setServerMsg(serverChats);
          setIsFirstChat(false);
        } else {
          setIsFirstChat(true);
        }
      });

      chatSocket.on('completed', (completeData: boolean) => {
        setIsCompleted(completeData);
      });

      chatSocket.on('alarmCompleted', () => {
        alarmConfirm();
      });

      chatSocket.on('messageC', (data: chatType) => {
        if (data.roomId === roomId) {
          const newData: chatType = {
            chat: data.chat,
            sender: data.sender,
            roomId: data.roomId,
            createdAt: data.createdAt,
          };
          setLocalMsg(newData);
        }
      });

      locationSocket.on('replyGps', data => {
        console.log('리플라이');
      });
      return () => {
        if (chatSocket) {
          chatSocket.off('chats');
          chatSocket.off('messageC');
          chatSocket.off('decide');
          chatSocket.off('completed');
          chatSocket.off('alarmCompleted');
          locationSocket.off('replyGps');
        }
      };
    }
  }, [chatSocket, roomId, localMsg, locationSocket]);

  useEffect(() => {
    dispatch(
      setPostInfo({
        writerIdx: oppentIdx,
        userImgUrl: oppentImg,
        writerName: oppentName,
      }),
    );

    navigation.setOptions({
      header: () => (
        <CustomHeader
          navigation={navigation}
          middleText={oppentName}
          backFunc={() => navigation.replace('Chats')}
          middleFunc={() =>
            navigation.navigate('CommunityList', {
              screen: 'Oppent',
              params: {oppentIdx},
            })
          }
        />
      ),
    });
  }, [navigation, oppentName]);

  useEffect(() => {
    setFullMsg([...serverMsg]);
  }, [localMsg, serverMsg]);

  useEffect(() => {
    if (isCompleted && locationSocket) {
      locationSocket.emit('locationLogin', {id: user, roomId});
    }
  }, [isCompleted, locationSocket, roomId, user]);

  const postChatInfo = async (postRoomId: string) => {
    try {
      const response: AxiosResponse = await axios.post(
        `community/chat/${postIdx}`,
        {roomId: postRoomId},
      );
      if (response.status === 200) {
        setIsFirstChat(false);
      }
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error?.response?.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const submitMsg = (inputChat: String) => {
    const chat = inputChat.trim();
    const data = {
      roomId,
      sender: user,
      chat,
    };
    if (chatSocket && chat) {
      if (isFirstChat) {
        postChatInfo(roomId);
      }
      chatSocket.emit('messageS', data);
    }
  };

  const handleConfirmWalk = async () => {
    if (isCompleted) {
      return;
    }
    if (chatSocket) {
      chatSocket.emit('complete', roomId);
    }
  };

  useEffect(() => {
    if (locationSocket) {
      locationSocket.on('replyLocationLogin', replyData => {});
      locationSocket.on('replyStartWalk', replayStart => {
        if (isWriter && replayStart === '산책이 시작되었습니다.') {
          alarmWalkStatus(true);
        }
      });
      locationSocket.on('replyGps', gps => {
        // console.log('replyGps', gps);
      });
      locationSocket.on('gpsInfo', gpsInfo => {
        if (isWriter) {
          dispatch(setPath({path: gpsInfo.gps}));
          if (gpsInfo.distance <= 9) {
            dispatch(addDistance(gpsInfo.distance));
          }
        }
      });
      locationSocket.on('replyEndWalk', () => {
        if (isWriter) {
          alarmWalkStatus(false);
          navigation.replace('WalkReview');
        }
      });
    }

    return () => {
      if (locationSocket) {
        locationSocket.off('replyLocationLogin');
        locationSocket.off('replyStartWalk');
        locationSocket.off('replyEndWalk');
        locationSocket.off('replyGps');
        locationSocket.off('gpsInfo');
      }
    };
  }, [locationSocket]);

  const hadleMyDogLocation = useCallback(() => {
    if (locationSocket) {
      locationSocket.emit('getGps', roomId);
      navigation.navigate('MapViewWatcher', {postIdx: postIdx, roomId: roomId});
    }
  }, [locationSocket, roomId, user]);

  const socketPositionState = useSelector(
    (state: RootState) => state.socketPosition,
  );

  // 개 불러오기
  const [dogs, setDogs] = useState([]);
  const [dogIdxs, setDogIdxs] = useState([]);
  const getDogs = async () => {
    const response = await axios.get(`community/post/dog-info/${postIdx}`);
    setDogs(response.data);
    const dogIdxList = response.data.map(value => {
      value.dogIdx;
    });
    setDogIdxs(dogIdxList);
  };

  useEffect(() => {
    getDogs();
  }, []);

  const hadleStartWalk = useCallback(() => {
    if (locationSocket && oppentIdx) {
      dispatch(setWalkRoomId(roomId));
      startWalking(
        dispatch,
        navigation,
        socketPositionState,
        dogIdxs,
        locationSocket,
        oppentIdx,
        roomId,
        postIdx,
      );
      // navigation.navigate('MapViewWorker');
      // locationSocket.emit('gps', gpsLocalData);
    }
  }, [locationSocket, roomId]);

  return (
    <ChatsDetailTemplate
      postInfo={{postImage, postSubject, postPay}}
      submitMsg={submitMsg}
      fullMsg={fullMsg}
      user={user}
      oppentImg={oppentImg}
      handleConfirmWalk={handleConfirmWalk}
      isCompleted={isCompleted}
      hadleMyDogLocation={hadleMyDogLocation}
      isMyPost={isWriter}
      hadleStartWalk={hadleStartWalk}
    />
  );
}

export default ChatsDetail;
