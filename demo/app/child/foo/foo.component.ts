import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-foo',
  template: `
    <h2> OnPush Component </h2>
    <div timeago [date]="date" suffix="true"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooComponent {
  date = Date.now() - 10000;
}
