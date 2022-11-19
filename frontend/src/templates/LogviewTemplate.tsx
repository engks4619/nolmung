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

interface Props {
  path: Coord[];
  dogInfoList: DetailDogProps[];
  // isOver: boolean;
  myPosition: Coord;
  saveLogs: () => void;
  noSaveLogs: () => void;
  countinueLogs: () => void;
}
function LogViewTemplate({
  path,
  dogInfoList,
  // isOver,
  myPosition,
  saveLogs,
  noSaveLogs,
  countinueLogs,
}: Props) {
  // if (isOver) {
  //   return (
  //     <ScrollView>
  //       <View style={styles.logViewContainer}>
  //         <Text>{path.length}</Text>
  //         <Pressable onPress={() => saveLogs()}>
  //           <Text>저장</Text>
  //         </Pressable>
  //         <Pressable onPress={() => noSaveLogs()}>
  //           <Text>저장x</Text>
  //         </Pressable>
  //         <WalkingDogs dogInfoList={dogInfoList} text="함께한 반려견" />
  //         <View style={styles.mapContainer}>
  //           <NaverMapView
  //             style={styles.nmap}
  //             zoomControl={true}
  //             center={{
  //               zoom: 17,
  //               latitude: myPosition.latitude,
  //               longitude: myPosition.longitude,
  //             }}>
  //             <Marker
  //               coordinate={path[path.length - 1]}
  //               width={50}
  //               height={50}
  //               anchor={{x: 0.5, y: 0.5}}
  //               caption={{text: '나'}}
  //               image={require('@assets/logo.png')}
  //             />
  //             {path.length >= 2 ? (
  //               <Polyline coordinates={path} strokeColor={MAIN_COLOR} />
  //             ) : null}
  //           </NaverMapView>
  //         </View>
  //       </View>
  //     </ScrollView>
  //   );
  // } else {
  return (
    <ScrollView>
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
    </ScrollView>
  );
  // }
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
    height: Dimensions.get('window').height / 2,
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
