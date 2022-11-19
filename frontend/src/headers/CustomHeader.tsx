import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import Back from '@assets/back.svg';
import {MAIN_COLOR} from '~/const';

interface Props {
  backFunc?: () => void;
  navigation: any;
  middleText: string;
  endText?: string;
  endFunc?: () => void;
}

function CustomHeader({
  backFunc,
  navigation,
  middleText,
  endText,
  endFunc,
}: Props) {
  return (
    <View style={styles.hContainer}>
      <View style={styles.goBackBtn}>
        <Pressable
          onPress={backFunc ? () => backFunc() : () => navigation.goBack()}>
          <Back width={20} height={20} fill={'black'} />
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>{middleText}</Text>
      </View>
      <View style={styles.registBtn}>
        {endText ? (
          <Pressable onPress={endFunc}>
            <Text style={styles.brown}>{endText}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

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

export default CustomHeader;
