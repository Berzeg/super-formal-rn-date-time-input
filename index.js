'use strict';

var React = require('react');
var reactNative = require('react-native');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var COLORS = {
  BLACK: '#000000',
  ACTIVE_BLUE: '#4798FF',
  ERROR_RED: '#CD2626'
};
var FONTS = {
  HEADING3: {
    fontSize: 22,
    lineHeight: 25
  },
  HEADING4: {
    fontSize: 16
  },
  PARAGRAPH: {
    fontSize: 14
  },
  NOTES1: {
    fontSize: 12,
    lineHeight: 16
  },
  NOTES2: {
    fontSize: 10
  }
};

function get(obj, properties) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var valueSoFar = obj;

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];

    if (valueSoFar && property in valueSoFar) {
      try {
        valueSoFar = valueSoFar[property];
      } catch (error) {
        return defaultValue;
      }
    } else {
      return defaultValue;
    }
  }

  return valueSoFar;
}
/**
 * @param {Integer} hours - a value from 1-12
 * @param {Integer} minutes - a value from 0 - 59
 * @param {String} meridiem - one of 'AM' or 'PM'
 * @return {Integer} - number of milliseconds passed in the day since midnight.
 */

function timeToInt(hours, minutes) {
  var meridiem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'AM';
  var casedMeridiem = meridiem.toUpperCase();
  var seconds = 0;

  if (casedMeridiem === 'PM') {
    seconds = 12 * 3600;
  }

  seconds += hours % 12 * 3600;
  seconds += minutes * 60;
  return seconds * 1000;
}
/**
 * @param {Object} e.g. for "12:32 PM":
 *   {
 *     hourTens: 1,
 *     hourOnes: 2,
 *     minuteTens: 3,
 *     minuteOnes: 2,
 *     meridiem: 'PM',
 *   }
 * @returns {Integer} - millisecond offset since midnight.
 */

function timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes) {
  var meridiem = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'AM';
  var hours = hourTens * 10 + hourOnes;
  var minutes = minuteTens * 10 + minuteOnes;
  return timeToInt(hours, minutes, meridiem);
}
/**
 * @param {Integer} integer - number of milliseconds passed in the day since midnight.
 * @returns {String} a string of the form '09:30 AM'.
 */

function formatTimeFromInt(integer) {
  var _getTimeParticlesFrom = getTimeParticlesFromInt(integer),
      hourTens = _getTimeParticlesFrom.hourTens,
      hourOnes = _getTimeParticlesFrom.hourOnes,
      minuteTens = _getTimeParticlesFrom.minuteTens,
      minuteOnes = _getTimeParticlesFrom.minuteOnes,
      meridiem = _getTimeParticlesFrom.meridiem;

  return "".concat(hourTens).concat(hourOnes, ":").concat(minuteTens).concat(minuteOnes, " ").concat(meridiem);
}
/**
 * @param {Integer} integer - millisecond offset from midnight.
 * @returns {Object} e.g. for "12:32 PM":
 *   {
 *     hourTens: 1,
 *     hourOnes: 2,
 *     minuteTens: 3,
 *     minuteOnes: 2,
 *     meridiem: 'PM',
 *   }
 */

function getTimeParticlesFromInt(integer) {
  var seconds = Math.floor(integer / 1000);
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor(seconds % 3600 / 60);
  var cancelMeridiemHours = hours % 12; // 13 o'clock -> 01 o'clock

  var clockHours = (cancelMeridiemHours + 11) % 12 + 1; // 00 o'clock -> 12 o'clock

  var hourTens = Math.floor(clockHours / 10);
  var hourOnes = clockHours % 10;
  var minuteTens = Math.floor(minutes / 10);
  var minuteOnes = minutes % 10;
  var meridiem = hours >= 12 ? 'PM' : 'AM';
  return {
    hourTens: hourTens,
    hourOnes: hourOnes,
    minuteTens: minuteTens,
    minuteOnes: minuteOnes,
    meridiem: meridiem
  };
}

