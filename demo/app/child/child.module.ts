import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TimeagoModule, TimeagoClock } from 'ngx-timeago';

import { ChildComponent } from './child.component';
import { FooComponent } from './foo/foo.component';

import { ChildRoutingModule } from './child-routing.module';

export class MyClock extends TimeagoClock {
  register(then: number): Observable<number> {
    return interval(2000).pipe(startWith(0));
  }
}

@NgModule({
  declarations: [
    ChildComponent,
    FooComponent,
  ],
  imports: [
    CommonModule,
    ChildRoutingModule,
    TimeagoModule.forChild({
      clock: {provide: TimeagoClock, useClass: MyClock}
    }),
  ],
  bootstrap: [ChildComponent]
})
export class ChildModule { }
