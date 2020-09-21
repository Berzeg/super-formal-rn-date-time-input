import React from 'react';
import {View} from 'react-native';

export default ({marginBottom = 25, borderColor = 'black'}) => (
  <View style={{
    marginBottom,
    borderWidth: 1.5,
    borderRadius: 1.5,
    borderColor,
    backgroundColor: borderColor,
  }}/>
);
