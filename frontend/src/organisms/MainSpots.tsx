import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import MainSpot from '@molecules/MainSpot';
import Carousel from '@organisms/Carousel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '~/../AppInner';

const screenWidth = Math.round(Dimensions.get('window').width);
type mainScreenProp = NativeStackNavigationProp<LoggedInParamList, 'Main'>;

interface Props {
  spots: any[];
}

function MainSpots({spots}: Props) {
  const [page, setPage] = useState(0);
  const navigation = useNavigation<mainScreenProp>();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>주변 애완 동반 스팟</Text>
        <Text onPress={() => navigation.navigate('Spots')}>전체보기</Text>
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
  container: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
});

export default MainSpots;
