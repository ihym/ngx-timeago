import {
  Directive,
  Input,
  ElementRef,
  Optional,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TimeagoClock } from './timeago.clock';
import { TimeagoFormatter } from './timeago.formatter';
import { TimeagoIntl } from './timeago.intl';
import { isDefined, coerceBooleanProperty, dateParser } from './util';

@Directive({
  selector: '[timeago]',
})
export class TimeagoDirective implements OnChanges, OnDestroy {
  private intlSubscription: Subscription;
  private clockSubscription: Subscription;

  /**
   * Emits on:
   * - Input change
   * - Intl change
   * - Clock tick
  */
  stateChanges = new Subject<any>();

  /** The Date to display. An actual Date object or something that can be fed to new Date. */
  @Input()
  get date(): number {
    return this._date;
  }
  set date(date: number) {
    this._date = dateParser(date).valueOf();
    if (this._date) {
      if (this.clockSubscription) {
        this.clockSubscription.unsubscribe();
      }
      this.clockSubscription = this.clock.register(date)
        .pipe(filter(() => this.live, this))
        .subscribe(() => this.stateChanges.next());
    } else {
      console.warn('[ngx-timeago] Invalid Date provided');
    }
  }
  private _date: number;

  /** If the directive should update itself over time */
  @Input()
  get live(): boolean {
    return this._live;
  }
  set live(live: boolean) {
    this._live = coerceBooleanProperty(live);
  }
  private _live = true;

  constructor(@Optional() intl: TimeagoIntl,
              formatter: TimeagoFormatter,
              element: ElementRef,
              private clock: TimeagoClock) {
    if (intl) {
      this.intlSubscription = intl.changes.subscribe(() => this.stateChanges.next());
    }
    this.stateChanges.subscribe(() => this.setContent(element.nativeElement, formatter.parse(this.date)));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stateChanges.next();
  }

  setContent(node: any, content: string): void {
    if (isDefined(node.textContent)) {
      node.textContent = content;
    } else {
      node.data = content;
    }
  }

  ngOnDestroy() {
    if (this.intlSubscription) {
      this.intlSubscription.unsubscribe();
    }
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
    this.stateChanges.complete();
  }
}
