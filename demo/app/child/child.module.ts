import { NgModule } from '@angular/core';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../shared/shared.module';

import { ChildComponent } from './child.component';
import { FooComponent } from './foo/foo.component';

import { ChildRoutingModule } from './child-routing.module';

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}

@NgModule({
  declarations: [ChildComponent, FooComponent],
  imports: [
    SharedModule,
    ChildRoutingModule,
    TimeagoModule.forChild({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: {
        provide: TimeagoFormatter,
        useClass: TimeagoCustomFormatter,
      },
    }),
  ],
  bootstrap: [ChildComponent],
})
export class ChildModule {}
