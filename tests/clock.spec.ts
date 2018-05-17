import { TimeagoDefaultClock } from '../lib/src/public_api';
import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs/operators';

describe('TimeagoClock', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  describe('Default', () => {
    let clock: TimeagoDefaultClock;

    beforeEach(() => {
      clock = new TimeagoDefaultClock();
    });

    it('is defined', () => {
      expect(TimeagoDefaultClock).toBeDefined();

      expect(clock instanceof TimeagoDefaultClock).toBeTruthy();
    });

    it('should complete instantly for differences greater than a day', (() => {
      testScheduler.run(({ expectObservable }) => {
        const source = clock.tick(Date.now() - 60 * 60 * 24 * 1000).pipe(map(x => x.toString()));
        const expected = '|';
        expectObservable(source).toBe(expected);
      });
    }));
  });
});