var backTextStyle = [FONTS.NOTES1, {
  marginStart: 10,
  color: COLORS.BLACK,
  textAlignVertical: 'bottom',
  height: 14,
  lineHeight: reactNative.Platform.OS === 'ios' ? 16 : 14
}];
var BackButtonHeader = (function (_ref) {
  var children = _ref.children,
      style = _ref.style,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick;
  var borderBottomWidth = get(style, ['borderBottomWidth'], 0);
  var borderBottomColor = get(style, ['borderBottomColor'], COLORS.BLACK);
  var color = get(style, ['color'], COLORS.BLACK);
  var backgroundColor = get(style, ['backgroundColor'], COLORS.WHITE);
  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      borderBottomWidth: borderBottomWidth,
      borderBottomColor: borderBottomColor,
      backgroundColor: backgroundColor
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      flex: 0,
      flexDirection: 'row',
      height: 40,
      paddingTop: 25,
      paddingBottom: 25,
      paddingRight: 25,
      alignItems: 'center',
      alignContent: 'center'
    },
    onPress: onClick
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [backTextStyle, {
      color: color
    }]
  }, reactNative.Platform.OS === 'ios' ? 'back' : 'Back')), children);
});

var Button = (function (_ref) {
  var children = _ref.children,
      style = _ref.style,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick;
  var buttonOpacity = React.useRef(new reactNative.Animated.Value(1)).current;
  var marginBottom = get(style, ['marginBottom'], 0);
  var color = get(style, ['color'], COLORS.BLACK);
  var borderColor = get(style, ['borderColor'], COLORS.BLACK);

  var onPressInternal = function onPressInternal() {
    reactNative.Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    onClick();
  };

  return /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      marginBottom: marginBottom
    },
    onPressIn: function onPressIn() {
      buttonOpacity.setValue(0.5);
    },
    onPress: onPressInternal
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Animated.View, {
    style: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 4,
      textAlignVertical: 'center',
      opacity: buttonOpacity
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.HEADING4, {
      height: 16,
      lineHeight: 16,
      color: color
    }]
  }, children)));
});

