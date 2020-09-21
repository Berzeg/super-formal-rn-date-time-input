import React from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';

import {COLORS, FONTS} from './styles';
import {get as objectGet} from './helpers';

export const backTextStyle = [
  FONTS.NOTES1,
  {
    marginStart: 10,
    color: COLORS.BLACK,
    textAlignVertical: 'bottom',
    height: 14,
    lineHeight: Platform.OS === 'ios' ? 16 : 14,
  }
];

export default ({
  children,
  style,
  onClick = () => {},
}) => {
  const borderBottomWidth = objectGet(style, ['borderBottomWidth'], 0);
  const borderBottomColor = objectGet(style, ['borderBottomColor'], COLORS.BLACK);
  const color = objectGet(style, ['color'], COLORS.BLACK);
  const backgroundColor = objectGet(style, ['backgroundColor'], COLORS.WHITE);

  return (
    <View
      style={{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomWidth,
        borderBottomColor,
        backgroundColor,
      }}
    >
      <Pressable
        style={{
          flex: 0,
          flexDirection: 'row',
          height: 40,
          paddingTop: 25,
          paddingBottom: 25,
          paddingRight: 25,
          alignItems: 'center',
          alignContent: 'center',
        }}
        onPress={onClick}
      >
        <Text style={[backTextStyle, {color}]}>
          {`◀ ${Platform.OS === 'ios' ? 'back' : 'Back'}`}
        </Text>
      </Pressable>

      {children}
    </View>
  );
}