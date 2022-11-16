import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CommunityTabType} from '@templates/CommunityTemplate';
import {MAIN_COLOR} from '~/const';

function CommunityTab({
  navigateWithPg,
  navigateOtherPg,
  categoryType,
}: CommunityTabType) {
  return (
    <View style={styles.tabContainer}>
      <Text
        style={
          categoryType === 'WITH'
            ? [styles.textContainer, styles.textActive]
            : styles.textContainer
        }
        onPress={navigateWithPg}>
        함께 가요
      </Text>
      <Text
        style={
          categoryType === 'OTHER'
            ? [styles.textContainer, styles.textActive]
            : styles.textContainer
        }
        onPress={navigateOtherPg}>
        돌봐줘요
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
    borderBottomColor: 'rgba(0, 0, 0, .5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textActive: {
    color: MAIN_COLOR,
  },
  textContainer: {
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CommunityTab;