var DateSelector = (function (_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? parseInt(moment__default['default']().format('x')) : _ref$value,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function (selectedDayTimestamp) {} : _ref$onChange,
      _ref$style = _ref.style;
  _ref$style = _ref$style === void 0 ? {
    marginTop: 0
  } : _ref$style;
  var marginBottom = _ref$style.marginBottom;

  var _useState = React.useState(moment__default['default']().format('MMMM YYYY')),
      _useState2 = _slicedToArray(_useState, 2),
      visibleMonth = _useState2[0],
      setVisibleMonth = _useState2[1];

  var daysInMonth = moment__default['default'](visibleMonth, 'MMMM YYYY').daysInMonth();
  var firstDayOfMonth = parseInt(moment__default['default']("01 ".concat(visibleMonth), 'DD MMMM YYYY').format('d'));
  var weeks = [[]];

  for (var dateOverflow = 0; dateOverflow < firstDayOfMonth; dateOverflow++) {
    weeks[0].push(null);
  }

  for (var day = 0; day < daysInMonth; day++) {
    var week = Math.floor((day + firstDayOfMonth) / 7);

    if (weeks.length <= week) {
      weeks.push([]);
    }

    var todayFormat = moment__default['default']().format('DD M YYYY');
    var selectedDayFormat = moment__default['default'](value).format('DD M YYYY');
    var currentDayFormat = moment__default['default']("".concat(day + 1, " ").concat(visibleMonth), 'D MMMM YYYY').format('DD M YYYY');
    var dayObj = {
      value: day + 1,
      isSelected: selectedDayFormat === currentDayFormat,
      isToday: todayFormat === currentDayFormat,
      isSelectable: true
    };
    weeks[week].push(dayObj);
  }

  var underflowSize = 7 - (daysInMonth + firstDayOfMonth) % 7;

  if (underflowSize !== 7) {
    for (var dateUnderflow = 0; dateUnderflow < underflowSize; dateUnderflow++) {
      weeks[weeks.length - 1].push(null);
    }
  }

  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flex: 1,
      marginBottom: marginBottom
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      padding: 25
    },
    onPress: function onPress() {
      var prevMonth = moment__default['default'](visibleMonth, 'MMMM YYYY').startOf('month').subtract(1, 'month').format('MMMM YYYY');
      setVisibleMonth(prevMonth);
    },
    onLongPress: function onLongPress() {
      if (moment__default['default']().format('x') < moment__default['default'](visibleMonth, 'MMMM, YYYY').format('x')) {
        setVisibleMonth(moment__default['default']().format('MMMM YYYY'));
      }
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, null, "\u25C2")), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      flex: 1,
      textAlign: 'center'
    }]
  }, visibleMonth), /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      padding: 25
    },
    onPress: function onPress() {
      var nextMonth = moment__default['default'](visibleMonth, 'MMMM YYYY').startOf('month').add(1, 'month').format('MMMM YYYY');
      setVisibleMonth(nextMonth);
    },
    onLongPress: function onLongPress() {
      if (moment__default['default']().format('x') > moment__default['default'](visibleMonth, 'MMMM, YYYY').format('x')) {
        setVisibleMonth(moment__default['default']().format('MMMM YYYY'));
      }
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, null, "\u25B8"))), /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'column',
      marginTop: 20
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'row',
      flex: 0,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center',
      color: 'red'
    }]
  }, "S"), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center'
    }]
  }, "M"), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center'
    }]
  }, "T"), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center'
    }]
  }, "W"), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center'
    }]
  }, "T"), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center'
    }]
  }, "F"), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      height: 50,
      width: 50,
      marginLeft: 0,
      marginRight: 0,
      textAlign: 'center',
      color: 'red'
    }]
  }, "S")), weeks.map(function (week, index) {
    return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
      key: "week-".concat(index),
      style: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'space-between'
      }
    }, week.map(function (day, dayIndex) {
      return /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
        key: "week-".concat(index, "-day-").concat(dayIndex),
        style: {
          flex: 0,
          width: 50,
          height: 50,
          marginLeft: 0,
          marginRight: 0,
          justifyContent: 'center',
          alignItems: 'center'
        },
        onPress: function onPress() {
          var selectedDay = moment__default['default']("".concat(day.value, " ").concat(visibleMonth), 'D MMMM YYYY');
          var selectedDayTimestamp = parseInt(selectedDay.format('x'));
          onChange(selectedDayTimestamp);
        }
      }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
        style: {
          width: 40,
          height: 40,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: day && day.isSelected ? COLORS.ACTIVE_BLUE : null
        }
      }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
        style: [FONTS.PARAGRAPH, {
          width: 30,
          height: 30,
          lineHeight: 30,
          textAlign: 'center',
          textAlignVertical: 'center',
          textDecorationLine: day && day.isToday ? 'underline' : 'none'
        }]
      }, day && day.value)));
    }));
  })));
});

var HorizontalLine = (function (_ref) {
  var _ref$marginBottom = _ref.marginBottom,
      marginBottom = _ref$marginBottom === void 0 ? 25 : _ref$marginBottom,
      _ref$borderColor = _ref.borderColor,
      borderColor = _ref$borderColor === void 0 ? 'black' : _ref$borderColor;
  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      marginBottom: marginBottom,
      borderWidth: 1.5,
      borderRadius: 1.5,
      borderColor: borderColor,
      backgroundColor: borderColor
    }
  });
});

