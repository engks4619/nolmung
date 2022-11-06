import React, {useState,useEffect} from 'react';
import {Text, View} from 'react-native';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import Geolocation from '@react-native-community/geolocation';
import {MAIN_COLOR} from '~/const';
import { containsKey, getData, removeData, storeData } from "../utils/AsyncService";

// var polylinePath = [
//   {latitude:37.4526437, longitude: 126.49236},
//   {latitude:37.4768068, longitude: 126.4847975},
//   {latitude:37.4988237, longitude: 126.4960839},
//   {latitude:37.5176422, longitude: 126.5392841},
//   {latitude: 37.5398154, longitude: 126.5708743},
//   {latitude: 37.5457857, longitude: 126.5968815},
//   {latitude: 37.5646413, longitude: 126.6502792},
//   {latitude: 37.5708896, longitude: 126.7197823},
//   {latitude: 37.5710499, longitude: 126.7444216},
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

type Geoloc  = { 
  latitude: number;
  longitude: number;
} | null;

type GeolocList = Array<Geoloc> | any;

function Maps() {
  // 산책 종료 로직
  // 산책 종료 버튼 클릭
  // 현재 그려진 그림 Screenshot 찍고 전송
  // AsyncStorage 'walkinglog' 지우기

  // 처음 페이지 렌더링시 
  // if asyncstorage에 남이 있는 walingLog가 있다면 불러와서 State에 저장
  // 현재 위치 변경시 지도 focus 변경과 동시에 Asynstorage에 저장

  const initWalkingLog = async(): Promise<boolean> => {
    const hasLog = await containsKey("walkinLog");
    Geolocation.getCurrentPosition(
      async (info) => {
        const answer = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        }
        if (hasLog) {
          const walkingLog = await getData('walkinLog')
          setpolylinePath(walkingLog)
          return true
        } else {
          setpolylinePath([answer,answer,answer])
          return false
        }
      },
        console.error,
        {enableHighAccuracy: true,}
    )
    return true
    // if (hasLog) {
    //   const walkingLog = await getData('walkinLog')
    //   setpolylinePath(walkingLog)
    //   return true
    // } else {
    //   setpolylinePath([answer,answer])
    //   return false
    // }
  }
  const [myPosition, setMyPosition] = useState<Geoloc>(null);
  const [polylinePath, setpolylinePath] = useState<GeolocList>([]);
  
  useEffect(() => {
    // asyncStorage에서 보유하고 있는 기록이 있으면 polylinePath default 값 설정
    initWalkingLog();



    // 현재위치업데이트 될 때 마다
    Geolocation.watchPosition(
      info => {
        let currentLoc:Geoloc = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }
        let newPolyLinePath = polylinePath.concat(currentLoc)
        setMyPosition(currentLoc); //현재지도 포커스 변경을 위해
        setpolylinePath(newPolyLinePath) // state update
        storeData('walkingLog',newPolyLinePath) //asyncStorage에 저장

      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter:10, // 몇 미터 당 callBack실행시킬것인가
      },
    );


  }, []);

  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  return <NaverMapView style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={true}
                        center={{...myPosition, zoom: 16}}
                        onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
                           {myPosition?.latitude && (
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
          )}

          {/* <Polyline coordinates={polylinePath} onClick={() => console.warn('onClick! polyline')}/>   */}
          <Path coordinates={polylinePath} onClick={() => console.warn('onClick! path')} width={1} outlineColor={MAIN_COLOR} color={MAIN_COLOR}/>
      {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
      <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
      <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
      <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
      <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
      <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
      <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/> */}
  </NaverMapView>
}

export default Maps;