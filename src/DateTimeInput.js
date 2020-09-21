import React, {useState} from 'react';
import {Modal, Pressable, Text, View, SafeAreaView, ScrollView} from 'react-native';
import moment from 'moment';

import {FONTS, COLORS} from './styles';
import {formatTimeFromInt} from './helpers';
import BackButtonHeader from './BackButtonHeader';
import Button from './Button';
import DateSelector from './DateSelector';
import HorizontalLine from './HorizontalLine';
import TimeSelector from './TimeSelector';

export default ({
  style: {marginBottom} = {marginBottom: 0},
  label = "",
  value,
  hasError = false,
  onActive = () => {},
  onChange,
}) => {
  const [isActive, setActive] = useState(false);

  const timestampStr = moment(value).startOf('day').format('x');
  const dateValue = parseInt(timestampStr);
  const timeValue = value - dateValue;

  return (
    <View>
      <Text
        style={[
          FONTS.HEADING4,
          {
            marginBottom: 10,
            color: COLORS.BLACK,
          }
        ]}
      >
        {label}
      </Text>

      <Pressable
        style={{
          flexDirection: 'row',
          height: 50,
          marginBottom,
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          textAlignVertical: 'center',
          borderRadius: 4,
          borderColor: hasError ? COLORS.ERROR_RED : COLORS.BLACK,
          borderWidth: 1,
        }}
        onPress={() => {
          onActive();
          setActive(true);
        }}
      >
        <Text style={[FONTS.PARAGRAPH, {color: COLORS.BLACK}]}>{formatTimeFromInt(timeValue)}</Text>
        <Text
          style={[
            FONTS.PARAGRAPH,
            {
              flex: 1,
              marginRight: 'auto',
              marginLeft: 0,
              textAlign: 'right',
              color: COLORS.BLACK,
            }
          ]}>
          {moment(dateValue).format('Do MMMM, YYYY')}
        </Text>
      </Pressable>

      <Modal
        visible={isActive}
      >
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={{margin: 20, marginBottom: 100}}>
              <BackButtonHeader onClick={() => setActive(false)}/>

              <Text
                style={[
                  FONTS.HEADING4,
                  {
                    marginTop: 25,
                    marginBottom: 50,
                    textAlign: 'center',
                    color: COLORS.BLACK,
                  }
                ]}
              >
                {label}
              </Text>

              <TimeSelector
                style={{marginBottom: 50}}
                value={timeValue}
                onChange={timeValue => onChange(dateValue + timeValue)}
              />

              <HorizontalLine/>

              <DateSelector
                style={{marginBottom: 50}}
                value={dateValue}
                onChange={dateValue => onChange(dateValue + timeValue)}
              />

              <Button onClick={() => setActive(false)}>
                Done
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};