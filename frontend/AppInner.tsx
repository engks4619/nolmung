import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chats from './src/pages/Chats';
import Community from './src/pages/Community';
import Main from './src/pages/Main';
import Mypage from './src/pages/Mypage';
import Spots from './src/pages/Spots';

import MyPostList from './src/pages/MyPostList';
import MyLikedList from './src/pages/MyLikedList';
import MyLikedSpots from './src/pages/MyLikedSpots';
import MyWalkingRecord from './src/pages/MyWalkingRecord';
import MyDogs from './src/pages/MyDogs';

import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import {MAIN_COLOR} from '~/const';
import Maps from './src/pages/maps';
// import {RootState} from "./src/store/reducer";

import usePermissions from '~/hooks/usePermissions';

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
const MypageStack = createNativeStackNavigator();
const MypageStackNavigator = () => (
  <MypageStack.Navigator>
    <MypageStack.Screen
      name="Mypage"
      component={Mypage}
      options={{headerShown: false}}
    />
    <MypageStack.Screen name="MyPostList" component={MyPostList} />
    <MypageStack.Screen name="MyLikedList" component={MyLikedList} />
    <MypageStack.Screen name="MyLikedSpots" component={MyLikedSpots} />
    <MypageStack.Screen name="MyWalkingRecord" component={MyWalkingRecord} />
    <MypageStack.Screen name="MyDogs" component={MyDogs} />
  </MypageStack.Navigator>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  usePermissions(); //권한 요청 커스텀 훅
  // const isLoggedIn = useSelector(( state:RootState) => !!state.user.email)
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="홈">
          <Tab.Screen
            name="채팅"
            component={Chats}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="애견 동반 스팟"
            component={Spots}
            options={{optiopn: false}}
          />
          <Tab.Screen
            name="홈"
            component={Main}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
            }}
          />
          <Tab.Screen
            name="커뮤니티"
            component={Community}
            options={{
              headerTitle: '놀면 멍하니',
              headerTintColor: MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15,
              },
            }}
          />
          <Tab.Screen
            name="마이페이지"
            // component={Mypage}
            component={MypageStackNavigator}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Maps"
            component={Maps}
            options={{headerShown: false}}
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
