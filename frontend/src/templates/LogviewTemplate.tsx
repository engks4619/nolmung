import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import NaverMapView, {Marker, Polyline, Coord} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import DetailDogs from '@organisms/DetailDogs';
import {MAIN_COLOR} from '~/const';
import ViewShot, {captureRef} from 'react-native-view-shot';

interface Props {
  functions: Array<Function>;
  path: Coord[];
  dogInfoList: DetailDogProps[];
  isOver: boolean;
  myPosition: Coord;
  saveAndGo: (ref: any) => void;
}
function LogViewTemplate({
  functions,
  path,
  dogInfoList,
  isOver,
  myPosition,
  saveAndGo,
}: // myPosition,
Props) {
  const ref = useRef<ViewShot>(null);
  const capture = () => {
    captureRef(ref, {
      format: 'jpg',
      quality: 0.9,
    }).then(
      uri => {
        console.log('이미지uri', uri);
        setPhoto({
          name: `${userIdx},${startDate}`,
          mime: 'images/jpeg',
          path: uri,
        });
      },
      error => console.log('스샷에러', error),
    );
  };
  if (isOver) {
    return (
      <ScrollView>
        <View style={styles.logViewContainer}>
          <Text>{path.length}</Text>
          <Pressable onPress={() => captureMap()}>
            <Text>캡쳐하기</Text>
          </Pressable>
          <Pressable onPress={() => sendDatas()}>
            <Text>사진전송</Text>
          </Pressable>
          <DetailDogs dogInfoList={dogInfoList} />
          <ViewShot
            ref={ref}
            options={{format: 'jpg'}}
            style={styles.mapContainer}>
            <View style={styles.nmap}>
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
          </ViewShot>
          <Pressable
            onPress={() => {
              functions[0];
            }}>
            <Text>저장x/저장O 버튼들</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <View>
          <DetailDogs dogInfoList={dogInfoList} />
          <ViewShot ref={ref} style={styles.viewShot}>
            <View style={styles.mapContainer}>
              {/* <Image
                style={styles.img}
                source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              /> */}
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
          </ViewShot>
          <Pressable>
            <Text>저장x/저장O/이어하기 버튼들</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              saveAndGo(ref);
            }}>
            <Text>저장하기</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logViewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  viewShot: {
    backgroundColor: '#fff',
  },
  mapContainer: {
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    width: '90%',
    height: Dimensions.get('window').height / 4,
  },
  nmap: {
    justifySelf: 'center',
    width: '100%',
    height: '100%',
  },
  img: {
    height: 400,
  },
});
export default LogViewTemplate;
