import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Back from '@assets/back.svg';
import {BORDER_COLOR, MAIN_COLOR} from '~/const';

interface Props {
  navigation: any;
  onBtnClicked: () => void;
  opponent: string;
}

const WalkReviewHeader = ({navigation, onBtnClicked, opponent}: Props) => {
  return (
    <View style={styles.hContainer}>
      <View style={styles.goBackBtn}>
        <Pressable onPress={() => navigation.goBack()}>
          <Back width={20} height={20} fill={'black'} />
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>{opponent}</Text>
      </View>
      <View style={styles.registBtn}>
        <Pressable onPress={onBtnClicked}>
          <Text style={styles.brown}>등록</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
    paddingVertical: 5,
  },
  goBackBtn: {
    paddingHorizontal: 20,
  },
  registBtn: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  brown: {
    fontSize: 11,
    color: MAIN_COLOR,
    fontWeight: '700',
  },
});

export default WalkReviewHeader;
