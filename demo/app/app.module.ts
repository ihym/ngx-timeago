import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeagoModule, TimeagoClock, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export class MyClock extends TimeagoClock {
  register(then: number): Observable<number> {
    return interval(2000).pipe(startWith(0));
  }
}

export class MyIntl extends TimeagoIntl {
// do extra stuff here... maybe subscribe to the TranslateService from ngx-translate?
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimeagoModule.forRoot({
      clock: { provide: TimeagoClock, useClass: MyClock },
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
