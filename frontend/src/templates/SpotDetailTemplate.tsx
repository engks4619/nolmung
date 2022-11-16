import React from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import SpotImgContainer from '~/organisms/SpotImgContainer';
import {spot} from '~/utils/type';

interface Props {
  spot: spot;
}

const SpotDetailTemplate = ({spot}: Props) => {
  return (<View>
    <SpotImgContainer />
  </View>);
};

export default SpotDetailTemplate;
