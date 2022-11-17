import React, {useRef, useState} from 'react';
import {View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {logsToServer} from '~/utils/MyPositionFunctions';
import {dogInfo} from '~/molecules/MainDogs';
import axios from 'utils/axios';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {uploadImg} from '~/utils/imgService';
import { setIsSavingOff, setIsSavingOn } from '~/slices/myPositionSlice';

const functions = [logsToServer]; //저장x,저장하기,이어하기,navigate뒤로가기 추가해야함
const moment = require('moment');
function LogView({route, navigation}: any) {
  const dispatch = useDispatch();
  const path = useSelector((state: RootState) => state.myPosition.path);
  const isOver = route.params.isOver;
  const dogsInfo: dogInfo[] = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  const selectedDogs: number[] = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  const distance = useSelector((state: RootState) => state.myPosition.distance);
  const startDate = useSelector(
    (state: RootState) => state.myPosition.startDate,
  );
  const lastUpdate = useSelector(
    (state: RootState) => state.myPosition.lastUpdate,
  );
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  // dogs type import해와서 지정
  const dogs: dogInfo[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });
  // 캡쳐관련
  const [photo, setPhoto] = useState({});
  const capture = async (ref: any) => {
    await captureRef(ref, {
      format: 'jpg',
      quality: 0.9,
    }).then(
      uri => {
        console.log('이미지uri', uri);
        const p = {
          name: `${userIdx},${startDate}`,
          mime: 'images/jpeg',
          path: uri,
        };
        setPhoto(p);
        // dispatch(setPhoto(p));
        console.log('캡쳐직후', photo);
      },
      error => console.log('스샷에러', error),
    );
  };

  // img,데이터 전송
  const submitLogs = async () => {
    const jsonData = {
      ownerIdx: userIdx,
      walkerIdx: userIdx,
      distance: distance,
      time:
        lastUpdate && startDate
          ? (new Date(lastUpdate).getTime() - new Date(startDate).getTime()) /
            1000
          : 0,
      startDate: moment(startDate).format('yyyy-MM-DD HH:mm:ss'),
      endDate: moment(lastUpdate).format('yyyy-MM-DD HH:mm:ss'),
      walkedDogList: selectedDogs,
      gpsList: path,
    };

    try {
      console.log('전송중');
      const response = await axios.post('withdog/walk', jsonData);
      if (response?.status === 200) {
        const postIdx = response?.data;
        console.log(photo)
        if (photo) {
          console.log('사진있어요');
          await uploadImg(photo, `withdog/walk/img/${postIdx}`);
        }
      }
      Alert.alert('게시글 작성완료!');
      navigation.navigate('Main');
    } catch (err: any) {
      Alert.alert('게시글 작성 실패!', err);
    }
  };

  //저장o 새로시작
  const saveAndGo = async (ref: any) => {
    await capture(ref);
    console.log('세이브앤고');
    console.log(photo);
    dispatch(setIsSavingOn);
    await submitLogs();
    dispatch(setIsSavingOff);
    navigation.replace('MainPage');
    //"저장완료되었습ㄴ이다"
    //Function navigate to main Page
  };
  //저장x 새로시작
  const noSaveAndGo = async () => {
    //redux,as 클리어
    //startWalking
    //navigate mapView
  }

  //이어하기
  const countinueAndGo = async () => {
    //startLogging
    //navigate mapview
  }


  return (
    <View>
      <LogViewTemplate
        functions={functions}
        path={path}
        dogInfoList={dogs}
        isOver={isOver}
        myPosition={myPosition}
        saveAndGo={(ref: any) => {
          saveAndGo(ref);
        }}
      />
    </View>
  );
}
export default LogView;
