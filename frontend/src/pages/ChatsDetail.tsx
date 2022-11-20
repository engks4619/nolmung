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
import {setCompleted} from '~/slices/chatSlice';
import {setPostInfo} from '~/slices/postSlice';

export interface chatType {
  chat: string;
  sender: string;
  roomId: string;
  createdAt: string;
}

function ChatsDetail({route, navigation}: any) {
  const dispatch = useAppDispatch();
  const roomId: string = route.params.roomId;

  const [chatSocket, chatDisconnect] = useChatSocket();
  const [locationSocket, locationDisconnect] = useLocationSocket();

  const [isFirstChat, setIsFirstChat] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.userIdx);

  const postSubject = useSelector((state: RootState) => state.chat.subject);
  const postImage = useSelector((state: RootState) => state.chat.postImage);
  const postPay = useSelector((state: RootState) => state.chat.pay);
  const postIdx = useSelector((state: RootState) => state.chat.postIdx);
  const oppentImg = useSelector((state: RootState) => state.chat.oppentImg);
  const oppentName = useSelector((state: RootState) => state.chat.oppentName);
  const writerIdx = useSelector((state: RootState) => state.chat.writerIdx);
  const oppentIdx = useSelector((state: RootState) => state.chat.oppentIdx);
  const categoryType = useSelector(
    (state: RootState) => state.chat.categoryType,
  );

  const isCompleted = useSelector((state: RootState) => state.chat.completed);

  const [serverMsg, setServerMsg] = useState<chatType[]>([]);
  const [localMsg, setLocalMsg] = useState<chatType>();
  const [fullMsg, setFullMsg] = useState<chatType[]>([]);

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

      chatSocket.on('decide', (data: string) => {
        Alert.alert('확정', `${data}`);
        console.log('Socket Decide', data);
      });

      return () => {
        if (chatSocket) {
          chatSocket.off('chats');
          chatSocket.off('messageC');
          chatSocket.off('decide');
        }
      };
    }
  }, [chatSocket, roomId, localMsg, locationSocket, categoryType]);

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
          middleFunc={() => navigation.navigate('Oppent', {oppentIdx})}
        />
      ),
    });
  }, [navigation, oppentName]);

  useEffect(() => {
    setFullMsg([...serverMsg]);
  }, [localMsg, serverMsg]);

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
    const data = {
      postIdx,
      albaIdx: oppentIdx,
    };
    if (isCompleted) {
      return;
    }
    try {
      const response = await axios.post('community/alba', data);
      if (response.status === 200) {
        dispatch(setCompleted(true));
        if (chatSocket) {
          chatSocket.emit('complete', roomId);
        }
      }
      Alert.alert(
        '산책이 확정되었습니다. ',
        '상대방이 산책을 시작하면 강아지 위치 보기기 활성화됩니다.',
      );
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error?.response?.status}`,
        '죄송합니다. 산책을 확정하지 못했습니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  useEffect(() => {
    if (locationSocket) {
      locationSocket.on('gpsInfo', gpsInfo => {
        console.log(gpsInfo[0].gps);
        if (gpsInfo === 403) {
          Alert.alert(
            '알림',
            '아직 산책을 시작하지 않았습니다. \n산책이 시작되면 알려드릴게요 :)',
          );
        } else {
          // 강아지 위치 정보 gpsInfo 담겨서 옴
        }
      });
    }
    return () => {
      if (locationSocket) {
        locationSocket.off('gpsInfo');
      }
    };
  }, [locationSocket]);

  const hadleMyDogLocation = useCallback(() => {
    if (locationSocket) {
      locationSocket.emit('getGps', roomId);
    }
  }, [locationSocket, roomId]);

  const hadleStartWalk = useCallback(() => {
    const gpsLocalData = {
      ownerIdx: user,
      roomId,
      gps: [
        {
          // gps정보 "latitude": 1.1111,  // 위도
          //     "longitude": 1.111   // 경도
        },
      ],
    };
    if (locationSocket) {
      locationSocket.emit('gps', gpsLocalData);
    }
  }, [locationSocket, roomId, user]);

  return (
    <ChatsDetailTemplate
      postInfo={{postImage, postSubject, postPay}}
      submitMsg={submitMsg}
      fullMsg={fullMsg}
      user={user}
      oppentImg={oppentImg}
      handleConfirmWalk={handleConfirmWalk}
      isCompleted={isCompleted}
      categoryType={categoryType}
      hadleMyDogLocation={hadleMyDogLocation}
      isMyPost={user === writerIdx}
      hadleStartWalk={hadleStartWalk}
    />
  );
}

export default ChatsDetail;
