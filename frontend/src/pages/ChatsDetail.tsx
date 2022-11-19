import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ChatsDetailTemplate from '~/templates/ChatsDetailTemplate';
import {useChatSocket} from '~/hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import CustomHeader from '~/headers/CustomHeader';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {useAppDispatch} from '~/store';
import {setCompleted} from '~/slices/chatSlice';

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
  const [isFirstChat, setIsFirstChat] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.userIdx);

  const postSubject = useSelector((state: RootState) => state.chat.subject);
  const postImage = useSelector((state: RootState) => state.chat.postImage);
  const postPay = useSelector((state: RootState) => state.chat.pay);
  const postIdx = useSelector((state: RootState) => state.chat.postIdx);
  const oppentImg = useSelector((state: RootState) => state.chat.oppentImg);
  const oppentName = useSelector((state: RootState) => state.chat.oppentName);
  const oppentIdx = useSelector((state: RootState) => state.chat.writerIdx);
  const categoryType = useSelector(
    (state: RootState) => state.chat.categoryType,
  );

  const isCompleted = useSelector((state: RootState) => state.chat.completed);

  const [serverMsg, setServerMsg] = useState<chatType[]>([]);
  const [localMsg, setLocalMsg] = useState<chatType>();
  const [fullMsg, setFullMsg] = useState<chatType[]>([]);

  useEffect(() => {
    setFullMsg([]);
    if (chatSocket && roomId) {
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
      });
      return () => {
        if (chatSocket) {
          chatSocket.off('chats');
          chatSocket.off('messageC');
        }
      };
    }
  }, [chatSocket, roomId, localMsg, chatDisconnect]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader navigation={navigation} middleText={oppentName} />
      ),
    });
  }, [navigation, oppentName]);

  useEffect(() => {
    setFullMsg([...serverMsg]);
  }, [localMsg, serverMsg]);

  const postChatInfo = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `community/chat/${postIdx}`,
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
        postChatInfo();
      }
      chatSocket.emit('messageS', data);
    }
  };

  const handleConfirmWalk = async () => {
    const data = {
      postIdx,
      albaIdx: oppentIdx,
    };
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

  const hadleMyDogLocation = () => {
    console.log('내 강아지 위치 내놔');
  };

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
      isMyPost={user === oppentIdx}
    />
  );
}

export default ChatsDetail;
