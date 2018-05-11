import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import englishStrings from 'ngx-timeago/language-strings/en';
import englishShortStrings from 'ngx-timeago/language-strings/en-short';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  date = Date.now() - 40000;
  live = true;
  suffix = true;
  lang = 'en';

  constructor(private intl: TimeagoIntl) {
    this.setLang(this.lang);
  }

  setLang(lang: string) {
    this.lang = lang;
    switch (lang) {
      case 'en': this.intl.strings = englishStrings; break;
      case 'en-short': this.intl.strings = englishShortStrings; break;
      default: break;
    }
    this.intl.changes.next();
  }
}
