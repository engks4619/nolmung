import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {logsToServer} from '~/utils/MyPositionFunctions';
import {dogInfo} from '~/molecules/MainDogs';

const functions = [logsToServer]; //저장x,저장하기,이어하기,navigate뒤로가기 추가해야함

function LogView({route}: any) {
  const path = useSelector((state: RootState) => state.myPosition.path);
  const isOver = route.params.isOver;
  const dogsInfo: dogInfo[] = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  const selectedDogs: number[] = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  // const;
  // dogs type import해와서 지정
  const dogs: dogInfo[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });

  //img,데이터 전송
  // const submitLogs = async () => {
  //   const registerPost = {
  //     ownerIdx: 4,
  //   walkerIdx: 4,
  //   "distance": 100.00,
  //   "time": 5,
  //   "startDate": "2022.10.26 00:00:00",
  //   "endDate": ""2022.10.26 00:00:00",
  //   "walkedDogList": [1, 2, 3],
  //   "latitudes": [1.1, 2.1],
  //   "longitudes": [2.4, 3.4]
  //   };

  //   try {
  //     const response = await axios.post(`community`, registerPost);
  //     if (response?.status === 200) {
  //       const postIdx = response?.data;
  //       if (images?.length > 0) {
  //         images.map(async (image, idx) => {
  //           await uploadImg(image, `community/file/${postIdx}`);
  //         });
  //       }
  //       Alert.alert('게시글 작성완료!');
  //       navigation.navigate('Community');
  //     }
  //   } catch (err: any) {
  //     Alert.alert('게시글 작성 실패!', err);
  //     setClicked(false);
  //   }
  // };

  return (
    <View>
      <LogViewTemplate
        functions={functions}
        path={path}
        dogInfoList={dogs}
        isOver={isOver}
        myPosition={myPosition}
      />
    </View>
  );
}
export default LogView;
