import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StringOrFn, NumberArray } from './timeago.formatter';

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
}

/**
 * To modify the text displayed, create a new instance of TimeagoIntl and
 * include it in a custom provider
 */
@Injectable()
export class TimeagoIntl {
  strings: IL10nsStrings;

  /**
   * Stream that emits whenever the l10n strings are changed
   * Use this to notify directives if the l10n strings have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();
}
