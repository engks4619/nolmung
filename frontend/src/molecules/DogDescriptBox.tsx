import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {dogInfo} from '@pages/MyDogs';
import Femenine from '@assets/femenine.svg';
import Mars from '@assets/mars.svg';
interface Props {
  myDog: dogInfo;
}

function DogDescriptBox({myDog}: Props) {
  return (
    <View style={styles.DogDescriptBox}>
      <View style={styles.lineOne}>
        <View style={styles.cols}>
          <Text style={styles.textSmall}>견종</Text>
          <Text style={styles.textMedium}>{myDog.breedCodeValue}</Text>
        </View>
        <View style={styles.cols}>
          <Text style={styles.textSmall}>성별</Text>
          {myDog.gender === 'M' ? (
            <Mars width={8} height={8} fill={'black'} stroke={'black'} />
          ) : (
            <Femenine width={8} height={8} fill={'black'} stroke={'black'} />
          )}
        </View>
      </View>
      <View style={styles.lineTwo}>
        <View style={styles.cols}>
          <Text style={styles.textSmall}>중성화</Text>
          <Text style={styles.textMedium}>{myDog.neuter ? 'O' : 'X'}</Text>
        </View>
        <View style={styles.cols}>
          <Text style={styles.textSmall}>예방접종</Text>
          <Text style={styles.textMedium}>{myDog.vaccination ? 'O' : 'X'}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  DogDescriptBox: {
    backgroundColor: '#F3EDED',
    height: '60%',
    width: '90%',
    borderRadius: 10,
    marginTop: 5,
  },
  lineOne: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  lineTwo: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  cols: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textSmall: {
    fontSize: 8,
    color: 'black',
  },
  textMedium: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default DogDescriptBox;
