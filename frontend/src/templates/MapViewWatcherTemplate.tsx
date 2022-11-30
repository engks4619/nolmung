import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import {MAIN_COLOR} from '~/const';
import {Coord} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import MyButton from '~/atoms/MyButton';
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

function MapViewWatcherTemplate({
  myPosition,
  path,
  dogInfoList,
  doneWalking,
  distance,
  second,
}: Props) {
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={styles.whileLoading}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView overScrollMode="never">
        <WalkingDogs dogInfoList={dogInfoList} text="함께하는 반려견" />
        <View style={styles.mapContainer}>
          <NaverMapView
            style={styles.nmap}
            zoomControl={true}
            center={{
              zoom: 16,
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
              <Polyline
                strokeWidth={5}
                coordinates={path}
                strokeColor={MAIN_COLOR}
              />
            ) : null}
          </NaverMapView>
        </View>
        {/* <View>
          <DoubleSummary
            firstLabel={'산책 시간'}
            firstText={second}
            secondLabel={'산책 거리'}
            secondText={distance}
          />
        </View> */}
        {/* <View style={styles.btnContainer}>
          <MyButton
            btnText="산책 종료"
            width={200}
            height={50}
            onClick={doneWalking}
          />
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  whileLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mapContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 2,
  },
  nmap: {
    justifySelf: 'center',
    width: '90%',
    height: '100%',
  },
  btnContainer: {
    flex: 1,
    paddingVertical: 15,
  },
});

export default MapViewWatcherTemplate;
