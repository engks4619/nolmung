import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import MainSpot from '../molecules/MainSpot';
import Carousel from './Carousel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '~/App';

const screenWidth = Math.round(Dimensions.get('window').width);
type mainScreenProp = NativeStackNavigationProp<LoggedInParamList, 'Main'>;

interface Props {
  spots: any[];
}

function MainSpots({spots}: Props) {
  const [page, setPage] = useState(0);
  const navigation = useNavigation<mainScreenProp>();

  return (
    <View>
      <View style={styles.textContainer}>
        <Text>주변 애완 동반 스팟</Text>
        <Text onPress={() => navigation.navigate('커뮤니티')}>전체보기</Text>
      </View>
      <Carousel
        page={page}
        setPage={setPage}
        gap={10}
        offset={36}
        data={spots}
        pageWidth={screenWidth - (10 + 36) * 2}
        RenderItem={MainSpot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
});

export default MainSpots;
