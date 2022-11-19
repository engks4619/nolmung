import React, {useState, useCallback} from 'react';
import {View, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MypageTemplate from '../templates/MypageTemplate';
import Filter from '@assets/filter.svg';
import Home from '@assets/home.svg';

import MyPostList from '@pages/MyPostList';
import MyLikedList from '@pages/MyLikedList';
import MyLikedSpots from '@pages/MyLikedSpots';
import MyWalkingRecord from '@pages/MyWalkingRecord';
import MyDogs from '@pages/MyDogs';
import MapViewAlone from '@pages/MapViewAlone';
import LogView from '@pages/LogView';
import WalkReview from './WalkReview';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import MultipleImagePicker, {
  MediaType,
  ImageResults,
  VideoResults,
} from '@baronha/react-native-multiple-image-picker';
import axios from 'utils/axios';
import ImageResizer from 'react-native-image-resizer';
//UserInfoType
export type UserInfoType = {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
};

const MypageStack = createNativeStackNavigator();
export const MypageStackNavigator = () => (
  <MypageStack.Navigator>
    <MypageStack.Screen
      name="MypageInit"
      component={Mypage}
      options={{headerShown: false}}
    />
    <MypageStack.Screen name="MyPostList" component={MyPostList} />
    <MypageStack.Screen name="MyLikedList" component={MyLikedList} />
    <MypageStack.Screen name="MyLikedSpots" component={MyLikedSpots} />
    <MypageStack.Screen name="MyWalkingRecord" component={MyWalkingRecord} />
    <MypageStack.Screen name="MyDogs" component={MyDogs} />
    <MypageStack.Screen
      name="MapViewAlone"
      component={MapViewAlone}
      options={{headerShown: true}}
    />
    <MypageStack.Screen
      name="LogView"
      component={LogView}
      options={{headerShown: true}}
    />
    <MypageStack.Screen
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
  </MypageStack.Navigator>
);

// 마이페이지 버튼탭 목록(navi동작)
const myPageListNavi = [
  {
    name: 'MyPostList',
    icon: <Filter width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내가 쓴 글',
  },
  {
    name: 'MyLikedList',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내가 찜한 글',
  },
  {
    name: 'MyLikedSpots',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내가 찜한 스팟',
  },
  {
    name: 'MyWalkingRecord',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내 산책 기록',
  },
  {
    name: 'MyDogs',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내 강아지',
  },
  {
    name: 'WalkReview',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '산책후기',
  },
];
// 마이페이지 버튼탭 목록(다른동작)
const myPageListFunc = [
  {
    name: 'Logout',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '로그아웃',
  },
];

function Mypage({navigation}: any) {
  const user = useSelector((state: RootState) => state.user);
  const userInfo: UserInfoType = {
    imageSource: user.profileImage,
    userName: user.nickname,
    walkNumber: 10,
    walkHour: 10,
    walkDistance: 100,
  };
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(userInfo.userName);
  const [tempProfileImage, setTempProfileImage] = useState<any[]>([]);

  const onChangeNickname = useCallback(text => {
    setTempNickname(text);
  }, []);

  const profileEdit = async () => {
    if (isEditing) {
      if (tempProfileImage || tempNickname !== userInfo.userName) {
        console.log(tempProfileImage);
        const body = new FormData();
  ImageResizer.createResizedImage(
    tempProfileImage[0].path,
    1200,
    1200,
    tempProfileImage.mime.includes('jpeg') ? 'JPEG' : 'PNG',
    100,
    0,).then(async resizedImg => {
      const image: photo = {
        uri: resizedImg.uri,
        name: resizedImg.name,
        type: img.mime,
      }
        const image = {
          uri: tempProfileImage[0].realPath,
          name: tempProfileImage[0].fileName,
          type: tempProfileImage[0].type,
        };
        body.append('file', image);
        body.append('nickname', tempNickname);
        try {
          const response = await axios.post('/user', body, {
            headers: {'content-type': 'multipart/form-data'},
            transformRequest: (data, headers) => {
              return data;
            },
          });
          console.log(response);
        } catch (err: any) {
          console.log(err);
        }
      }
    }
    setIsEditing(!isEditing);
  };

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        // isExportThumbnail: true,
        usedCameraButton: true,
        doneTitle: '완료',
        cancelTitle: '취소',
        singleSelectedMode: true,
        mediaType: 'image',
      });
      setTempProfileImage(response);
    } catch (e: any) {
      Alert.alert('이미지 선택 실패!', e.code, e.message);
    }
  };
  return (
    <View>
      <MypageTemplate
        userInfo={userInfo}
        isEditing={isEditing}
        profileEdit={profileEdit}
        onChangeNickname={onChangeNickname}
        value={tempNickname}
        TabButtonListNavi={myPageListNavi}
        TabButtonListFunc={myPageListFunc}
        navigation={navigation}
        openPicker={openPicker}
      />
    </View>
  );
}

export default Mypage;
