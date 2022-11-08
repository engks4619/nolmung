import React, {useState, useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import {MAIN_COLOR} from '~/const';
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
//   {latitude: 37.5770001, longitude: 126.7733532},
//   {latitude: 37.5817724, longitude: 126.799401},
//   {latitude: 37.5841817, longitude: 126.8167752},
//   {latitude: 37.5808037, longitude: 126.8313027},
//   {latitude: 37.5716637, longitude: 126.8473288},
//   {latitude: 37.56136, longitude: 126.8619116},
//   {latitude: 37.5487926, longitude: 126.8852035},
//   {latitude: 37.540747, longitude: 126.8910651},
//   {latitude: 37.5303713, longitude: 126.8925982},
//   {latitude: 37.5164746, longitude: 126.8825719},
//   {latitude: 37.5002697, longitude: 126.8725686},
//   {latitude: 37.4933399, longitude: 126.8711786},
//   {latitude: 37.4760577, longitude: 126.8756663},
//   {latitude: 37.4634352, longitude: 126.8887979},
//   {latitude: 37.448467, longitude: 126.8947082},
//   {latitude: 37.4346374, longitude: 126.8977132},
//   {latitude: 37.4242394, longitude: 126.8949032},
//   {latitude: 37.4033979, longitude: 126.8806084},
//   {latitude: 37.3848775, longitude: 126.8691937},
//   {latitude: 37.371033, longitude: 126.8693097},
//   {latitude: 37.3724101, longitude: 126.9126676},
//   {latitude: 37.3830471, longitude: 126.9660813},
//   {latitude: 37.3807849, longitude: 126.9762181},
//   {latitude: 37.3971504, longitude: 127.0267188},
//   {latitude: 37.3961676, longitude: 127.0715545},
//   {latitude: 37.3730718, longitude: 127.0659032},
//   {latitude: 37.35114, longitude: 127.063139},
//   {latitude: 37.3268898, longitude: 127.0575003},
//   {latitude: 37.3210994, longitude: 127.0517556},
//   {latitude: 37.3084352, longitude: 127.0590529},
//   {latitude: 37.2877049, longitude: 127.0692822},
//   {latitude: 37.2762087, longitude: 127.0808982}
// ];

type Geoloc = {
  latitude: number;
  longitude: number;
};

function Maps() {
  // 산책 종료 로직
  // 산책 종료 버튼 클릭
  // 현재 그려진 그림 Screenshot 찍고 전송
  // AsyncStorage 'walkinglog' 지우기

  // 처음 페이지 렌더링시
  // if asyncstorage에 남이 있는 walingLog가 있다면 불러와서 State에 저장
  // 현재 위치 변경시 지도 focus 변경과 동시에 Asynstorage에 저장

  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>({latitude: 33.8805, longitude: -118.2084});
  const [path, setPath] = useState<any>([
    {latitude: 33.8805, longitude: -118.2084},
    {latitude: 33.8805, longitude: -118.2084},
  ]);
  // const addPath = (path:any, latitude: number, longitude: number) => {
  //   setPath([...path, {latitude: latitude, longitude: longitude}]);
  // };

  console.log('myposition:', myPosition);
  useEffect(() => {
    console.log('rendered');
    Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // console.log('------new position:', latitude, longitude);
        setMyPosition({latitude: latitude, longitude: longitude});
        // setPath([...path, {latitude: latitude, longitude: longitude}]);
        // addPath(path, latitude, longitude);
      },
      error => {
        console.log(error);
      },
      {
        interval:1000,
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter: 1,
      },
    );
  }, []);

  // useEffect(() => {
  //   console.log("렌더시작")
  //   setInterval(() => {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         // const {latitude, longitude} = position.coords;
  //         // const obj = {
  //         //   latitude: latitude,
  //         //   longitude: longitude,
  //         // };
  //         let a = position.coords.latitude
  //         let b = position.coords.longitude
  //         console.log('newposition',a,b)
  //         setMyPosition({latitude:a, longitude:b});
  //         // setPath([...oldPath, {latitude: latitude, longitude: longitude}]);
  //       },
  //       error => {
  //         console.log(error);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 20000,
  //         // maximumAge: 10,
  //         // interval: 6000,
  //       },
  //     );
  //   }, 8000);
  // }, []);

  useEffect(() => {
    console.log("useeffect2",path.length)
    console.log("추가직전마포",myPosition)
    setPath([...path, myPosition]);
  }, [myPosition]);

  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }
  const getC = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('newposition',latitude,longitude)
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );}
  // const a = {latitude: 37.502425, longitude: 127.04069};
  return (
    <View>
      <Text>{myPosition.latitude}</Text>
      <Text>{myPosition.longitude}</Text>
      <Pressable
      onPress={getC}>
        <Text>현재위치콘솔</Text>
      </Pressable>
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
        <Polyline coordinates={path} strokeColor={MAIN_COLOR} />
        {/* <Polyline coordinates={polylinePath} strokeColor={MAIN_COLOR} /> */}

      </NaverMapView>
    </View>
  );
}

export default Maps;
