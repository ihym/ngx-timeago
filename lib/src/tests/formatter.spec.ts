import {
  TimeagoDefaultFormatter,
  TimeagoCustomFormatter,
  TimeagoIntl,
  IL10nsStrings,
} from '../public_api';

const strings: IL10nsStrings = {
  prefixAgo: 'prefixAgo',
  prefixFromNow: 'prefixFromNow',
  suffixAgo: 'suffixAgo',
  suffixFromNow: 'suffixFromNow',
  seconds: '%d seconds',
  minute: '%d minute',
  minutes: '%d minutes',
  hour: '%d hour',
  hours: '%d hours',
  day: '%d day',
  days: '%d days',
  week: '%d week',
  weeks: '%d weeks',
  month: '%d month',
  months: '%d months',
  year: '%d year',
  years: '%d years',
  wordSeparator: ' ',
};

describe('TimeagoFormatter', () => {
  let now: number;

  beforeEach(() => {
    now = Date.now();
  });

  describe('Default', () => {
    let formatter: TimeagoDefaultFormatter;

    beforeEach(() => {
      formatter = new TimeagoDefaultFormatter();
    });

    it('is defined', () => {
      expect(TimeagoDefaultFormatter).toBeDefined();

      expect(formatter instanceof TimeagoDefaultFormatter).toBeTruthy();
    });

    it('should render properly based on input', () => {
      const dates = [
        { then: 1000, result: '1 second' },
        { then: 2000, result: '2 seconds' },
        { then: 1000 * 60, result: '1 minute' },
        { then: 2000 * 60, result: '2 minutes' },
        { then: 1000 * 60 * 60, result: '1 hour' },
        { then: 2000 * 60 * 60, result: '2 hours' },
        { then: 1000 * 60 * 60 * 24, result: '1 day' },
        { then: 2000 * 60 * 60 * 24, result: '2 days' },
        { then: 1000 * 60 * 60 * 24 * 7, result: '1 week' },
        { then: 2000 * 60 * 60 * 24 * 7, result: '2 weeks' },
        { then: 1000 * 60 * 60 * 24 * 30, result: '1 month' },
        { then: 2000 * 60 * 60 * 24 * 30, result: '2 months' },
        { then: 1000 * 60 * 60 * 24 * 365, result: '1 year' },
        { then: 2000 * 60 * 60 * 24 * 365, result: '2 years' },
      ];

      // ago
      dates.forEach(({ then, result }) =>
        expect(formatter.format(now - then)).toBe(result + ' ago')
      );

      // from now
      dates.forEach(({ then, result }) =>
        expect(formatter.format(now + then)).toBe(result + ' from now')
      );
    });
  });

  describe('Custom', () => {
    let formatter: TimeagoCustomFormatter;
    let intl: TimeagoIntl;

    beforeEach(() => {
      intl = new TimeagoIntl();
      intl.strings = { ...strings };
      formatter = new TimeagoCustomFormatter(intl);
    });

    it('is defined', () => {
      expect(TimeagoCustomFormatter).toBeDefined();

      expect(formatter instanceof TimeagoCustomFormatter).toBeTruthy();
    });

    it('should render properly based on input', () => {
      const dates = [
        { then: 1000, unit: 'seconds', value: 1 },
        { then: 2000, unit: 'seconds', value: 2 },
        { then: 1000 * 60, unit: 'minute', value: 1 },
        { then: 2000 * 60, unit: 'minutes', value: 2 },
        { then: 1000 * 60 * 60, unit: 'hour', value: 1 },
        { then: 2000 * 60 * 60, unit: 'hours', value: 2 },
        { then: 1000 * 60 * 60 * 24, unit: 'day', value: 1 },
        { then: 2000 * 60 * 60 * 24, unit: 'days', value: 2 },
        { then: 1000 * 60 * 60 * 24 * 7, unit: 'week', value: 1 },
        { then: 2000 * 60 * 60 * 24 * 7, unit: 'weeks', value: 2 },
        { then: 1000 * 60 * 60 * 24 * 30, unit: 'month', value: 1 },
        { then: 2000 * 60 * 60 * 24 * 30, unit: 'months', value: 2 },
        { then: 1000 * 60 * 60 * 24 * 365, unit: 'year', value: 1 },
        { then: 2000 * 60 * 60 * 24 * 365, unit: 'years', value: 2 },
      ];

      // ago
      dates.forEach(({ then, unit, value }) =>
        expect(formatter.format(now - then)).toBe(`prefixAgo ${value} ${unit} suffixAgo`)
      );

      // from now
      dates.forEach(({ then, unit, value }) =>
        expect(formatter.format(now + then)).toBe(`prefixFromNow ${value} ${unit} suffixFromNow`)
      );
    });

    it('should convert weeks to days if strings dont handle weeks', () => {
      intl.strings.week = null;
      intl.strings.weeks = null;

      expect(formatter.format(now - 1000 * 60 * 60 * 24 * 7)).toBe('prefixAgo 7 days suffixAgo');
    });

    it('should use custom word separator if present', () => {
      intl.strings.wordSeparator = '-';

      expect(formatter.format(now - 1000 * 60)).toBe('prefixAgo-1 minute-suffixAgo');
    });

    it('should use numbers array if present', () => {
      intl.strings.numbers = ['', '', '', 'three', '', '', '', '', '', ''];

      expect(formatter.format(now - 1000 * 60 * 60 * 24 * 3)).toBe(
        'prefixAgo three days suffixAgo'
      );
    });
  });
});
