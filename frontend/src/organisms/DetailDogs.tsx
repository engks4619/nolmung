import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import DetailDog from '@molecules/DetailDog';
import {DetailDogProps} from '@molecules/DetailDog';

export interface DetailDogsProps {
  dogInfoList: DetailDogProps[];
}

function DetailDogs({dogInfoList}: DetailDogsProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {dogInfoList?.map((dogInfo, idx) => {
          return (
            <DetailDog
              key={idx}
              dogName={dogInfo.dogName}
              breedCodeValue={dogInfo.breedCodeValue}
              image={dogInfo.image}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 90,
  },
});

export default DetailDogs;