var Digit = /*#__PURE__*/React__default['default'].forwardRef(function (_ref, ref) {
  var _ref$validChars = _ref.validChars,
      validChars = _ref$validChars === void 0 ? [] : _ref$validChars,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '0' : _ref$value,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function (text) {} : _ref$onChange,
      _ref$onInvalidChange = _ref.onInvalidChange,
      onInvalidChange = _ref$onInvalidChange === void 0 ? function (text) {} : _ref$onInvalidChange;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasFocus = _useState2[0],
      setFocus = _useState2[1];

  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, null, /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    onPress: function onPress() {
      return ref && ref.current && ref.current.focus();
    },
    style: {
      flex: 0
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.HEADING3, {
      width: 30,
      height: 36,
      padding: 5,
      lineHeight: 26,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: hasFocus ? "".concat(COLORS.ACTIVE_BLUE, "80") : null
    }]
  }, value), /*#__PURE__*/React__default['default'].createElement(reactNative.TextInput, {
    style: {
      width: 0,
      height: 0,
      padding: 0,
      margin: 0,
      opacity: 0
    },
    ref: ref,
    keyboardType: "number-pad",
    onBlur: function onBlur() {
      return setFocus(false);
    },
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onTextInput: function onTextInput(event) {
      var text = event.nativeEvent.text;

      if (validChars.includes(text)) {
        onChange(text);
      } else {
        onInvalidChange(text);
      }
    },
    maxLength: 1,
    value: ""
  })));
});

var Dials = function Dials(_ref2) {
  var children = _ref2.children,
      _ref2$style = _ref2.style;
  _ref2$style = _ref2$style === void 0 ? {
    marginLeft: 0
  } : _ref2$style;
  var marginLeft = _ref2$style.marginLeft,
      _ref2$onUpPress = _ref2.onUpPress,
      onUpPress = _ref2$onUpPress === void 0 ? function () {} : _ref2$onUpPress,
      _ref2$onDownPress = _ref2.onDownPress,
      onDownPress = _ref2$onDownPress === void 0 ? function () {} : _ref2$onDownPress;
  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      marginLeft: marginLeft,
      marginBottom: 10,
      padding: 10
    },
    onPress: onUpPress
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, null, "\u25B2")), children, /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      marginLeft: marginLeft,
      marginTop: 10,
      padding: 10
    },
    onPress: onDownPress
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, null, "\u25BC")));
};

