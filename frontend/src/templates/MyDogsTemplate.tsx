import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {dogInfo} from '@pages/MyDogs';
import MyDog from '@organisms/MyDog';
import {MAIN_COLOR} from '~/const';
import MyButton from '~/atoms/MyButton';
interface Props {
  myDogs: dogInfo[] | undefined;
  navigation: any;
  deleteDog: (idx: number) => void;
}
function MyDogsTemplate({myDogs, navigation, deleteDog}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <View style={styles.myDogsPageContainer}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={styles.myDogsHeader}>
          <Text style={styles.title}>내 강아지</Text>
          <Pressable
            onPress={() => {
              setIsEdit(!isEdit);
            }}>
            <Text style={styles.endFunc}>추가/삭제</Text>
          </Pressable>
        </View>
        {myDogs?.length ? (
          <View>
            {myDogs.map(myDog => (
              <MyDog
                key={myDog.dogIdx}
                myDog={myDog}
                isEdit={isEdit}
                deleteDog={() => {
                  deleteDog(myDog.dogIdx);
                }}
              />
            ))}
          </View>
        ) : (
          <Text>내 강아지 추가해주세요!</Text>
        )}
        <View style={styles.btnContainer}>
          <MyButton
            btnText={'강아지 추가'}
            width={Dimensions.get('window').width * 0.65}
            onClick={() => {
              navigation.navigate('RegistMyDog');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  myDogsPageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  myDogsHeader: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    height: 30,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  endFunc: {
    color: MAIN_COLOR,
    fontSize: 10,
    paddingRight: 5,
  },
  btnContainer: {
    paddingVertical: 20,
  },
});
export default MyDogsTemplate;
