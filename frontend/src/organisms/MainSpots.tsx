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
        <Text
          style={styles.naviTextContainer}
          onPress={() => navigation.navigate('Spots')}>
          전체보기
        </Text>
      </View>
      <Carousel
        page={page}
        setPage={setPage}
        gap={15}
        offset={15}
        data={spots}
        pageWidth={screenWidth - (15 + 15) * 2}
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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  textContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 35,
  },
  naviTextContainer: {
    fontSize: 12,
  },
});

export default MainSpots;
