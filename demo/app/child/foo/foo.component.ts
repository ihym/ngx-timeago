import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-foo',
    template: `
    <h2> OnPush Component </h2>
    <div timeago [date]="2671200000" [live]="true"></div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FooComponent {
}
