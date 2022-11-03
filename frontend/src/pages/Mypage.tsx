import React, {useState, useCallback} from 'react';
import {Text, View, Alert} from 'react-native';
// import {RootState} from '../store/reducer';
// import {useSelector} from 'react-redux';
import MypageTemplate from '../templates/MypageTemplate';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRefContext,
} from '@react-navigation/native';
import MyPostList from './MyPostList';
import {TabButtonObject} from '@molecules/TabButtonGroup';
import Filter from '@assets/filter.svg';
import Home from '@assets/home.svg';
//UserInfoType
type UserInfoType = {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
};

//dummy
const userInfo: UserInfoType = {
  imageSource:
    'http://image.dongascience.com/Photo/2020/03/d2bb40617ababa299660cccc0442f993.jpg',
  userName: '윤성도짱짱',
  walkNumber: 10,
  walkHour: 10,
  walkDistance: 100,
};
// export type MypageStackParamList = {
//   MyPostList: undefined;
// SignUp: undefined;
// };

// const Stack = createNativeStackNavigator<MypageStackParamList>();
// type MypageProps = NativeStackScreenProps<MypageStackParamList,'Mypage'>

function Mypage({navigation}) {
  // const userInfo = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(userInfo.userName);

  const onChangeNickname = useCallback(text => {
    setTempNickname(text);
  }, []);

  const profileEdit = (): void => {
    if (isEditing) {
      // 변경 profile 전송(닉네임 + 사진)
    }
    setIsEditing(!isEditing);
  };

  const goNextStack = useCallback((whereToGo: string) => {
    navigation.navigate(whereToGo);
  }, []);

  type TabButtonList = Array<TabButtonObject>;
  const myPageList: TabButtonList = [
    {
      name: 'MyPostList',
      icon: <Filter width={25} height={25} fill={'black'} stroke={'black'} />,
      BtnText: '내가 쓴 글',
      onClick: () => {
        navigation.navigate('MyPostList');
      },
    },
    {
      name: 'MyLikedList',
      icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
      BtnText: '내가 찜한 글',
      onClick: () => {
        navigation.navigate('MyLikedList');
      },
    },
    {
      name: 'MyLikedSpots',
      icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
      BtnText: '내가 찜한 스팟',
      onClick: () => {
        navigation.navigate('MyLikedSpots');
      },
    },
    {
      name: 'MyWalkingRecord',
      icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
      BtnText: '내 산책 기록',
      onClick: () => {
        navigation.navigate('MyWalkingRecord');
      },
    },
    {
      name: 'MyDogs',
      icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
      BtnText: '내 강아지',
      onClick: () => {
        navigation.navigate('MyDogs');
      },
    },
  ];

  const myPageList2: TabButtonList = [
    {
      name: 'Logout',
      icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
      BtnText: '로그아웃',
      onClick: () => {
        // navigation.navigate('MyDogs');
      },
    },
  ];

  return (
    <View>
      <MypageTemplate
        userInfo={userInfo}
        isEditing={isEditing}
        profileEdit={profileEdit}
        onChangeNickname={onChangeNickname}
        value={tempNickname}
        onClick={goNextStack}
        TabButtonList={myPageList}
        TabButtonList2={myPageList2}
      />
      {/* <NavigationContainer> */}
      {/* <Stack.Navigator>
        <Stack.Screen name="MyPostList" component={MyPostList} />
      </Stack.Navigator> */}
      {/* </NavigationContainer> */}
    </View>
  );
}

export type {UserInfoType};
export default Mypage;
