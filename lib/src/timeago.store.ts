import {Subject} from 'rxjs';
import {IL10nsStrings} from './timeago.intl';

export class TimeagoStore {
  /**
   * The l10n stirngs
   */
  strings: IL10nsStrings;
  
  /**
   * Stream that emits whenever the l10n strings are changed
   * Use this to notify directives if the l10n strings have changed after initialization.
   */
  changes: Subject<void> = new Subject<void>();
}
