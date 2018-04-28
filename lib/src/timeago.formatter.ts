import {Injectable, Optional} from '@angular/core';
import {TimeagoIntl} from './timeago.intl';

type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

type Suffix = 'ago' | 'from now' | '';

export type StringOrFn = ((value: number, millisDelta:  number) => string) | string;

export type NumberArray = [ string, string, string, string, string, string, string, string, string, string ];

export abstract class TimeagoFormatter {
  constructor(@Optional() public intl: TimeagoIntl) {}

  abstract format(value: number, unit: string, suffix: string, epochMillis?: number): string;
}

@Injectable()
export class TimeagoDefaultFormatter extends TimeagoFormatter {
  format(value: number, unit: string, suffix: string): string {
    if (value !== 1) {
      unit += 's';
    }
    return value + ' ' + unit + ' ' + suffix;
  }
}

@Injectable()
export class TimeagoCustomFormatter extends TimeagoFormatter {
  format(value: number, unit: Unit, suffix: Suffix, epochMillis: number) {
    // convert weeks to days if strings don't handle weeks
    const now = Date.now();
    if (unit === 'week' && !this.intl.week && !this.intl.weeks) {
      const days = Math.round(Math.abs(epochMillis - now) / (1000 * 60 * 60 * 24));
      value = days;
      unit = 'day';
    }

    // create a normalize function for given value
    const normalize = this.normalizeFn(value, now - epochMillis, this.intl.numbers);

    // The eventual return value stored in an array so that the wordSeparator can be used
    let dateString: string[] = [];

    // handle prefixes
    if (suffix === 'ago' && this.intl.prefixAgo) {
      dateString.push(normalize(this.intl.prefixAgo));
    }
    if (suffix === 'from now' && this.intl.prefixFromNow) {
      dateString.push(normalize(this.intl.prefixFromNow));
    }

    // Handle Main number and unit
    const isPlural = value > 1;
    if (isPlural) {
      const stringFn: StringOrFn = this.intl[unit + 's'] || this.intl[unit] || '%d ' + unit;
      dateString.push(normalize(stringFn));
    } else {
      const stringFn: StringOrFn = this.intl[unit] || this.intl[unit + 's'] || '%d ' + unit;
      dateString.push(normalize(stringFn));
    }

    // Handle Suffixes
    if (suffix === 'ago' && this.intl.suffixAgo) {
      dateString.push(normalize(this.intl.suffixAgo));
    }
    if (suffix === 'from now' && this.intl.suffixFromNow) {
      dateString.push(normalize(this.intl.suffixFromNow));
    }

    // join the array into a string and return it
    const wordSeparator = typeof this.intl.wordSeparator === 'string' ? this.intl.wordSeparator : ' ';
    return dateString.join(wordSeparator);
  };

  // If the numbers array is present, format numbers with it,
  // otherwise just cast the number to a string and return it
  private normalizeNumber(numbers: NumberArray, value: number) {
    return numbers && numbers.length === 10
      ? String(value).split('')
          .map((digit: string) => digit.match(/^[0-9]$/) ? numbers[parseInt(digit, 10)] : digit)
          .join('')
      : String(value);
  }

  // Take a string or a function that takes number of days and returns a string
  // and provide a uniform API to create string parts
  private normalizeFn(value: number, millisDelta: number, numbers?: NumberArray) {
    return (stringOrFn: StringOrFn) =>
      typeof stringOrFn === 'function'
      ? stringOrFn(value, millisDelta).replace(/%d/g, this.normalizeNumber(numbers, value))
      : stringOrFn.replace(/%d/g, this.normalizeNumber(numbers, value));
  }
}
