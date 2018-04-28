import {NgModule, ModuleWithProviders, Provider} from '@angular/core';
import {TimeagoService} from './timeago.service';
import {TimeagoIntl} from './timeago.intl';
import {TimeagoDirective} from './timeago.directive';
import {TimeagoFormatter, TimeagoDefaultFormatter} from './timeago.formatter';

export interface TimeagoModuleConfig {
  formatter?: Provider;
  intl?: Provider;
}

@NgModule({
  declarations: [
    TimeagoDirective,
  ],
  exports: [
    TimeagoDirective,
  ],
})
export class TimeagoModule {
  /**
   * Use this method in your root module to provide the TimeagoModule
   */
  static forRoot(config: TimeagoModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TimeagoModule,
      providers: [
        config.formatter || {provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter},
        config.intl,
        TimeagoService,
      ],
    };
  }

  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   */
  static forChild(config: TimeagoModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TimeagoModule,
      providers: [
        config.formatter || {provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter},
        config.intl,
        TimeagoService,
      ],
    };
  }
}
