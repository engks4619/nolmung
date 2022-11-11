import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import NaverMapView, {Marker, Polyline, Coord} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import DetailDogs from '@organisms/DetailDogs';
import {MAIN_COLOR} from '~/const';

interface Props {
  functions: Array<Function>;
  path: Coord[];
  dogInfoList: DetailDogProps[];
  isOver: boolean;
  myPosition: Coord;
}

function LogViewTemplate({
  functions,
  path,
  dogInfoList,
  isOver,
  myPosition,
}: Props) {
  console.log('myposition', myPosition);
  if (isOver) {
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
        <Pressable
          onPress={() => {
            functions[0];
          }}>
          <Text>저장x/저장O 버튼들</Text>
        </Pressable>
      </View>
    );
  } else {
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
        <Pressable>
          <Text>저장x/저장O/이어하기 버튼들</Text>
        </Pressable>
      </View>
    );
  }
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
export default LogViewTemplate;
