import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import englishStrings from 'ngx-timeago/language-strings/en';

@Component({
  selector: 'app-root',
  template: `
    <h1> App Module </h1>
    <div *ngFor="let d of dates; let i = index;">
      <span timeago [date]="d.date" [live]="d.live" [suffix]="d.suffix"></span>
      <button (click)="d.live = !d.live"> Toggle live </button>
      <button (click)="d.suffix = !d.suffix"> Toggle suffix </button>
    </div>
    <hr>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  now = Date.now();
  dates = Array.from(new Array(20), (val, index) => ({date: this.now - index * 10000, live: true, suffix: true}));

  constructor(intl: TimeagoIntl) {
    Object.assign(intl, englishStrings);
    intl.changes.next();
  }
}
