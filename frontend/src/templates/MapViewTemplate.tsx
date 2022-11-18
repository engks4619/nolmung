import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import {MAIN_COLOR} from '~/const';
import {Coord} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import MyButton from '~/atoms/MyButton';
import Timer from '@organisms/Timer';
import Distance from '@organisms/Distance';
import CustomHeader from '~/headers/CustomHeader';
import DoubleSummary from '@molecules/DoubleSummary';

import WalkingDogs from '~/organisms/WalkingDogs';
interface Props {
  myPosition: Coord | null;
  path: Coord[];
  dogInfoList: DetailDogProps[];
  startDate: Date | null;
  doneWalking: any;
  distance: number;
  dispatch: any;
  second: number;
  navigation: any;
}

function MapView({
  myPosition,
  path,
  dogInfoList,
  doneWalking,
  distance,
  dispatch,
  second,
  navigation,
}: Props) {
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={styles.whileLoading}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }
  return (
    <View>
      <ScrollView overscrollmode="never">
        <WalkingDogs dogInfoList={dogInfoList} text="함께하는 반려견" />
        <View style={styles.mapContainer}>
          <NaverMapView
            style={styles.nmap}
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
            ) : null}
          </NaverMapView>
        </View>
        <DoubleSummary
          firstLabel={'산책 시간'}
          firstText={second}
          secondLabel={'산책 거리'}
          secondText={distance}
        />
        <View style={styles.btnContainer}>
          <MyButton
            btnText="산책 종료"
            width={200}
            height={50}
            onClick={doneWalking}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  whileLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mapContainer: {
    alignItems: 'center',
    width: '90%',
    height: Dimensions.get('window').height / 2,
  },
  nmap: {
    justifySelf: 'center',
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
  },
});

export default MapView;
