import React, {useRef, useState} from 'react';
import {Image, Pressable, Text, View, TextInput} from 'react-native';

import {COLORS, FONTS} from './styles';
import {timeParticlesToInt, getTimeParticlesFromInt} from './helpers';

const Digit = React.forwardRef((
    {
      validChars = [],
      value = '0',
      onChange = (text) => {},
      onInvalidChange = (text) => {},
    }, 
    ref,
  ) => {
    const [hasFocus, setFocus] = useState(false);

    return (
      <View>
        <Pressable
          onPress={() => ref && ref.current && ref.current.focus()}
          style={{flex: 0}}
        >
          <Text
            style={[
              FONTS.HEADING3,
              {
                width: 30,
                height: 36,
                padding: 5,
                lineHeight: 26,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: hasFocus ? `${COLORS.ACTIVE_BLUE}80` : null,
              },
            ]}
          >
            {value}
          </Text>

          <TextInput
            style={{width: 0, height: 0, padding: 0, margin: 0, opacity: 0}}
            ref={ref}
            keyboardType='number-pad'
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onTextInput={(event) => {
              const text = event.nativeEvent.text;
              if (validChars.includes(text)) {
                onChange(text);
              } else {
                onInvalidChange(text);
              }
            }}
            maxLength={1}
            value={""}
          />
        </Pressable>
      </View>
    );
  }
);

const Dials = ({
  children,
  style: {marginLeft} = {marginLeft: 0},
  onUpPress = () => {},
  onDownPress = () => {},
}) => (
  <View
    style={{
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Pressable style={{marginLeft, marginBottom: 10, padding: 10}} onPress={onUpPress}>
      <Text>▲</Text>
    </Pressable>

    {children}

    <Pressable style={{marginLeft, marginTop: 10, padding: 10}} onPress={onDownPress}>
      <Text>▼</Text>
    </Pressable>
  </View>
);

export default ({
  style: {marginBottom} = {marginBottom: 0},
  value,
  onChange,
}) => {
  const [meridiemFocused, setMeridiemFocus] = useState(false);

  const hourTensRef = useRef(null);
  const hourOnesRef = useRef(null);
  const minuteTensRef = useRef(null);
  const minuteOnesRef = useRef(null);
  const meridiemRef = useRef(null);

  const onHoursDialUpPress = () => {
    const hour = parseInt(`${hourTens}${hourOnes}`);
    const nextHour = (hour % 12) + 1;
    setHour(nextHour);
  };

  const onHoursDialDownPress = () => {
    const hour = parseInt(`${hourTens}${hourOnes}`);
    const prevHour = ((hour + 10) % 12) + 1;
    setHour(prevHour);
  };

  const onMinutesDialUpPress = () => {
    const minute = parseInt(`${minuteTens}${minuteOnes}`);
    const nextMinute = (minute + 1) % 60;
    setMinute(nextMinute);
  };

  const onMinutesDialDownPress = () => {
    const minute = parseInt(`${minuteTens}${minuteOnes}`);
    const prevMinute = (minute + 59) % 60;
    setMinute(prevMinute);
  };

  const toggleMeridiem = () => {
    setMeridiem(meridiem === 'AM' ? 'PM' : 'AM');
  }

  const {
    hourTens,
    hourOnes,
    minuteTens,
    minuteOnes,
    meridiem,
  } = getTimeParticlesFromInt(value);

  const setHourTens = (hourTensStr) => {
    const hourTens = parseInt(hourTensStr);
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  const setHourOnes = (hourOnesStr) => {
    const hourOnes = parseInt(hourOnesStr);
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  const setHour = (hour) => {
    const hourTens = Math.floor(hour / 10);
    const hourOnes = hour % 10;
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  const setMinuteTens = (minuteTensStr) => {
    const minuteTens = parseInt(minuteTensStr);
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  const setMinuteOnes = (minuteOnesStr) => {
    const minuteOnes = parseInt(minuteOnesStr);
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  const setMinute = (minute) => {
    const minuteTens = Math.floor(minute / 10);
    const minuteOnes = minute % 10;
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  const setMeridiem = (meridiem) => {
    const timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom,
      }}
    >
      <Dials
        onUpPress={onHoursDialUpPress}
        onDownPress={onHoursDialDownPress}
      >
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Digit
            ref={hourTensRef}
            validChars={['0','1']}
            value={hourTens}
            onChange={text => {
              const hourOnesInt = parseInt(hourOnes);

              if (text === '0' && hourOnes === '0') {
                setHour(1);
              }
              else if (text === '1' && hourOnesInt > 2) {
                setHour(10);
              } else {
                setHourTens(text);
              }

              hourOnesRef.current.focus();
            }}
          />

          <Digit
            ref={hourOnesRef}
            validChars={hourTens === 0 ? ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'] : ['0', '1', '2']}
            value={hourOnes}
            onChange={text => {
              if (text === '0' && hourTens === '0') {
                setHour(10);
              } else {
                setHourOnes(text);
              }
              minuteTensRef.current.focus();
            }}
          />
        </View>
      </Dials>

      <Text style={[FONTS.HEADING3, {height: 20, lineHeight: 20, textAlignVertical: 'center'}]}>:</Text>

      <Dials
        onUpPress={onMinutesDialUpPress}
        onDownPress={onMinutesDialDownPress}      
      >
        <View style={{flexDirection: 'row'}}>
          <Digit
            ref={minuteTensRef}
            validChars={['0','1', '2', '3', '4', '5']}
            value={minuteTens}
            onChange={text => {
              setMinuteTens(text);
              minuteOnesRef.current.focus();
            }}
          />

          <Digit
            ref={minuteOnesRef}
            validChars={['0','1', '2', '3', '4', '5', '6', '7', '8', '9']}
            value={minuteOnes}
            onChange={text => {
              setMinuteOnes(text);
              meridiemRef.current.focus();
            }}
          />
        </View>
      </Dials>

      <Dials
        style={{marginLeft: 10}}
        onUpPress={toggleMeridiem}
        onDownPress={toggleMeridiem}
      >
        <View style={{flexDirection: 'row'}}>
          <View>
            <Pressable
              onPress={() => meridiemRef && meridiemRef.current && meridiemRef.current.focus()}
            >
              <Text
                style={[
                  FONTS.HEADING3,
                  {
                    width: 60,
                    height: 36,
                    padding: 5,
                    marginLeft: 10,
                    lineHeight: 26,
                    textAlign: 'center',
                    textAlignVertical: 'center',    
                    backgroundColor: meridiemFocused ? `${COLORS.ACTIVE_BLUE}80` : null,
                  }
                ]}
              >
                {meridiem}
              </Text>

              <TextInput
                style={{width: 0, height: 0, padding: 0, margin: 0, opacity: 0}}
                ref={meridiemRef}
                keyboardType='default'
                onBlur={() => setMeridiemFocus(false)}
                onFocus={() => setMeridiemFocus(true)}
                onTextInput={(event) => {
                  const text = event.nativeEvent.text;
                  if (['a', 'A'].includes(text)) {
                    setMeridiem('AM');
                  }
                  else if (['p', 'P'].includes(text)) {
                    setMeridiem('PM');
                  }
                }}
                maxLength={1}
                value={""}
              />
            </Pressable>
          </View>
        </View>
      </Dials>
    </View>
  );
}