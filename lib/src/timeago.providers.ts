import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TimeagoClock, TimeagoDefaultClock } from './timeago.clock';
import { TimeagoFormatter, TimeagoDefaultFormatter } from './timeago.formatter';

export interface TimeagoConfig {
  clock?: Provider;
  intl?: Provider;
  formatter?: Provider;
}

/**
 * Provides the TimeagoModule services for standalone components.
 * Use this function in your application config when using standalone components.
 *
 * @example
 * ```ts
 * import { provideTimeago } from 'ngx-timeago';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideTimeago({ clock: { provide: TimeagoClock, useClass: MyClock } })
 *   ]
 * };
 * ```
 */
export function provideTimeago(config: TimeagoConfig = {}): EnvironmentProviders {
  const providers: Provider[] = [
    config.clock || { provide: TimeagoClock, useClass: TimeagoDefaultClock },
    config.formatter || { provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter },
  ];

  if (config.intl) {
    providers.push(config.intl);
  }

  return makeEnvironmentProviders(providers);
}
