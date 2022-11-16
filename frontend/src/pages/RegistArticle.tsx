import axios from 'utils/axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import RegistHeader from '~/organisms/RegistHeader';
import RegistArticleTemplate from '~/templates/RegistArticleTemplate';
import {uploadImg} from '~/utils/imgService';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {dog} from '~/utils/type';

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
  const [clicked, setClicked] = useState<boolean>(false);
  const [DOG_DATA, setDogData] = useState<
    {label: string; value: number}[] | null
  >(null);
  const dogList = useSelector((state: RootState) => state.dogs.dogsInfo);

  const CATEGORY_TYPES = ['함께가요', '돌봐줘요'];

  const registSubmit = async () => {
    const registerPost = {
      dogIdx: selectedDog,
      categoryType: category === '함께가요' ? 'WITH' : 'OTHER',
      subject: subject.trim(),
      content: content.trim(),
      location,
      pay: price,
      leadLine: rope,
      poopBag: poop,
      walkDate: date,
    };

    try {
      const response = await axios.post(`community`, registerPost);
      if (response?.status === 200) {
        const postIdx = response?.data;
        if (images?.length > 0) {
          images.map(async (image, idx) => {
            await uploadImg(image, `community/file/${postIdx}`);
          });
        }
        Alert.alert('게시글 작성완료!');
        navigation.navigate('Community');
      }
    } catch (err: any) {
      Alert.alert('게시글 작성 실패!', err);
      setClicked(false);
    }
  };

  const validateVal = () => {
    if (
      category === '' ||
      !subject ||
      selectedDog.length === 0 ||
      !date ||
      !location ||
      !content
    ) {
      Alert.alert('입력을 완료해주세요!');
      setClicked(false);
      return; // 검증 실패
    }
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

  useEffect(() => {
    setDogData(
      dogList.map((dog: any) => ({label: dog.dogName, value: dog.dogIdx})),
    );
  }, [dogList]);

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
