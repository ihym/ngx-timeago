import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeagoClock, TimeagoModule } from 'ngx-timeago';
import { Observable, of } from 'rxjs';
import { delay, expand, skip } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return of(0).pipe(
      expand(() => {
        const now = Date.now();
        const seconds = Math.round(Math.abs(now - then) / 1000);

        const period = seconds < 60 ? 1000 : 1000 * 60;

        return of(period).pipe(delay(period));
      }),
      skip(1),
    );
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    TimeagoModule.forRoot({
      clock: { provide: TimeagoClock, useClass: MyClock },
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
