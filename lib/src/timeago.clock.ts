import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, empty, timer, EMPTY } from 'rxjs';
import { expand, skip } from 'rxjs/operators';
import { MINUTE, HOUR, DAY } from './util';
import { isPlatformBrowser } from '@angular/common';

export abstract class TimeagoClock {
  abstract tick(then: number): Observable<any>;
}

@Injectable()
export class TimeagoDefaultClock extends TimeagoClock {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    super();
  }

  tick(then: number): Observable<any> {
    return isPlatformBrowser(this.platformId) ? this.browserTick(then) : EMPTY;
  }

  private browserTick(then: number): Observable<any> {
    return of(0).pipe(
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

        return period ? timer(period) : EMPTY;
      }),
      skip(1)
    );
  }
}
