import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { expand, delay, skip } from 'rxjs/operators';
import { provideTimeago, TimeagoClock } from 'ngx-timeago';
import { StandaloneComponent } from './app/standalone.component';

/**
 * Custom clock implementation that updates at different intervals
 * based on how old the timestamp is
 */
export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return of(0).pipe(
      expand(() => {
        const now = Date.now();
        const seconds = Math.round(Math.abs(now - then) / 1000);

        // Update every second for timestamps < 1 minute old
        // Update every minute for older timestamps
        const period = seconds < 60 ? 1000 : 1000 * 60;

        return of(period).pipe(delay(period));
      }),
      skip(1)
    );
  }
}

bootstrapApplication(StandaloneComponent, {
  providers: [
    provideAnimations(),
    provideTimeago({
      clock: { provide: TimeagoClock, useClass: MyClock },
    }),
  ],
}).catch(err => console.error(err));
