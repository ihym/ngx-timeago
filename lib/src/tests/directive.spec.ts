import { ChangeDetectionStrategy, Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { TestBed, fakeAsync, tick, discardPeriodicTasks, ComponentFixture } from '@angular/core/testing';
import { TimeagoModule, TimeagoClock, TimeagoFormatter, IL10nsStrings, TimeagoIntl, TimeagoCustomFormatter } from '../public_api';

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

@Injectable()
@Component({
  selector: 'app-root',
  template: `
    <div #static timeago [date]="date" [live]="false"></div>
    <div #live timeago [date]="date" [live]="true"></div>
    <div #var timeago [date]="date" [live]="isLive"></div>
    `
})
class AppComponent {
  @ViewChild('static') static: ElementRef;
  @ViewChild('live') live: ElementRef;
  @ViewChild('var') var: ElementRef;

  date = Date.now() - 1000;
  isLive = false;
}

describe('TimeagoDirective', () => {
  let clock: TimeagoClock;
  let formatter: TimeagoFormatter;
  let intl: TimeagoIntl;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TimeagoModule.forRoot({
          formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
        })
      ],
      providers: [TimeagoIntl],
      declarations: [AppComponent]
    });
    clock = TestBed.get(TimeagoClock);
    formatter = TestBed.get(TimeagoFormatter);
    intl = TestBed.get(TimeagoIntl);
    intl.strings = { ...strings };

  });

  afterEach(() => {
    clock = undefined;
    formatter = undefined;
    fixture = undefined;
    intl = undefined;
  });

  it('should render a formatted timestamp', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.static.nativeElement.innerHTML).toEqual('1 second ago');
  });

  it('should handle clock ticks properly based on input', fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual('1 second ago');
    expect(fixture.debugElement.componentInstance.live.nativeElement.innerHTML).toEqual('1 second ago');

    tick(1000);

    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual('1 second ago');
    expect(fixture.debugElement.componentInstance.live.nativeElement.innerHTML).toEqual('2 seconds ago');

    discardPeriodicTasks();
  }));

  it('should listen to intl changes', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual('1 second ago');

    intl.strings.second = '%d testSecond';
    intl.changes.next();

    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual('1 testSecond ago');
  });

  it('should listen to date changes', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.date = Date.now() - 2000;
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.static.nativeElement.innerHTML).toEqual('2 seconds ago');
  });

  it('should listen to live changes', fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual('1 second ago');

    tick(1000);

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual('1 second ago');

    fixture.componentInstance.isLive = true;
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual('2 seconds ago');

    tick(1000);
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance.var.nativeElement.innerHTML).toEqual('3 seconds ago');

    discardPeriodicTasks();
  }));
});
