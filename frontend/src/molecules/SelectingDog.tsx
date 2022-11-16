import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';

function SelectingDog({dog, handleSelectedDogs, isSelected}) {
  const handleDogClicked = (dogId: number) => {
    handleSelectedDogs(dogId);
  };

  return (
    <Pressable
      style={styles.profileContainer}
      onPress={() => handleDogClicked(dog.dogIdx)}>
      <View>
        <Image
          style={
            isSelected
              ? [styles.selectedProfile, styles.imageContainer]
              : styles.imageContainer
          }
          source={{
            uri: `http://www.nolmung.kr/api/image${dog.image}`,
          }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    marginHorizontal: 2,
  },
  selectedProfile: {
    borderWidth: 1.5,
    borderColor: 'rgb(159, 75, 0)',
  },
  imageContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});

export default SelectingDog;
