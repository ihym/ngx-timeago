import {Injectable, InjectionToken, Inject} from '@angular/core';
import {Subject} from 'rxjs';
import {StringOrFn, NumberArray} from './timeago.formatter';
import {TimeagoStore} from './timeago.store';

export const USE_STORE = new InjectionToken<string>('USE_STORE');

export interface IL10nsStrings {
  prefixAgo?: StringOrFn;
  prefixFromNow?: StringOrFn;
  suffixAgo?: StringOrFn;
  suffixFromNow?: StringOrFn;
  second?: StringOrFn;
  seconds?: StringOrFn;
  minute?: StringOrFn;
  minutes?: StringOrFn;
  hour?: StringOrFn;
  hours?: StringOrFn;
  day?: StringOrFn;
  days?: StringOrFn;
  week?: StringOrFn;
  weeks?: StringOrFn;
  month?: StringOrFn;
  months?: StringOrFn;
  year?: StringOrFn;
  years?: StringOrFn;
  wordSeparator?: string;
  numbers?: NumberArray;
};

/**
 * To modify the text displayed, create a new instance of TimeagoIntl and
 * include it in a custom provider
 */
@Injectable()
export class TimeagoIntl {
  /**
   * The l10n stirngs
   */
  _strings: IL10nsStrings;
  get strings(): IL10nsStrings {
    return this.isolate ? this._strings : this.store.strings;
  }

  set strings(_strings: IL10nsStrings) {
    if (this.isolate) {
      this._strings = _strings;
    } else {
      this.store.strings = _strings;
    }
  }

  /**
   * Stream that emits whenever the l10n strings are changed
   * Use this to notify directives if the l10n strings have changed after initialization.
   */
  get changes(): Subject<void> {
    return this.isolate ? new Subject<void>() : this.store.changes;
  }

  constructor(private store: TimeagoStore,
              @Inject(USE_STORE) private isolate: boolean = false) {}
}
