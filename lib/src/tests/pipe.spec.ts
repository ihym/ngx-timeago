import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import {
  TimeagoModule,
  TimeagoClock,
  TimeagoFormatter,
  TimeagoPipe,
  TimeagoIntl,
  TimeagoCustomFormatter,
  IL10nsStrings,
} from '../public_api';

const strings: IL10nsStrings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: 'ago',
  suffixFromNow: 'from now',
  second: '%d second',
  seconds: '%d seconds',
  minute: '%d minute',
  minutes: '%d minutes',
  hour: '%d hour',
  hours: '%d hours',
  day: 'a day',
  days: '%d days',
  month: '%d month',
  months: '%d months',
  year: '%d year',
  years: '%d years',
  wordSeparator: ' ',
};

class FakeChangeDetectorRef extends ChangeDetectorRef {
  markForCheck(): void {}

  detach(): void {}

  detectChanges(): void {}

  checkNoChanges(): void {}

  reattach(): void {}
}

@Injectable()
@Component({
  selector: 'app-root',
  template: `
    <div #static>{{ date | timeago: false }}</div>
    <div #live>{{ date | timeago: true }}</div>
    <div #var>{{ date | timeago: isLive }}</div>
  `,
  standalone: false,
})
class AppComponent {
  @ViewChild('static') static: ElementRef;
  @ViewChild('live') live: ElementRef;
  @ViewChild('var') var: ElementRef;

  date = Date.now() - 1000;
  isLive = false;
}

describe('TimeagoPipe', () => {
  let clock: TimeagoClock;
  let formatter: TimeagoFormatter;
  let intl: TimeagoIntl;
  let pipe: TimeagoPipe;
  let ref: ChangeDetectorRef;
  let date: number;
  let ngZone: NgZone;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TimeagoModule.forRoot({
          formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
        }),
      ],
      providers: [TimeagoIntl],
      declarations: [AppComponent],
    });
    date = Date.now() - 1000;
    clock = TestBed.inject(TimeagoClock);
    formatter = TestBed.inject(TimeagoFormatter);
    intl = TestBed.inject(TimeagoIntl);
    intl.strings = { ...strings };
    ref = new FakeChangeDetectorRef();
    ngZone = TestBed.inject(NgZone);
  });

  afterEach(() => {
    clock = undefined;
    formatter = undefined;
    intl = undefined;
    ref = undefined;
    pipe = undefined;
  });

  it('is defined', () => {
    pipe = new TimeagoPipe(intl, ref, formatter, clock, ngZone);

    expect(TimeagoPipe).toBeDefined();
    expect(pipe).toBeDefined();
    expect(pipe instanceof TimeagoPipe).toBeTruthy();
  });

  it('should render a formatted timestamp', () => {
    pipe = new TimeagoPipe(intl, ref, formatter, clock, ngZone);

    expect(pipe.transform(date)).toEqual('1 second ago');
  });

  it('should call markForCheck when it formats a timestamp', () => {
    pipe = new TimeagoPipe(intl, ref, formatter, clock, ngZone);

    spyOn(ref, 'markForCheck').and.callThrough();

    pipe.transform(date);
    expect(ref.markForCheck).toHaveBeenCalled();
  });

  it('should throw if you dont give a valid date', () => {
    pipe = new TimeagoPipe(intl, ref, formatter, clock, ngZone);

    expect(() => {
      pipe.transform(null);
    }).toThrowError(`Wrong parameter in TimeagoPipe. Expected a valid date, received: null`);
  });

  it('should handle clock ticks properly based on input', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual(
      '1 second ago'
    );
    expect(fixture.debugElement.componentInstance.live.nativeElement.innerHTML).toEqual(
      '1 second ago'
    );

    tick(1000);

    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual(
      '1 second ago'
    );
    expect(fixture.debugElement.componentInstance.live.nativeElement.innerHTML).toEqual(
      '2 seconds ago'
    );
    discardPeriodicTasks();
  }));

  it('should listen to intl changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual(
      '1 second ago'
    );

    intl.strings.second = '%d testSecond';
    intl.changes.next();

    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual(
      '1 testSecond ago'
    );
  });

  it('should listen to date changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.date = Date.now() - 2000;
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual(
      '2 seconds ago'
    );
  });

  it('should listen to live changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual(
      '1 second ago'
    );

    tick(1000);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual(
      '1 second ago'
    );

    fixture.componentInstance.isLive = true;
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual(
      '2 seconds ago'
    );

    tick(1000);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual(
      '3 seconds ago'
    );

    discardPeriodicTasks();
  }));
});
