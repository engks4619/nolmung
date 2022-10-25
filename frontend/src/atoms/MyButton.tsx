import React, {FC} from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import {MAIN_COLOR} from '~/const';

interface Props {
  btnText: string;
  horizontalSize?: number;
  fontWeight: string;
  fontSize: number;
  onClick: Function;
}

const MyButton: FC = ({
  btnText,
  horizontalSize = 80,
  fontWeight = '600',
  fontSize = 15,
  onClick,
}: Props) => {
  return (
    <View>
      <Pressable
        style={[
          styles.container,
          {
            paddingHorizontal: horizontalSize,
          },
        ]}
        onPress={onClick}>
        <Text
          style={[
            styles.fontStyle,
            {
              fontWeight,
              fontSize,
            },
          ]}>
          {btnText}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: MAIN_COLOR,
    borderRadius: 10,
  },
  fontStyle: {
    color: 'white',
  },
});

export default MyButton;
