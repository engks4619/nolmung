import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  borderColor: string;
}

const TextInutBox = ({content, setContent, borderColor}: Props) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderColor,
        borderRadius: 5,
        minHeight: 250,
      }}>
      <TextInput
        multiline={true}
        numberOfLines={8}
        style={{paddingHorizontal: 20}}
        value={content}
        onChangeText={text => setContent(text)}
      />
    </View>
  );
};

export default TextInutBox;
