import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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

export interface chatListType {
  categoryType: string;
  chatUserIdx: number;
  completed: boolean;
  isOwner: boolean;
  nickname: string;
  postIdx: number;
  subject: string;
  thumbnailUrl: string;
  userImgUrl: string;
  pay: null | number;
  roomId: string;
}

function Chats({navigation}: any) {
  const dispatch = useAppDispatch();
  const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const [myChatList, setMyChatList] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getChatsList = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('community/chat');
      setMyChatList(response.data);
    } catch (error: any) {
      console.log('채팅 목록 에러');
    }
    setRefreshing(false);
  };

  const handleDetailChat = (chatInfo: chatListType) => {
    const writerIdx = chatInfo.isOwner ? userIdx : chatInfo.chatUserIdx;

    dispatch(
      setChatPostInfo({
        pay: chatInfo.pay,
        postIdx: chatInfo.postIdx,
        thumbnailUrl: chatInfo.thumbnailUrl,
        subject: chatInfo.subject,
        writerIdx,
        oppentIdx: chatInfo.chatUserIdx,
        userImgUrl: chatInfo.userImgUrl,
        writer: chatInfo.nickname,
        categoryType: chatInfo.categoryType,
        completed: chatInfo.completed,
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
        refresh={getChatsList}
        refreshing={refreshing}
      />
    </View>
  );
}

export default Chats;
