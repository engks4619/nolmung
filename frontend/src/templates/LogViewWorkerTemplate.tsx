import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import NaverMapView, {Marker, Polyline, Coord} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import {MAIN_COLOR} from '~/const';
import WalkingDogs from '~/organisms/WalkingDogs';
import DoubleSummary from '@molecules/DoubleSummary';
import MyButton from '~/atoms/MyButton';

interface Props {
  path: Coord[];
  dogInfoList: DetailDogProps[];
  myPosition: Coord;
  saveLogs: () => void;
  noSaveLogs: () => void;
  countinueLogs: () => void;
  second: number;
  distance: number;
  startDate: string | null;
}
function LogViewWorkerTemplate({
  path,
  dogInfoList,
  myPosition,
  second,
  distance,
  startDate,
}: Props) {
  const date = startDate ? new Date(startDate).toLocaleString('ko-KR') : '';
  return (
    <View style={styles.container}>
      <ScrollView overScrollMode="never">
        <View style={styles.logSummaryContainer}>
          <Text style={styles.logSummarySmall}>{date ? date : ''}</Text>
          <Text style={styles.logSummaryMiddle}>산책 기록</Text>
          <DoubleSummary
            firstLabel={'산책 시간'}
            firstText={second}
            secondLabel={'산책 거리'}
            secondText={distance}
          />
        </View>
        <WalkingDogs dogInfoList={dogInfoList} text="함께한 반려견" />

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
              coordinate={path[path.length - 1]}
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
        <View style={styles.btnContainer}>
          <MyButton
            btnText="산책 후기 남기기"
            width={200}
            height={50}
            onClick={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  mapContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 2,
  },
  logSummaryContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: 'rgba(0, 0, 0, 0.2)',
  },
  logSummarySmall: {
    color: 'black',
    fontSize: 12,
  },
  logSummaryMiddle: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  nmap: {
    justifySelf: 'center',
    width: '90%',
    height: '100%',
  },
  img: {
    height: 400,
  },
  btnContainer: {
    flex: 1,
    paddingVertical: 15,
  },
});
export default LogViewWorkerTemplate;
