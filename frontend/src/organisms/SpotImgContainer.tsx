import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import SpotImg from '@molecules/SpotImg';
import Carousel from '@organisms/Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const offset = 15;
const gap = 15;
const pageWidth = screenWidth - (15 + 15) * 2;

interface Props {
  spotId: string;
  imgCnt: number;
}

const SPOT_IMG_URL_PREFIX = '/images/spot/';

const SpotImgContainer = ({spotId, imgCnt}: Props) => {
  const [page, setPage] = useState<number>(0);
  const [imgList, setImgList] = useState<string[]>([]);

  const initImgData = (spotId: string, imgCnt: number) => {
    if (!spotId || spotId === '' || !imgCnt || imgCnt === 0) {
      setImgList([]);
      return;
    }
    const list = [];
    let i = 0;
    for (i = 0; i < imgCnt; i++) {
      list.push(SPOT_IMG_URL_PREFIX + spotId + '/' + i + '.jpg');
    }
    // 이미지 갯수 2 이하인 경우 검은색 사진으로 3개 채우기
    while (imgCnt <= 2 && i++ < 3) {
      list.push(SPOT_IMG_URL_PREFIX + '/black.jpg');
    }
    setImgList(list);
  };

  useEffect(() => {
    initImgData(spotId, imgCnt);
  }, [spotId, imgCnt]);

  return (
    <View>
      <Carousel
        page={page}
        setPage={setPage}
        gap={0}
        offset={0}
        data={imgList}
        pageWidth={screenWidth - (15 + 15) * 2}
        RenderItem={SpotImg}
      />
    </View>
  );
};

export default SpotImgContainer;
