import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import NaverMapView, {Marker, Polyline, Coord} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import {MAIN_COLOR} from '~/const';
import WalkingDogs from '~/organisms/WalkingDogs';
import DoubleSummary from '@molecules/DoubleSummary';

interface Props {
  path: Coord[];
  dogInfoList: DetailDogProps[];
  isOver: boolean;
  myPosition: Coord;
  saveLogs: () => void;
  noSaveLogs: () => void;
  countinueLogs: () => void;
  second: number;
  distance: number;
}
function LogViewTemplate({
  path,
  dogInfoList,
  isOver,
  myPosition,
  saveLogs,
  noSaveLogs,
  countinueLogs,
  second,
  distance,
}: Props) {
  return (
    <ScrollView overScrollMode="never">
      <DoubleSummary
        firstLabel={'산책 시간'}
        firstText={second}
        secondLabel={'산책 거리'}
        secondText={distance}
      />
      <View>
        <WalkingDogs dogInfoList={dogInfoList} text="함께한 반려견" />
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
              coordinate={path[path.length - 1]}
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
        {isOver ? (
          <View>
            <Pressable
              onPress={() => {
                saveLogs();
              }}>
              <Text>저장하기</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                noSaveLogs();
              }}>
              <Text>저장 x</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                countinueLogs();
              }}>
              <Text>이어하기</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                saveLogs();
              }}>
              <Text>저장하기</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                noSaveLogs();
              }}>
              <Text>저장 x</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                countinueLogs();
              }}>
              <Text>이어하기</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // logViewContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  mapContainer: {
    backgroundColor: 'white',
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
  img: {
    height: 400,
  },
});
export default LogViewTemplate;
