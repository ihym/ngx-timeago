import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { strings as englishShortStrings } from 'ngx-timeago/language-strings/en-short';
import { strings as frenchStrings } from 'ngx-timeago/language-strings/fr';
import { strings as frenchShortStrings } from 'ngx-timeago/language-strings/fr-short';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  date = Date.now() - 55000;
  live = true;
  lang: string;

  constructor(private intl: TimeagoIntl) {}

  setLang(lang: string) {
    this.lang = lang;
    switch (lang) {
      case 'en':
        this.intl.strings = englishStrings;
        break;
      case 'en-short':
        this.intl.strings = englishShortStrings;
        break;
      case 'fr':
        this.intl.strings = frenchStrings;
        break;
      case 'fr-short':
        this.intl.strings = frenchShortStrings;
        break;
      default:
        break;
    }
    this.intl.changes.next();
  }
}
