import {Axios, AxiosResponse} from 'axios';
import axios from 'axios';
// import axios from '~/utils/axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import RegistHeader from '~/organisms/RegistHeader';
import {RootState} from '~/store/reducer';
import RegistArticleTemplate from '~/templates/RegistArticleTemplate';
// import FormData from 'form-data';
import {stringify} from 'query-string';
import {Buffer} from 'buffer';

const RegistArticle = ({navigation}: any) => {
  const [category, setCategory] = useState<string>('');
  const [dog, setDog] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [rope, setRope] = useState<boolean>(true);
  const [poop, setPoop] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<string>('');
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [placeModalOpen, setPlaceModalOpen] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<number | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [selectedDog, setSelectedDog] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.user.accessToken);
  const [clicked, setClicked] = useState<boolean>(false);

  const CATEGORY_TYPES = ['함께가요', '돌봐줘요'];

  const DOG_DATA = [
    {label: '뽀삐', value: 1},
    {label: '초코', value: 2},
    {label: '강아지1', value: 3},
    {label: '강아지2', value: 4},
    {label: '강아지3', value: 5},
    {label: '강아지4', value: 6},
  ];

  const registSubmit = async () => {
    // const registerPost = {
    //   dogIdx: selectedDog,
    //   categoryType: category === '함께가요' ? 'WITH' : 'OTHER',
    //   subject: subject.trim(),
    //   content: content.trim(),
    //   location,
    //   pay: price,
    //   leadLine: rope,
    //   poopBag: poop,
    //   walkDate: date,
    // };
    const registerPost = {
      dogIdx: [4],
      categoryType: 'OTHER',
      subject: '테스트',
      content: '테스트123',
      location: '서울시 관악구 신림',
      pay: 4000,
      leadLine: 'true',
      poopBag: 'true',
      walkDate: '2022-11-27T19:31:36',
    };
    const json = JSON.stringify(registerPost);
    const blob = new Blob([json], {type: 'application/json'});
    // RNFetchBlob.fetch('POST', `http://nolmung.kr/api/community`, {
    //   Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: `Bearer ${token}`,
    // });
    console.log(blob);
    let formData = new FormData();
    formData.append('registerPost', json);
    const register = formData.getParts(
      item => item.fieldName === 'registerPost',
    );
    console.log(register);
    // formData.append('files', []);
    // console.log('getBuffer!!', formData.getBuffer());
    // formData.getParts().find(item => item.fieldName === 'registerPost');
    // for (let key of formData.keys()) {
    //   console.log("formData:", key, formData.get(key));
    // }
    // formData.append('files', {});
    // formData.append('registerPost', JSON.stringify(registerPost));
    // for ( let i = 0; i < images.length; i++){
    //   formData.append('files', );
    // }
    // console.log('registerPost', registerPost);
    // console.log('json', json);
    // console.log('blob', blob);
    // formData.append('files', {});
    // const response = await fetch('http://nolmung.kr/api/community', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: formData.getBuffer(),
    // })
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err));
    // console.log(response);
    axios({
      url: `http://nolmung.kr/api/community`,
      method: 'POST',
      // responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        return data;
      },
      onUploadProgress: progressEvent => {
        // use upload data, since it's an upload progress
        // iOS: {"isTrusted": false, "lengthComputable": true, "loaded": 123, "total": 98902}
      },
      data: formData,
    });
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // try {
    //   console.log('formData', formData);
    //   // const response = await axios({
    //   //   url: 'community',
    //   //   method: 'POST',
    //   //   // headers: {
    //   //   //   Authorization: `Bearer ${token}`,
    //   //   //   // 'Content-Type': 'multipart/form-data',
    //   //   // },
    //   //   data: formData,
    //   // });
    //   const response: AxiosResponse = await axios.post(`community`, formData, {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       // 'Content-Type': 'application/json',
    //       // Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log('response', response);
    // } catch (error: any) {
    //   console.error(error.response);
    //   console.error(error.response.status);
    //   // Alert.alert('error!', error);
    // }
  };

  // const registSubmit = async () => {};

  const validateVal = () => {
    // if (
    //   category === '' ||
    //   !subject ||
    //   selectedDog.length === 0 ||
    //   !date ||
    //   !location ||
    //   !content
    // ) {
    //   Alert.alert('입력을 완료해주세요!');
    //   setClicked(false);
    //   return; // 검증 실패
    // }
    //axios 요청 보내기
    registSubmit();
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <RegistHeader
          navigation={navigation}
          onRegistClicked={() => setClicked(true)}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!clicked) {
      return;
    }
    validateVal();
  }, [clicked]);

  return (
    <RegistArticleTemplate
      category={category}
      setCategory={setCategory}
      subject={subject}
      setSubject={setSubject}
      dog={dog}
      setDog={setDog}
      rope={rope}
      setRope={setRope}
      poop={poop}
      setPoop={setPoop}
      date={date}
      setDate={setDate}
      dateModalOpen={dateModalOpen}
      setDateModalOpen={setDateModalOpen}
      content={content}
      setContent={setContent}
      placeModalOpen={placeModalOpen}
      setPlaceModalOpen={setPlaceModalOpen}
      imageModalOpen={imageModalOpen}
      setImageModalOpen={setImageModalOpen}
      location={location}
      setLocation={setLocation}
      price={price}
      setPrice={setPrice}
      images={images}
      setImages={setImages}
      selectedDog={selectedDog}
      setSelectedDog={setSelectedDog}
      DOG_DATA={DOG_DATA}
      CATEGORY_TYPES={CATEGORY_TYPES}
    />
  );
};

export default RegistArticle;
