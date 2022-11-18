import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ChatsDetailTemplate from '~/templates/ChatsDetailTemplate';
import {useChatSocket} from '~/hooks/useSocket';
import {ChatsParamList} from './Chats';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';

type ChatsScreenProp = NativeStackScreenProps<ChatsParamList, 'ChatsDetail'>;

function ChatsDetail({route}: ChatsScreenProp) {
  const roomId: string = route.params.roomId;
  const [chatSocket, chatDisconnect] = useChatSocket();

  const postSubject = useSelector((state: RootState) => state.post.subject);
  const postImage = useSelector((state: RootState) => state.post.postImage);
  const postPay = useSelector((state: RootState) => state.post.pay);
  const user = useSelector((state: RootState) => state.user.userIdx);
  const oppentImg = useSelector((state: RootState) => state.post.writerImg);

  const [msgInput, setMsgInput] = useState<String>('');
  const [serverMsg, setServerMsg] = useState<any[]>([]);

  useEffect(() => {
    // serverMsg 안바뀌는 문제
    if (chatSocket && roomId) {
      chatSocket.emit('join', roomId);
      chatSocket.on('chats', serverChats => setServerMsg(serverChats));
      chatSocket.on('messageC', data => {
        if (data.roomId === roomId) {
          const now = new Date().toString();
          const newData = {
            chat: data.chat,
            user: data.sender,
            _id: now,
            createdAt: now,
          };
          setServerMsg([...serverMsg, newData]);
        }
      });
    }
  }, [chatSocket, roomId]);

  const onChageMsg = (text: string) => {
    setMsgInput(text);
  };

  const submitMsg = (inputChat: String) => {
    const now = new Date().toString();
    const chat = inputChat.trim();
    const data = {
      roomId,
      sender: user,
      chat,
    };
    if (chatSocket && chat) {
      chatSocket.emit('messageS', data);
      // setServerMsg([...serverMsg, {chat, user, _id: now, createdAt: now}]);
    }
    setMsgInput('');
  };

  return (
    <ChatsDetailTemplate
      postInfo={{postImage, postSubject, postPay}}
      msgInput={msgInput}
      onChageMsg={onChageMsg}
      submitMsg={submitMsg}
      serverMsg={serverMsg}
      user={user}
      oppentImg={oppentImg}
    />
  );
}

export default ChatsDetail;
