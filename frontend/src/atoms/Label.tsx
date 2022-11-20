import React from 'react';
import {Text} from 'react-native';

interface Props {
  labelText: string;
  fontWeight?: string;
  fontSize?: number;
  marginBottom?: number;
}

function Label({
  labelText,
  fontWeight = 'bold',
  fontSize = 16,
  marginBottom = 20,
}: Props) {
  return <Text style={{fontWeight, fontSize, marginBottom}}>{labelText}</Text>;
}

export default Label;
