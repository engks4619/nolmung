import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {MAIN_COLOR} from '~/const';
import {dogInfo} from './MainDogs';
import SelectingDog from '@molecules/SelectingDog';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedMyDogs} from '~/slices/dogsSlice';
import {RootState} from '~/store/reducer';
import {Alert} from 'react-native';

interface Props {
  myDogs: dogInfo[] | undefined;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectingDogs({myDogs, setIsSelecting}: Props) {
  const selectedMyDogs = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const [selectedDogs, setSelectedDogs] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDogs(selectedMyDogs);
  }, [selectedMyDogs]);

  const handleSelectedDogs = (dogId: number) => {
    if (selectedDogs.includes(dogId)) {
      setSelectedDogs(selectedDogs.filter(dog => dog !== dogId));
    } else {
      setSelectedDogs([...selectedDogs, dogId]);
    }
  };

  const handelDone = () => {
    if (myDogs) {
      setIsSelecting(false);
      if (selectedDogs.length === 0) {
        Alert.alert('알림', '최소 한마리 이상의 반려견을 선택해주세요.');
        return;
      }
      const sortedDogs = selectedDogs.sort((a, b) => a - b);
      dispatch(setSelectedMyDogs(sortedDogs));
    }
  };

  return (
    <View style={styles.container}>
      {myDogs?.map(dog => (
        <SelectingDog
          dog={dog}
          key={dog.dogIdx}
          isSelected={selectedDogs.includes(dog.dogIdx)}
          handleSelectedDogs={handleSelectedDogs}
        />
      ))}
      <Pressable onPress={() => handelDone()}>
        <View style={styles.doneContainer}>
          <Text style={styles.doneText}>완료</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(188, 94, 0, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  profileContainer: {
    marginHorizontal: 2,
  },
  doneContainer: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  doneText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: MAIN_COLOR,
  },
});

export default SelectingDogs;
