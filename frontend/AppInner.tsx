import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatsStackNavigator} from './src/pages/Chats';
import {SpotStackNavigator} from './src/pages/Spots';

import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import {MAIN_COLOR} from '~/const';

// SVG ICONS for BOTTOM TAB BAR
import ChatIcon from '@assets/chat.svg';
import HomeIcon from '@assets/home.svg';
import UserIcon from '@assets/user.svg';
import CommunityIcon from '@assets/community.svg';
import SpotIcon from '@assets/spot.svg';

import {MypageStackNavigator} from './src/pages/Mypage';
import {MainPageNavigator} from './src/pages/Main';
import {CommunityStackNavigator} from './src/pages/Community';

import usePermissions from '~/hooks/usePermissions';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import {getLocation, setUser} from '~/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '~/utils/axios';
import {useSocket, useChatSocket, useLocationSocket} from '~/hooks/useSocket';
import {setRoomInfos} from '~/slices/chatSlice';

import PushNotification from 'react-native-push-notification';
import {chatType} from '~/pages/ChatsDetail';

export type LoggedInParamList = {
  Chats: undefined;
  Spots: undefined;
  Main: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {}
};
function AppInner() {
  usePermissions(); //권한 요청 커스텀 훅
  const dispatch = useDispatch();
  const [socket, disconnect] = useSocket();
  const [chatSocket, chatDisconnect] = useChatSocket();
  const [locationSocket, locationDisconnect] = useLocationSocket();

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  const userIdx = useSelector((state: RootState) => state.user.userIdx);

  const getUserInfo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      accessToken !== null ? checkToken(accessToken) : null;
    } catch (error) {}
  };

  const checkToken = async (token: string) => {
    try {
      const responese = await axios.get('user/my-info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfo = {accessToken: token, ...responese.data};
      dispatch(setUser(userInfo));
      axios.defaults.headers.common['Authorization'] = token;
    } catch (error: any) {
      if (error.responese.status === 401) {
        removeUserInfo();
        return;
      }
    }
  };

  useEffect(() => {
    getLocation(dispatch);
    getUserInfo();
  }, []);

  const alarmChat = (msg: chatType) => {
    PushNotification.localNotification({
      channelId: 'chats',
      message: msg.chat,
      title: msg.sender,
    });
  };

  useEffect(() => {
    if (socket && isLoggedIn && userIdx && chatSocket && locationSocket) {
      const data = {id: userIdx};
      socket.emit('login', data);

      socket.on('rooms', roomsInfos => {
        roomsInfos.map(roomInfo => {
          chatSocket.emit('join', roomInfo.roomId);
        });
        dispatch(setRoomInfos(roomsInfos));
      });

      socket.on('joinRoom', newRoomId => chatSocket.emit('join', newRoomId));

      chatSocket.on('messageC', (msgData: chatType) => {
        if (msgData.sender === userIdx) {
          return;
        }
        alarmChat(msgData);
      });

      chatSocket.on('alarmCompleted', alarmData => {
        alarmChat(alarmData);
      });
    }
    return () => {
      if (socket && chatSocket) {
        socket.off('login');
        socket.off('rooms');
        socket.off('replyLogin');
        socket.off('joinRoom');
        chatSocket.off('messageC');
        chatSocket.off('completed');
      }
    };
  }, [isLoggedIn, socket, userIdx, chatSocket, locationSocket, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
      chatDisconnect();
      locationDisconnect();
    }
  }, [isLoggedIn, disconnect, chatDisconnect, locationDisconnect]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          initialRouteName="Main"
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: MAIN_COLOR,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
          }}>
          <Tab.Screen
            name="Main"
            component={MainPageNavigator}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              title: '홈',
              tabBarIcon: ({color}) => (
                <HomeIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="ChatList"
            component={ChatsStackNavigator}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              title: '채팅',
              tabBarIcon: ({color}) => (
                <ChatIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="SpotList"
            component={SpotStackNavigator}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              title: '산책스팟',
              tabBarIcon: ({color}) => (
                <SpotIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="CommunityList"
            component={CommunityStackNavigator}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              title: '커뮤니티',
              tabBarIcon: ({color}) => (
                <CommunityIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="MypageList"
            component={MypageStackNavigator}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              title: '마이페이지',
              tabBarIcon: ({color}) => (
                <UserIcon width={25} height={25} fill={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
export default AppInner;
