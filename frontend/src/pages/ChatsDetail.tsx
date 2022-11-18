import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ChatsDetailTemplate from '~/templates/ChatsDetailTemplate';
import {useChatSocket} from '~/hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import CustomHeader from '~/headers/CustomHeader';

interface chatType {
  chat: string;
  user: string;
  _id: string;
  createdAt: string;
}

interface msgType {
  roomId: string;
  sender: string;
  _id: string;
  createdAt: string;
  chat: string;
}

function ChatsDetail({route, navigation}: any) {
  const roomId: string = route.params.roomId;
  const [chatSocket, chatDisconnect] = useChatSocket();

  const postSubject = useSelector((state: RootState) => state.post.subject);
  const postImage = useSelector((state: RootState) => state.post.postImage);
  const postPay = useSelector((state: RootState) => state.post.pay);

  const user = useSelector((state: RootState) => state.user.userIdx);

  const oppentImg = useSelector((state: RootState) => state.post.writerImg);
  const oppentName = useSelector((state: RootState) => state.post.writerName);

  const [serverMsg, setServerMsg] = useState<chatType[]>([]);
  const [localMsg, setLocalMsg] = useState<chatType>();
  const [fullMsg, setFullMsg] = useState<chatType[]>([]);

  useEffect(() => {
    if (chatSocket && roomId) {
      chatSocket.emit('join', roomId);
      chatSocket.on('chats', (serverChats: chatType[]) =>
        setServerMsg(serverChats),
      );
      chatSocket.on('messageC', (data: msgType) => {
        if (data.roomId === roomId) {
          const now = new Date().toString();
          const newData: chatType = {
            chat: data.chat,
            user: data.sender,
            _id: now,
            createdAt: now,
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
  }, [navigation]);

  useEffect(() => {
    setFullMsg([...serverMsg]);
  }, [localMsg, serverMsg]);

  const submitMsg = (inputChat: String) => {
    const chat = inputChat.trim();
    const data = {
      roomId,
      sender: user,
      chat,
    };
    if (chatSocket && chat) {
      chatSocket.emit('messageS', data);
    }
  };

  const handleConfirmWalk = () => {
    if (chatSocket) {
      chatSocket.emit('decide', roomId);
    }
  };

  return (
    <ChatsDetailTemplate
      postInfo={{postImage, postSubject, postPay}}
      submitMsg={submitMsg}
      fullMsg={fullMsg}
      user={user}
      oppentImg={oppentImg}
      handleConfirmWalk={handleConfirmWalk}
    />
  );
}

export default ChatsDetail;
