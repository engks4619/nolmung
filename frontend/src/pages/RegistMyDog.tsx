import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import RegistMyDogTemplate from '~/templates/RegistMyDogTemplate';
import axios from '~/utils/axios';
import {uploadImg} from '~/utils/imgService';
import {dogRequestBody} from '~/utils/type';

const RegistMyDog = ({navigation}: any) => {
  const [image, setImage] = useState<any>();
  const [requestBody, setRequestBody] = useState<dogRequestBody>({
    dogName: '',
    neuter: null,
    vaccination: null,
    gender: null,
    description: '',
    breedCode: -1,
  });
  const [desc, setDesc] = useState<string>('');

  const registSuccess = () => {
    Alert.alert('등록 완료!');
    navigation.replace('MyDogs');
  };

  const imgUploadFail = () => {
    Alert.alert('이미지 업로드 실패!');
  };

  const registSubmit = async () => {
    if (
      !requestBody.dogName ||
      !requestBody.neuter ||
      !requestBody.vaccination ||
      !requestBody.gender ||
      requestBody.breedCode === -1
    ) {
      Alert.alert('입력을 완료해주세요!');
      return;
    }
    await axios
      .post(`user/dog`, requestBody)
      .then(async response => {
        if (response.status === 200) {
          const dogIdx = response.data.dogIdx;
          if (image) {
            await uploadImg(
              image,
              `user/dog/image`,
              'dogIdx',
              dogIdx,
              registSuccess,
              imgUploadFail,
            );
          } else {
            registSuccess();
          }
        } else {
          Alert.alert('강아지 등록 실패!');
        }
      })
      .catch(err => Alert.alert('강아지 등록 실패!', err));
  };

  useEffect(() => {
    setRequestBody({...requestBody, description: desc});
  }, [desc]);

  return (
    <View>
      <RegistMyDogTemplate
        navigation={navigation}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        image={image}
        setImage={setImage}
        desc={desc}
        setDesc={setDesc}
        registSubmit={registSubmit}
      />
    </View>
  );
};

export default RegistMyDog;
