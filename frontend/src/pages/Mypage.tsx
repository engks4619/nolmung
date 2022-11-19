import React, {useState, useCallback} from 'react';
import {View, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MypageTemplate from '../templates/MypageTemplate';
import Filter from '@assets/filter.svg';
import Home from '@assets/home.svg';
import PostSend from '@assets/postSend.svg';
import Heart from '@assets/heart.svg';
import BarChart from '@assets/bar-chart.svg';
import Paw from '@assets/paw.svg';
import Schedule from '@assets/schedule.svg';

import MyPostList from '@pages/MyPostList';
import MyLikedList from '@pages/MyLikedList';
import MyLikedSpots from '@pages/MyLikedSpots';
import MyWalkingRecord from '@pages/MyWalkingRecord';
import MyDogs from '@pages/MyDogs';
import MapViewAlone from '@pages/MapViewAlone';
import LogView from '@pages/LogView';
import WalkReview from './WalkReview';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import axios from 'utils/axios';
import ImageResizer from 'react-native-image-resizer';
import {setProfile} from '~/slices/userSlice';
//UserInfoType
export type UserInfoType = {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
};
import {photo} from '~/utils/type';

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
    <MypageStack.Screen
      name="MyDogs"
      component={MyDogs}
      options={{headerShown: false}}
    />
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
    icon: <PostSend width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '내가 쓴 글',
  },
  {
    name: 'MyLikedList',
    icon: <Heart width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '내가 찜한 글',
  },
  {
    name: 'MyLikedSpots',
    icon: <Heart width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '내가 찜한 스팟',
  },
  {
    name: 'MyWalkingRecord',
    icon: <BarChart width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '내 산책 기록',
  },
  {
    name: 'MyDogs',
    icon: <Paw width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '내 강아지',
  },
  {
    name: 'WalkReview',
    icon: <Schedule width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '산책후기',
  },
];
// 마이페이지 버튼탭 목록(다른동작)
const myPageListFunc = [
  {
    name: 'Logout',
    icon: <Home width={15} height={15} fill={'black'} stroke={'black'} />,
    btnText: '로그아웃',
  },
];

function Mypage({navigation}: any) {
  const user = useSelector((state: RootState) => state.user);
  const userInfo: UserInfoType = {
    imageSource: user.profileImage,
    userName: user.nickname,
    walkNumber: user.totalWalk,
    walkHour: user.totalTime,
    walkDistance: user.totalDistance,
  };
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(userInfo.userName);
  const [tempProfileImage, setTempProfileImage] = useState<any>(null);

  const dispatch = useDispatch();
  const onChangeNickname = useCallback(text => {
    setTempNickname(text);
  }, []);

  const profileEdit = async () => {
    if (isEditing) {
      if (tempProfileImage || tempNickname !== userInfo.userName) {
        const body = new FormData();
        ImageResizer.createResizedImage(
          tempProfileImage.realPath,
          1200,
          1200,
          tempProfileImage.mime.includes('jpeg') ? 'JPEG' : 'PNG',
          100,
          0,
        ).then(async resizedImg => {
          const image: photo = {
            uri: resizedImg.uri,
            name: resizedImg.name,
            type: tempProfileImage.mime,
          };
          body.append('file', image);
          body.append('nickname', tempNickname);
          try {
            const response = await axios.put('/user', body, {
              headers: {
                'content-type': 'multipart/form-data',
              },
            });
            const profile = response.data;
            dispatch(
              setProfile({
                nickname: profile.nickname,
                profileImage: profile.profileImage,
              }),
            );
          } catch (err: any) {
            console.log(err);
          }
        });
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
      console.log(response);
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
        tempProfileImage={tempProfileImage}
      />
    </View>
  );
}

export default Mypage;
