import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, interval } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeagoModule, TimeagoClock } from 'ngx-timeago';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export class MyClock extends TimeagoClock {
  register(then: number): Observable<number> {
    return interval(2000);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    TimeagoModule.forRoot({
      clock: { provide: TimeagoClock, useClass: MyClock },
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
