import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import Back from '@assets/back.svg';

function CommDetailHeader({navigation, category}: any) {
  return (
    <View style={styles.marginContainer}>
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            navigation.navigate('CommunityList', {
              screen: 'Community',
            })
          }>
          <Back width={20} height={20} fill={'black'} />
        </Pressable>
        <Text style={styles.title}>
          {category === 'WITH' ? '함께가요' : '돌봐줘요'}
        </Text>
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marginContainer: {
    marginVertical: 1,
  },
  container: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
});

export default CommDetailHeader;
