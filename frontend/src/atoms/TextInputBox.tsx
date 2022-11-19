import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  borderColor: string;
}

const TextInputBox = ({content, setContent, borderColor}: Props) => {
  return (
    <View style={[styles.container, {borderColor}]}>
      <TextInput
        multiline={true}
        numberOfLines={8}
        style={styles.textInput}
        value={content}
        onChangeText={text => setContent(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 250,
  },
  textInput: {
    paddingHorizontal: 20,
  },
});

export default TextInputBox;
