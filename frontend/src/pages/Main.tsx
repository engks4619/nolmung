import React from 'react';
import {View} from 'react-native';
import MainTemplate from '../templates/MainTemplate';

const dummyData = [
  {
    id: 0,
    name: '맴모스커피1',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
  {
    id: 2,
    name: '바나프레소2가 기;ㄹ어지면2',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
  {
    id: 3,
    name: '바나프레소3',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
  {
    id: 4,
    name: '스타벅스4',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
  {
    id: 5,
    name: '스타벅스5',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
  {
    id: 6,
    name: '스타벅스6',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
  {
    id: 7,
    name: '스타벅스7',
    imagePath:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMjZfMTE0/MDAxNTE2ODkzNjEyNDI1.hoW9bal9v7j5y6fs_e_7okWVIMsQRFNLQm46QX_YPMwg.hhKYn_qKTjHZkh1id0x4FWVLar6PHgaro5xMPc3p9BAg.JPEG.iolove25/%EC%97%BD%EB%96%A1_%EC%B0%A9%ED%95%9C%EB%A7%9B.jpg?type=w2',
    distance: 3,
    category: '카페',
  },
];

function Main() {
  return (
    <View>
      <MainTemplate spots={dummyData} />
    </View>
  );
}

export default Main;
