import { Component, ChangeDetectionStrategy } from '@angular/core';

import englishStrings from 'ngx-timeago/language-strings/en';

console.log(englishStrings);

@Component({
  selector: 'app-child',
  template: `
    <h1> Child Module </h1>
    <div *ngFor="let date of dates;" timeago [date]="date" live="true"></div>
    <app-foo></app-foo>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  now = Date.now();
  dates = Array.from(new Array(10), (val, index) => this.now - index * 1000);
}
