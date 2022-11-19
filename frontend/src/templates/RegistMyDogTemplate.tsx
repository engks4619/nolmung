import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Plus from '@assets/plus.svg';
import {FONT_SIZE_L} from '~/const';

const screenHeight = Dimensions.get('window').height;

const RegistMyDogTemplate = ({navigation}: any) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>강아지 등록</Text>
        </View>
        <View style={styles.imgAddBtnContainer}>
          <View style={styles.imgAddBtn}>
            <TouchableOpacity onPress={() => {}}>
              <Plus width={30} height={30} fill={'white'} />
            </TouchableOpacity>
          </View>
          <Text>프로필 사진 등록</Text>
        </View>
        <View>
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: screenHeight,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  title: {
    textAlign: 'left',
    fontSize: FONT_SIZE_L,
    fontWeight: 'bold',
    color: 'black',
  },
  imgAddBtnContainer: {
    paddingVertical: 20,
  },
  imgAddBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(160,160,160,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default RegistMyDogTemplate;
