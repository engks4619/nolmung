import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatsStackNavigator} from './src/pages/Chats';
import Main from './src/pages/Main';
import Spots from './src/pages/Spots';
import Maps from '@pages/Maps';

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
import {CommunityStackNavigator} from './src/pages/Community';

import usePermissions from '~/hooks/usePermissions';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import {getLocation, setUser} from '~/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '~/utils/axios';
import useSocket, {useRoomSocket} from '~/hooks/useSocket';

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

function AppInner() {
  usePermissions(); //권한 요청 커스텀 훅
  const dispatch = useDispatch();
  const [socket, disconnect] = useSocket();
  const [roomSocket, roomDisconnect] = useRoomSocket();

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

  const removeUserInfo = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
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

  useEffect(() => {
    // const helloCallback = (data: any) => {
    //   console.log(data);
    // };
    if (socket && isLoggedIn && userIdx) {
      const data = {id: userIdx};
      socket.emit('login', data);
      // socket.on('hello', helloCallback);
    }
    return () => {
      if (socket) {
        socket.off('login');
      }
    };
  }, [isLoggedIn, socket, userIdx]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
      roomDisconnect();
    }
  }, [isLoggedIn, disconnect, roomDisconnect]);

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
            name="ChatList"
            component={ChatsStackNavigator}
            options={{
              headerShown: false,
              title: '채팅',
              tabBarIcon: ({color}) => (
                <ChatIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Spots"
            component={Spots}
            options={{
              headerShown: false,
              title: '산책스팟',
              tabBarIcon: ({color}) => (
                <SpotIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Main"
            component={Main}
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
            name="CommunityList"
            component={CommunityStackNavigator}
            options={{
              headerShown: false,
              title: '커뮤니티',
              tabBarIcon: ({color}) => (
                <CommunityIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Mypage"
            // component={Mypage}
            component={MypageStackNavigator}
            options={{
              headerShown: false,
              title: '마이페이지',
              tabBarIcon: ({color}) => (
                <UserIcon width={25} height={25} fill={color} />
              ),
            }}
          />
          <Tab.Screen name="maps" component={Maps} />
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
