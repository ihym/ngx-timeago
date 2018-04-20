import {NgModule, ModuleWithProviders, Provider} from '@angular/core';
import {TimeagoService} from './timeago.service';
import {TimeagoIntl} from './timeago.intl';
import {TimeagoDirective} from './timeago.directive';
import {TimeagoFormatter, TimeagoDefaultFormatter} from './timeago.formatter';
import {TimeagoStore} from "./timeago.store";
import {USE_STORE} from "./timeago.intl";

export interface TimeagoModuleConfig {
  formatter?: Provider;
  /**
   * isolate the intl service instance which holds the translation strings
   * only works for lazy loaded modules or components with the 'providers' property
   */
  isolate?: boolean;
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
   * @param {TimeagoModuleConfig} config
   * @returns {ModuleWithProviders}
   */
  static forRoot(config: TimeagoModuleConfig = {}): ModuleWithProviders {
    return {
        ngModule: TimeagoModule,
        providers: [
          config.formatter || {provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter},
          {provide: USE_STORE, useValue: config.isolate},
          TimeagoService,
          TimeagoIntl,
          TimeagoStore,
        ],
    };
  }

  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   * @param {TranslateModuleConfig} config
   * @returns {ModuleWithProviders}
   */
  static forChild(config: TimeagoModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TimeagoModule,
      providers: [
        config.formatter || {provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter},
        {provide: USE_STORE, useValue: config.isolate},        
        TimeagoService,
        TimeagoIntl,
      ],
    };
  }
}
