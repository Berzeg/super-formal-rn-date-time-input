import React, {useRef} from 'react';
import {Animated, Pressable, Text} from 'react-native';

import {COLORS, FONTS} from './styles';
import {get as objectGet} from './helpers';

export default ({
  children,
  style,
  onClick = () => {},
}) => {
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const marginBottom = objectGet(style, ['marginBottom'], 0);
  const color = objectGet(style, ['color'], COLORS.BLACK);
  const borderColor = objectGet(style, ['borderColor'], COLORS.BLACK);

  const onPressInternal = () => {
    Animated.timing(
      buttonOpacity,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();

    onClick();
  };

  return (
    <Pressable
      style={{marginBottom}}
      onPressIn={() => {
        buttonOpacity.setValue(0.5)
      }}
      onPress={onPressInternal}
    >
      <Animated.View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor,
          borderRadius: 4,
          textAlignVertical: 'center',
          opacity: buttonOpacity,
        }}
      >
        <Text
          style={[
            FONTS.HEADING4,
            {
              height: 16,
              lineHeight: 16,
              color,
            }
          ]}
        >
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
};