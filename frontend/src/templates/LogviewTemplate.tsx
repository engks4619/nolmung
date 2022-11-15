import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import NaverMapView, {Marker, Polyline, Coord, Path} from 'react-native-nmap';
import {DetailDogProps} from '@molecules/DetailDog';
import DetailDogs from '@organisms/DetailDogs';
import {MAIN_COLOR} from '~/const';
import ViewShot from 'react-native-view-shot';

interface Props {
  functions: Array<Function>;
  path: Coord[];
  dogInfoList: DetailDogProps[];
  isOver: boolean;
  // myPosition: Coord | null;
}
interface Photo {
  name: string;
  uri: any;
}
function LogViewTemplate({
  functions,
  path,
  dogInfoList,
  isOver,
}: // myPosition,
Props) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const ref: any = useRef();
  const createFormData = (image: any, body: any = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: image.name,
      uri: image.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };
  const captureMap = () => {
    ref.current.capture().then((uri: any) => {
      console.log('uri', uri);
      setPhoto({
        name: 'imageName',
        uri: uri,
      });
    });
  };
  const sendDatas = () => {
    const b = createFormData(photo, {
      ownerIdx: -1650769681,
      walkerIdx: -1650769681,
      distance: 100.0,
      time: 5,
      startDate: '2022.10.26 00:00:00',
      endDate: '2022.10.26 00:00:00',
      walkedDogList: [1, 2, 3],
      latitudes: [1.1, 2.1],
      longitudes: [2.4, 3.4],
    });
    fetch('http://nolmung.kr/api/withdog/walk', {
      method: 'POST',
      body: b,
      // body: createFormData(photo, {
      //   ownerIdx: -1650769681,
      //   walkerIdx: -1650769681,
      //   distance: 100.0,
      //   time: 5,
      //   startDate: '2022.10.26 00:00:00',
      //   endDate: '2022.10.26 00:00:00',
      //   walkedDogList: [1, 2, 3],
      //   latitudes: [1.1, 2.1],
      //   longitudes: [2.4, 3.4],
      // }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('formData', b);
        console.log('error1', error);
      });
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
                center={path[path.length / 2]}>
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
          <View style={styles.mapContainer}>
            <NaverMapView
              style={styles.nmap}
              zoomControl={true}
              center={path[path.length / 2]}>
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
          <Pressable>
            <Text>저장x/저장O/이어하기 버튼들</Text>
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
});
export default LogViewTemplate;