var TimeSelector = (function (_ref3) {
  var _ref3$style = _ref3.style;
  _ref3$style = _ref3$style === void 0 ? {
    marginBottom: 0
  } : _ref3$style;
  var marginBottom = _ref3$style.marginBottom,
      value = _ref3.value,
      onChange = _ref3.onChange;

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      meridiemFocused = _useState4[0],
      setMeridiemFocus = _useState4[1];

  var hourTensRef = React.useRef(null);
  var hourOnesRef = React.useRef(null);
  var minuteTensRef = React.useRef(null);
  var minuteOnesRef = React.useRef(null);
  var meridiemRef = React.useRef(null);

  var onHoursDialUpPress = function onHoursDialUpPress() {
    var hour = parseInt("".concat(hourTens).concat(hourOnes));
    var nextHour = hour % 12 + 1;
    setHour(nextHour);
  };

  var onHoursDialDownPress = function onHoursDialDownPress() {
    var hour = parseInt("".concat(hourTens).concat(hourOnes));
    var prevHour = (hour + 10) % 12 + 1;
    setHour(prevHour);
  };

  var onMinutesDialUpPress = function onMinutesDialUpPress() {
    var minute = parseInt("".concat(minuteTens).concat(minuteOnes));
    var nextMinute = (minute + 1) % 60;
    setMinute(nextMinute);
  };

  var onMinutesDialDownPress = function onMinutesDialDownPress() {
    var minute = parseInt("".concat(minuteTens).concat(minuteOnes));
    var prevMinute = (minute + 59) % 60;
    setMinute(prevMinute);
  };

  var toggleMeridiem = function toggleMeridiem() {
    setMeridiem(meridiem === 'AM' ? 'PM' : 'AM');
  };

  var _getTimeParticlesFrom = getTimeParticlesFromInt(value),
      hourTens = _getTimeParticlesFrom.hourTens,
      hourOnes = _getTimeParticlesFrom.hourOnes,
      minuteTens = _getTimeParticlesFrom.minuteTens,
      minuteOnes = _getTimeParticlesFrom.minuteOnes,
      meridiem = _getTimeParticlesFrom.meridiem;

  var setHourTens = function setHourTens(hourTensStr) {
    var hourTens = parseInt(hourTensStr);
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  var setHourOnes = function setHourOnes(hourOnesStr) {
    var hourOnes = parseInt(hourOnesStr);
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  var setHour = function setHour(hour) {
    var hourTens = Math.floor(hour / 10);
    var hourOnes = hour % 10;
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  var setMinuteTens = function setMinuteTens(minuteTensStr) {
    var minuteTens = parseInt(minuteTensStr);
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  var setMinuteOnes = function setMinuteOnes(minuteOnesStr) {
    var minuteOnes = parseInt(minuteOnesStr);
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  var setMinute = function setMinute(minute) {
    var minuteTens = Math.floor(minute / 10);
    var minuteOnes = minute % 10;
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  var setMeridiem = function setMeridiem(meridiem) {
    var timeInt = timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem);
    onChange(timeInt);
  };

  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: marginBottom
    }
  }, /*#__PURE__*/React__default['default'].createElement(Dials, {
    onUpPress: onHoursDialUpPress,
    onDownPress: onHoursDialDownPress
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React__default['default'].createElement(Digit, {
    ref: hourTensRef,
    validChars: ['0', '1'],
    value: hourTens,
    onChange: function onChange(text) {
      var hourOnesInt = parseInt(hourOnes);

      if (hourTens === 0 && hourOnes === '0') {
        setHour(10);
      } else if (text === '1' && hourOnesInt > 2) {
        setHour(hourOnesInt);
      } else {
        setHourTens(text);
      }

      hourOnesRef.current.focus();
    }
  }), /*#__PURE__*/React__default['default'].createElement(Digit, {
    ref: hourOnesRef,
    validChars: hourTens === 0 ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] : ['0', '1', '2'],
    value: hourOnes,
    onChange: function onChange(text) {
      if (text === '0' && hourTens === '0') {
        setHour(1);
      } else {
        setHourOnes(text);
      }

      minuteTensRef.current.focus();
    }
  }))), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.HEADING3, {
      height: 20,
      lineHeight: 20,
      textAlignVertical: 'center'
    }]
  }, ":"), /*#__PURE__*/React__default['default'].createElement(Dials, {
    onUpPress: onMinutesDialUpPress,
    onDownPress: onMinutesDialDownPress
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React__default['default'].createElement(Digit, {
    ref: minuteTensRef,
    validChars: ['0', '1', '2', '3', '4', '5'],
    value: minuteTens,
    onChange: function onChange(text) {
      setMinuteTens(text);
      minuteOnesRef.current.focus();
    }
  }), /*#__PURE__*/React__default['default'].createElement(Digit, {
    ref: minuteOnesRef,
    validChars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    value: minuteOnes,
    onChange: function onChange(text) {
      setMinuteOnes(text);
      meridiemRef.current.focus();
    }
  }))), /*#__PURE__*/React__default['default'].createElement(Dials, {
    style: {
      marginLeft: 10
    },
    onUpPress: toggleMeridiem,
    onDownPress: toggleMeridiem
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.View, null, /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    onPress: function onPress() {
      return meridiemRef && meridiemRef.current && meridiemRef.current.focus();
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.HEADING3, {
      width: 60,
      height: 36,
      padding: 5,
      marginLeft: 10,
      lineHeight: 26,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: meridiemFocused ? "".concat(COLORS.ACTIVE_BLUE, "80") : null
    }]
  }, meridiem), /*#__PURE__*/React__default['default'].createElement(reactNative.TextInput, {
    style: {
      width: 0,
      height: 0,
      padding: 0,
      margin: 0,
      opacity: 0
    },
    ref: meridiemRef,
    keyboardType: "default",
    onBlur: function onBlur() {
      return setMeridiemFocus(false);
    },
    onFocus: function onFocus() {
      return setMeridiemFocus(true);
    },
    onTextInput: function onTextInput(event) {
      var text = event.nativeEvent.text;

      if (['a', 'A'].includes(text)) {
        setMeridiem('AM');
      } else if (['p', 'P'].includes(text)) {
        setMeridiem('PM');
      }
    },
    maxLength: 1,
    value: ""
  }))))));
});

