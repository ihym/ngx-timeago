import {Injectable} from '@angular/core';
import {Observable, of, empty} from 'rxjs';
import {expand, delay} from 'rxjs/operators';
import {dateParser, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR} from './util';

export abstract class TimeagoClock {
  abstract register(then: number): Observable<any>;
}

@Injectable()
export class TimeagoDefaultClock extends TimeagoClock {
  register(then: number): Observable<number> {
    return of(0)
      .pipe(
        expand(() => {
          const now = Date.now();
          const seconds = Math.round(Math.abs(now - then) / 1000);

          const period =
            seconds < MINUTE
              ? 1000
              : seconds < HOUR
                ? 1000 * MINUTE
                : seconds < DAY
                  ? 1000 * HOUR
                  : 0;

          return period ? of(period).pipe(delay(period)) : empty();
        })
      );
  }
}
