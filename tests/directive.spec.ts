import { ChangeDetectionStrategy, Component, ElementRef, Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeagoModule, TimeagoClock, TimeagoFormatter } from '../lib/src/public_api';

@Injectable()
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #static timeago [date]="date" [live]="false"></div>
    <div #live timeago [date]="date" [live]="true"></div>
  `
})
class AppComponent {
  viewContainerRef: ViewContainerRef;
  @ViewChild('static') static: ElementRef;
  @ViewChild('live') live: ElementRef;
  date = Date.now() - 1000;

  constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
}

describe('TimeagoDirective', () => {
  let clock: TimeagoClock;
  let formatter: TimeagoFormatter;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TimeagoModule.forRoot()
      ],
      declarations: [AppComponent]
    });
    clock = TestBed.get(TimeagoClock);
    formatter = TestBed.get(TimeagoFormatter);

    fixture = (<any>TestBed).createComponent(AppComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    clock = undefined;
    formatter = undefined;
    fixture = undefined;
  });

  it('should render timestamp instantly', () => {
    expect(fixture.componentInstance.static.nativeElement.innerHTML).toEqual('1 second ago');
  });
});