var DateTimeInput = (function (_ref) {
  var _ref$style = _ref.style;
  _ref$style = _ref$style === void 0 ? {
    marginBottom: 0
  } : _ref$style;
  var marginBottom = _ref$style.marginBottom,
      label = _ref.label,
      value = _ref.value,
      _ref$hasError = _ref.hasError,
      hasError = _ref$hasError === void 0 ? false : _ref$hasError,
      onActive = _ref.onActive,
      _onChange = _ref.onChange;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isActive = _useState2[0],
      setActive = _useState2[1];

  var timestampStr = moment__default['default'](value).startOf('day').format('x');
  var dateValue = parseInt(timestampStr);
  var timeValue = value - dateValue;
  return /*#__PURE__*/React__default['default'].createElement(reactNative.View, null, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.HEADING4, {
      marginBottom: 10,
      color: COLORS.BLACK
    }]
  }, label), /*#__PURE__*/React__default['default'].createElement(reactNative.Pressable, {
    style: {
      flexDirection: 'row',
      height: 50,
      marginBottom: marginBottom,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      borderRadius: 4,
      borderColor: hasError ? COLORS.ERROR_RED : COLORS.BLACK,
      borderWidth: 1
    },
    onPress: function onPress() {
      onActive();
      setActive(true);
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      color: COLORS.BLACK
    }]
  }, formatTimeFromInt(timeValue)), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.PARAGRAPH, {
      flex: 1,
      marginRight: 'auto',
      marginLeft: 0,
      textAlign: 'right',
      color: COLORS.BLACK
    }]
  }, moment__default['default'](dateValue).format('Do MMMM, YYYY'))), /*#__PURE__*/React__default['default'].createElement(reactNative.Modal, {
    visible: isActive
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React__default['default'].createElement(reactNative.ScrollView, null, /*#__PURE__*/React__default['default'].createElement(reactNative.View, {
    style: {
      margin: 20,
      marginBottom: 100
    }
  }, /*#__PURE__*/React__default['default'].createElement(BackButtonHeader, {
    onClick: function onClick() {
      return setActive(false);
    }
  }), /*#__PURE__*/React__default['default'].createElement(reactNative.Text, {
    style: [FONTS.HEADING4, {
      marginTop: 25,
      marginBottom: 50,
      textAlign: 'center',
      color: COLORS.BLACK
    }]
  }, label), /*#__PURE__*/React__default['default'].createElement(TimeSelector, {
    style: {
      marginBottom: 50
    },
    value: timeValue,
    onChange: function onChange(timeValue) {
      return _onChange(dateValue + timeValue);
    }
  }), /*#__PURE__*/React__default['default'].createElement(HorizontalLine, null), /*#__PURE__*/React__default['default'].createElement(DateSelector, {
    style: {
      marginBottom: 50
    },
    value: dateValue,
    onChange: function onChange(dateValue) {
      return _onChange(dateValue + timeValue);
    }
  }), /*#__PURE__*/React__default['default'].createElement(Button, {
    onClick: function onClick() {
      return setActive(false);
    }
  }, "Done"))))));
});

module.exports = DateTimeInput;
