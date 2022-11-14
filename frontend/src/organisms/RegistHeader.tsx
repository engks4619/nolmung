import React, {Dispatch} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MAIN_COLOR} from '~/const';
import Back from '@assets/back.svg';

interface Props {
  navigation: any;
  onRegistClicked: () => void;
}

const RegistHeader = ({navigation, onRegistClicked}: Props) => {
  return (
    <View style={styles.hContainer}>
      <View style={styles.goBackBtn}>
        <Pressable onPress={() => navigation.goBack()}>
          <Back width={20} height={20} fill={'black'} />
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>게시글 작성</Text>
      </View>
      <View style={styles.registBtn}>
        <Pressable onPress={onRegistClicked}>
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
    borderBottomColor: '#A0A0A0',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 12,
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
    fontSize: 10,
    color: MAIN_COLOR,
    fontWeight: '700',
  },
});

export default RegistHeader;
