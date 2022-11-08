import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chats from './src/pages/Chats';
import Community from './src/pages/Community';
import Main from './src/pages/Main';
import Spots from './src/pages/Spots';

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

// import {RootState} from "./src/store/reducer";

export type LoggedInParamList = {
  Chats: undefined;
  Spots: undefined;
  Main: undefined;
  Community: undefined;
  Mypage: undefined;
  // Coummunity: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  // const isLoggedIn = useSelector(( state:RootState) => !!state.user.email)
  const [isLoggedIn, setLoggedIn] = useState(true);
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
            name="Chats"
            component={Chats}
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
              title: '애견 동반 스팟',
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
            name="Community"
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
