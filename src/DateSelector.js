import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import moment from 'moment';

import {COLORS, FONTS} from './styles';

export default ({
  value = parseInt(moment().format('x')),
  onChange = (selectedDayTimestamp) => {},
  style: {marginBottom} = {marginTop: 0},
}) => {
  const [visibleMonth, setVisibleMonth] = useState(moment().format('MMMM YYYY'));
  const daysInMonth = moment(visibleMonth, 'MMMM YYYY').daysInMonth();
  const firstDayOfMonth = parseInt(moment(`01 ${visibleMonth}`, 'DD MMMM YYYY').format('d'));

  const weeks = [[]];

  for (let dateOverflow = 0; dateOverflow < firstDayOfMonth; dateOverflow++) {
    weeks[0].push(null);
  }

  for (let day = 0; day < daysInMonth; day++) {
    const week = Math.floor((day + firstDayOfMonth) / 7);
    if (weeks.length <= week) {weeks.push([]);}

    const todayFormat = moment().format('DD M YYYY');
    const selectedDayFormat = moment(value).format('DD M YYYY');
    const currentDayFormat = moment(`${day+1} ${visibleMonth}`, 'D MMMM YYYY').format('DD M YYYY');

    const dayObj = {
      value: day + 1,
      isSelected: selectedDayFormat === currentDayFormat,
      isToday: todayFormat === currentDayFormat,
      isSelectable: true,
    };

    weeks[week].push(dayObj);
  }

  const underflowSize = 7 - (daysInMonth + firstDayOfMonth) % 7;
  if (underflowSize !== 7) {
    for (let dateUnderflow = 0; dateUnderflow < underflowSize; dateUnderflow++) {
      weeks[weeks.length - 1].push(null);
    }
  }

  return (
    <View style={{flex: 1, marginBottom}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={{padding: 25}}
          onPress={() => {
            const prevMonth = moment(visibleMonth, 'MMMM YYYY')
              .startOf('month')
              .subtract(1, 'month')
              .format('MMMM YYYY');

            setVisibleMonth(prevMonth);
          }}
          onLongPress={() => {
            if (moment().format('x') < moment(visibleMonth, 'MMMM, YYYY').format('x')) {
              setVisibleMonth(moment().format('MMMM YYYY'));
            }
          }}
        >
          <Text>◀</Text>
        </Pressable>

        <Text style={[FONTS.PARAGRAPH, {flex: 1, textAlign: 'center'}]}>{visibleMonth}</Text>

        <Pressable
          style={{padding: 25}}
          onPress={() => {
            const nextMonth = moment(visibleMonth, 'MMMM YYYY')
              .startOf('month')
              .add(1, 'month')
              .format('MMMM YYYY');

            setVisibleMonth(nextMonth);
          }}
          onLongPress={() => {
            if (moment().format('x') > moment(visibleMonth, 'MMMM, YYYY').format('x')) {
              setVisibleMonth(moment().format('MMMM YYYY'));
            }
          }}
        >
          <Text>▶</Text>
        </Pressable>
      </View>

      <View style={{flexDirection: 'column', marginTop: 20}}>
        <View style={{flexDirection: 'row', flex: 0, justifyContent: 'space-between'}}>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center', color: 'red'}]}>S</Text>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center'}]}>M</Text>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center'}]}>T</Text>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center'}]}>W</Text>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center'}]}>T</Text>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center'}]}>F</Text>
          <Text style={[FONTS.PARAGRAPH, {height: 50, width: 50, marginLeft: 0, marginRight: 0, textAlign: 'center', color: 'red'}]}>S</Text>
        </View>

        {weeks.map((week, index) => (
          <View
            key={`week-${index}`}
            style={{
              flexDirection: 'row',
              flex: 0,
              justifyContent: 'space-between',
            }}
          >
            {week.map((day, dayIndex) => {
              return (
                <Pressable
                  key={`week-${index}-day-${dayIndex}`}
                  style={{
                    flex: 0,
                    width: 50,
                    height: 50,
                    marginLeft: 0,
                    marginRight: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    const selectedDay = moment(`${day.value} ${visibleMonth}`, 'D MMMM YYYY')
                    const selectedDayTimestamp = parseInt(selectedDay.format('x'));
                    onChange(selectedDayTimestamp)
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',  
                      backgroundColor: day && day.isSelected ? COLORS.ACTIVE_BLUE : null,
                    }}
                  >
                    <Text
                      style={[
                        FONTS.PARAGRAPH,
                        {
                          width: 30,
                          height: 30,
                          lineHeight: 30,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          textDecorationLine: day && day.isToday ? 'underline' : 'none',
                        }
                      ]}
                    >
                      {day && day.value}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};