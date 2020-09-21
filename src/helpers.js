export function get(obj, properties, defaultValue = null) {
  let valueSoFar = obj;

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
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
export function timeToInt(hours, minutes, meridiem = 'AM') {
  const casedMeridiem = meridiem.toUpperCase();
  let seconds = 0;
  if (casedMeridiem === 'PM') {
    seconds = 12 * 3600;
  }
  seconds += (hours % 12) * 3600;
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
export function timeParticlesToInt(hourTens, hourOnes, minuteTens, minuteOnes, meridiem = 'AM') {
  const hours = hourTens * 10 + hourOnes;
  const minutes = minuteTens * 10 + minuteOnes;

  return timeToInt(hours, minutes, meridiem);
}

/**
 * @param {Integer} integer - number of milliseconds passed in the day since midnight.
 * @returns {String} a string of the form '09:30 AM'.
 */
export function formatTimeFromInt(integer) {
  const {
    hourTens,
    hourOnes,
    minuteTens,
    minuteOnes,
    meridiem,
  } = getTimeParticlesFromInt(integer);

  return `${hourTens}${hourOnes}:${minuteTens}${minuteOnes} ${meridiem}`
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
export function getTimeParticlesFromInt(integer) {
  const seconds = Math.floor(integer / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const cancelMeridiemHours = (hours % 12); // 13 o'clock -> 01 o'clock
  const clockHours = ((cancelMeridiemHours + 11) % 12) + 1; // 00 o'clock -> 12 o'clock
  const hourTens = Math.floor(clockHours / 10);
  const hourOnes = clockHours % 10;
  
  const minuteTens = Math.floor(minutes / 10);
  const minuteOnes = minutes % 10;

  const meridiem = hours >= 12 ? 'PM' : 'AM';

  return {
    hourTens,
    hourOnes,
    minuteTens,
    minuteOnes,
    meridiem,
  };
}
