import {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import CustomHeader from '~/headers/CustomHeader';
import {setDogsInfo} from '~/slices/dogsSlice';
import {useAppDispatch} from '~/store';
import RegistMyDogTemplate from '~/templates/RegistMyDogTemplate';
import axios from '~/utils/axios';
import {uploadImg} from '~/utils/imgService';
import {dogRequestBody} from '~/utils/type';

const RegistMyDog = ({navigation}: any) => {
  const dispatch = useAppDispatch();
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
  const [loading, setLoading] = useState<boolean>(false);

  const registSuccess = async () => {
    const response: AxiosResponse = await axios.get('user/dog/mydogs');
    dispatch(setDogsInfo(response.data));
    Alert.alert('등록 완료!');
    navigation.replace('MyDogList');
  };

  const imgUploadFail = () => {
    Alert.alert('이미지 업로드 실패!');
  };

  const registSubmit = async () => {
    if (
      requestBody.dogName.trim() === '' ||
      requestBody.neuter === null ||
      requestBody.vaccination === null ||
      requestBody.gender === null ||
      requestBody.breedCode === -1
    ) {
      Alert.alert('입력을 완료해주세요!');
      return;
    }
    setLoading(true);
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
            )
              .then(() => {})
              .catch(() => Alert.alert('강아지 이미지 업로드 실패!'));
          } else {
            registSuccess();
          }
        } else {
          Alert.alert('강아지 등록 실패!');
        }
      })
      .catch(err => {
        Alert.alert('강아지 등록 실패!', err);
      });
    setLoading(false);
  };

  useEffect(() => {
    setRequestBody({...requestBody, description: desc});
  }, [desc]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader navigation={navigation} middleText={'강아지 등록'} />
      ),
    });
  }, [navigation]);

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
        loading={loading}
      />
    </View>
  );
};

export default RegistMyDog;
