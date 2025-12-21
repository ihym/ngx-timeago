import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TimeagoDirective } from './timeago.directive';
import { TimeagoPipe } from './timeago.pipe';
import { TimeagoClock, TimeagoDefaultClock } from './timeago.clock';
import { TimeagoFormatter, TimeagoDefaultFormatter } from './timeago.formatter';

export interface TimeagoModuleConfig {
  clock?: Provider;
  intl?: Provider;
  formatter?: Provider;
}

@NgModule({
  imports: [TimeagoDirective, TimeagoPipe],
  exports: [TimeagoDirective, TimeagoPipe],
})
export class TimeagoModule {
  /**
   * Use this method in your root module to provide the TimeagoModule
   */
  static forRoot(config: TimeagoModuleConfig = {}): ModuleWithProviders<TimeagoModule> {
    return {
      ngModule: TimeagoModule,
      providers: [
        config.clock || { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        config.intl || [],
        config.formatter || { provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter },
      ],
    };
  }

  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   */
  static forChild(config: TimeagoModuleConfig = {}): ModuleWithProviders<TimeagoModule> {
    return {
      ngModule: TimeagoModule,
      providers: [
        config.clock || { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        config.intl || [],
        config.formatter || { provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter },
      ],
    };
  }
}
