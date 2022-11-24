import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatsDetail from './ChatsDetail';
import ChatsTemplate from '~/templates/ChatsTemplate';
import axios from '~/utils/axios';
import {useAppDispatch} from '~/store';
import {setChatPostInfo} from '~/slices/chatSlice';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import WalkReview from './WalkReview';
import MapViewWorker from '@pages/MapViewWorker';
import MapViewWatcher from '@pages/MapViewWatcher';
import LogViewWorker from '@pages/LogViewWorker';
import LogViewWatcher from '@pages/LogViewWatcher';
export type ChatsParamList = {
  Chats: undefined;
  ChatsDetail: {roomId: string};
};

const ChatsStack = createNativeStackNavigator();

export const ChatsStackNavigator = () => (
  <ChatsStack.Navigator>
    <ChatsStack.Screen
      name="Chats"
      component={Chats}
      options={{
        headerShown: false,
      }}
    />
    <ChatsStack.Screen
      name="ChatsDetail"
      component={ChatsDetail}
      options={{
        headerTitle: '상대방 이름',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
      }}
    />
    <ChatsStack.Screen
      name="WalkReview"
      component={WalkReview}
      options={{
        headerTitle: '상대방 이름',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
      }}
    />
    <ChatsStack.Screen
      name="MapViewWorker"
      component={MapViewWorker}
      options={{headerShown: false}}
    />
    <ChatsStack.Screen
      name="MapViewWatcher"
      component={MapViewWatcher}
      options={{headerShown: false}}
    />
    <ChatsStack.Screen
      name="LogViewWorker"
      component={LogViewWorker}
      options={{headerShown: false}}
    />
    <ChatsStack.Screen
      name="LogViewWatcher"
      component={LogViewWatcher}
      options={{headerShown: false}}
    />
  </ChatsStack.Navigator>
);

interface recentChatType {
  chat: string;
}

export interface chatListType {
  opponentImgUrl: string;
  postIdx: number;
  thumbnailUrl: string;
  userImgUrl: string;
  roomId: string;
  recentChat: recentChatType;
  pay: number | null;
  subject: string;
  opponentNickname: string;
  opponentIdx: number;
  writerIdx: number;
  isWriter: boolean;
  ownerIdx: number;
  ownerImgUrl: string;
  ownerNickname: string;
}

function Chats({navigation}: any) {
  const dispatch = useAppDispatch();
  const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const [myChatList, setMyChatList] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getChatsList = async () => {
    try {
      const response = await axios.get(`socket/room/${userIdx}`);
      setMyChatList(response.data);
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error?.response?.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const handleDetailChat = (chatInfo: chatListType) => {
    const oppentImg = chatInfo.isWriter
      ? chatInfo.ownerImgUrl
      : chatInfo.opponentImgUrl;
    const oppentIdx = chatInfo.isWriter
      ? chatInfo.ownerIdx
      : chatInfo.opponentIdx;
    const oppentName = chatInfo.isWriter
      ? chatInfo.ownerNickname
      : chatInfo.opponentNickname;

    dispatch(
      setChatPostInfo({
        postIdx: chatInfo.postIdx,
        thumbnailUrl: chatInfo.thumbnailUrl,
        subject: chatInfo.subject,
        pay: chatInfo.pay,
        oppentIdx,
        oppentImg,
        oppentName,
        isWriter: chatInfo.isWriter,
      }),
    );

    navigation.navigate('ChatList', {
      screen: 'ChatsDetail',
      params: {roomId: chatInfo.roomId},
    });
  };

  useEffect(() => {
    getChatsList();
  }, []);

  return (
    <View>
      <ChatsTemplate
        myChatList={myChatList}
        handleDetailChat={handleDetailChat}
        refreshing={refreshing}
        setRefreshing={setRefreshing}
        refresh={getChatsList}
      />
    </View>
  );
}

export default Chats;
