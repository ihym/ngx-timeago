import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TimeagoModule, TimeagoClock, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';

import { ChildComponent } from './child.component';
import { FooComponent } from './foo/foo.component';

import { ChildRoutingModule } from './child-routing.module';

@NgModule({
  declarations: [
    ChildComponent,
    FooComponent,
  ],
  imports: [
    CommonModule,
    ChildRoutingModule,
    TimeagoModule.forChild(),
  ],
  bootstrap: [ChildComponent]
})
export class ChildModule { }
