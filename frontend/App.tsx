import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chats from './src/pages/Chats';
import Community from './src/pages/Community';
import MainFake from './src/pages/MainFake'; // Main 들어갈 곳
// import Mypage from './src/pages/Mypage';
import Spots from './src/pages/Spots';
import Maps from './src/pages/maps'


import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';

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

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="채팅"
            component={Chats}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="애견 동반 스팟"
            component={Spots}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="홈"
            component={MainFake}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="커뮤니티"
            component={Community}
            options={{headerShown: false}}
          />
{/*           <Tab.Screen */}
{/*             name="마이페이지" */}
{/*             component={Mypage} */}
{/*             options={{headerShown: false}} */}
{/*           /> */}
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

export default App;
