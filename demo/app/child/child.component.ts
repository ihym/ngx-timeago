import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import englishStrings from 'ngx-timeago/language-strings/en';
import frenchStrings from 'ngx-timeago/language-strings/fr';

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
      case 'fr': this.intl.strings = frenchStrings; break;
      default: break;
    }
    this.intl.changes.next();
  }
}
