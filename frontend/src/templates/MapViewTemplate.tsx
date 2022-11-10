import React, {useState, useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import {MAIN_COLOR} from '~/const';
import {Coord} from 'react-native-nmap';
// import {MAIN_COLOR} from '~/const';
// import {
//   containsKey,
//   getData,
//   removeData,
//   storeData,
// } from '../utils/AsyncService';

// var polylinePath = [
//   {latitude:33.8805, longitude: -118.2084},
//   {latitude:33.7805, longitude: -118.2084},
//   {latitude:33.6805, longitude: -118.2084},
//   {latitude:33.5805, longitude: -118.2084},
//   {latitude: 33.4805, longitude: -118.2084},
//   {latitude: 33.3805, longitude: -118.2084},
//   {latitude: 33.2805, longitude: -118.2084},
//   {latitude: 33.1805, longitude: -118.2084},
//   {latitude: 33.0805, longitude: -118.2084},]

interface Props {
  myPosition: Coord | null;
  path: Coord[];
}

function MapView({myPosition, path}: Props) {
  // 산책 종료 로직
  // 산책 종료 버튼 클릭
  // 현재 그려진 그림 Screenshot 찍고 전송
  // AsyncStorage 'walkinglog' 지우기

  // 처음 페이지 렌더링시
  // if asyncstorage에 남이 있는 walingLog가 있다면 불러와서 State에 저장
  // 현재 위치 변경시 지도 focus 변경과 동시에 Asynstorage에 저장

  // useEffect(() => {
  //   console.log('useeffect2', path.length);
  //   console.log('추가직전마포', myPosition);
  //   setPath([...path, myPosition]);
  // }, [myPosition]);

  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }
  return (
    <View>
      {/* {path ? (
        <View>
          <Text>{myPosition.latitude}</Text>
          <Text>{myPosition.longitude}</Text>
          {path.map(item => (
            <View>
              <Text>{item.latitude}</Text>
            </View>
          ))}
          {/* <Pressable onPress={getC}>
        <Text>현재위치콘솔</Text>
      </Pressable>
        </View>
      ) : (
        <></>
      )} */}

      <NaverMapView
        style={{width: '100%', height: '100%'}}
        zoomControl={true}
        center={{
          zoom: 17,
          latitude: myPosition.latitude,
          longitude: myPosition.longitude,
        }}>
        <Marker
          coordinate={{
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
          }}
          width={50}
          height={50}
          anchor={{x: 0.5, y: 0.5}}
          caption={{text: '나'}}
          image={require('@assets/logo.png')}
        />
        {path.length >= 2 ? (
          <Polyline coordinates={path} strokeColor={MAIN_COLOR} />
        ) : (
          <></>
        )}
        {/* <Polyline coordinates={polylinePath} strokeColor={MAIN_COLOR} /> */}
      </NaverMapView>
    </View>
  );
}

export default MapView;
