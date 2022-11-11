import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_COLOR} from '~/const';
import ChatsDetail from './ChatsDetail';

export type ChatsParamList = {
  Chats: undefined;
  ChatsDetail: {roomId: number};
};

const ChatsStack = createNativeStackNavigator();

export const ChatsStackNavigator = () => (
  <ChatsStack.Navigator>
    <ChatsStack.Screen
      name="Chats"
      component={Chats}
      options={{
        headerTitle: '놀면 멍하니',
        headerTintColor: MAIN_COLOR,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
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
  </ChatsStack.Navigator>
);

function Chats() {
  return (
    <View>
      <Text>채팅방 목록</Text>
    </View>
  );
}

export default Chats;
