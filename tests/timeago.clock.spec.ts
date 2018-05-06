import { TimeagoDefaultClock } from '../lib/src/timeago.clock';
import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs/operators';

describe('TimeagoClock', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  describe('default', () => {
    let clock: TimeagoDefaultClock;

    beforeEach(() => {
      clock = new TimeagoDefaultClock();
    });

    it('should emit once and complete for differences greater than a day', (() => {
      testScheduler.run(({ expectObservable }) => {
        const source = clock.register(Date.now() - 60 * 60 * 24 * 1000).pipe(map(x => x.toString()));
        const expected = '(0|)';
        expectObservable(source).toBe(expected);
      });
    }));
  });
});
