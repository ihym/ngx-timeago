import {IL10nsStrings} from '../timeago.intl';

function numpf (n, f, s, t) {
  var n10 = n % 10;
  if ((n10 === 1) && ((n === 1) || (n > 20))) {
    return f;
  } else if ((n10 > 1) && (n10 < 5) && ((n > 20) || (n < 10))) {
    return s;
  } else {
    return t;
  }
}

const strings: IL10nsStrings = {
  prefixAgo: null,
  prefixFromNow: 'через',
  suffixAgo: 'тому',
  suffixFromNow: null,
  seconds: 'менше хвилини',
  minute: 'хвилина',
  minutes: function (value) { return numpf(value, '%d хвилина', '%d хвилини', '%d хвилин'); },
  hour: 'година',
  hours: function (value) { return numpf(value, '%d година', '%d години', '%d годин'); },
  day: 'день',
  days: function (value) { return numpf(value, '%d день', '%d дні', '%d днів'); },
  month: 'місяць',
  months: function (value) { return numpf(value, '%d місяць', '%d місяці', '%d місяців'); },
  year: 'рік',
  years: function (value) { return numpf(value, '%d рік', '%d роки', '%d років'); },
};

export default strings;
