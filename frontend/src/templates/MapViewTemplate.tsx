import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import {MAIN_COLOR} from '~/const';
import {Coord} from 'react-native-nmap';
import DetailDogs from '@organisms/DetailDogs';
import {DetailDogProps} from '@molecules/DetailDog';
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
  dogInfoList: DetailDogProps[];
}

function MapView({myPosition, path, dogInfoList}: Props) {
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }
  return (
    <View>
      <DetailDogs dogInfoList={dogInfoList} />
      <View style={styles.mapViewContainer}>
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
          ) : (
            <></>
          )}
          {/* <Polyline coordinates={polylinePath} strokeColor={MAIN_COLOR} /> */}
        </NaverMapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mapViewContainer: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: '80%',
  },
  nmap: {
    justifySelf: 'center',
    width: '100%',
    height: '100%',
  },
});

export default MapView;
