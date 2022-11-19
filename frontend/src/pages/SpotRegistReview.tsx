import React, {useEffect, useState} from 'react';
import CustomHeader from '~/headers/CustomHeader';
import SpotRegistReviewTemplate from '~/templates/SpotRegistReviewTemplate';
import axios from 'utils/axios';
import {Alert} from 'react-native';
import {cos} from 'react-native-reanimated';
import {uploadImg} from '~/utils/imgService';

const SpotRegistReview = ({route, navigation}: any) => {
  const spotId: string = route.params.spotId;
  const spotName: string = route.params.spotName;
  const [content, setContent] = useState<string>('');
  const [star, setStar] = useState<number>(0);
  const [images, setImages] = useState<any[]>([]);

  const validateInput = () => {
    console.log(content);
    if (!spotId || !content || content.trim() === '') {
      Alert.alert('입력을 완료해주세요!');
      return;
    }
    registReview();
  };

  const successFunc = () => {
    Alert.alert('리뷰 작성 완료!');
    navigation.replace('SpotDetail', {spotId});
  };

  const failFunc = () => {
    Alert.alert('리뷰 작성 실패!');
  };

  const registReview = async () => {
    const requestBody = {
      spotId,
      content: content.trim(),
      star,
    };
    try {
      const response = await axios.post(`spot/spot-review`, requestBody);
      if (response?.status === 200) {
        const reviewIdx = response.data;
        images.map(async image => {
          await uploadImg(
            image,
            `spot/spot-review/file/${reviewIdx}`,
            undefined,
            undefined,
            successFunc,
            failFunc,
          );
        });
      } else {
        Alert.alert('리뷰 작성 실패!');
      }
    } catch (err) {
      Alert.alert('리뷰 작성 실패!');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          navigation={navigation}
          middleText="리뷰쓰기"
          endText="등록"
          endFunc={validateInput}
        />
      ),
    });
  }, [navigation, content, star]);

  return (
    <SpotRegistReviewTemplate
      spotId={spotId}
      spotName={spotName}
      content={content}
      setContent={setContent}
      star={star}
      setStar={setStar}
      images={images}
      setImages={setImages}
    />
  );
};

export default SpotRegistReview;
