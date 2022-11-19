import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {dogInfo} from '@pages/MyDogs';
import Profile from '@atoms/Profile';
import DogDescriptBox from '@molecules/DogDescriptBox';
interface Props {
  myDog: dogInfo;
  isEdit: boolean;
  deleteDog: () => void;
}
function MyDog({myDog, isEdit, deleteDog}: Props) {
  const defaultDogImage = '/images/spot/default/default.png';
  return (
    <View style={styles.myDogContainer}>
      {/* <Text>{myDog?.breedCodeValue}</Text>
      <Text>{myDog?.dogIdx}</Text>
      <Text>{myDog?.dogName}</Text>
      <Text>{myDog?.gender}</Text>
      <Text>{myDog?.image}</Text>
      <Text>{myDog?.neuter}</Text>
      <Text>{myDog?.vaccination}</Text> */}
      <View style={styles.profileContianer}>
        <Profile imageSource={myDog.image ? myDog.image : defaultDogImage} />
      </View>
      <View style={styles.descriptConainer}>
        <Text style={styles.dogName}>{myDog.dogName}</Text>
        <DogDescriptBox myDog={myDog} />
      </View>
      {isEdit ? (
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            deleteDog();
          }}>
          <Text>X</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  myDogContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
    borderWidth: 2,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.85,
    height: 110,
    margin: 10,
  },
  profileContianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptConainer: {flex: 2, justifyContent: 'center'},
  dogName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    // marginBott
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 2,
  },
});
export default MyDog;
