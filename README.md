# ngx-timeago [![npm version](https://badge.fury.io/js/ngx-timeago.svg)](https://badge.fury.io/js/ngx-timeago) [![npm](https://img.shields.io/npm/dm/ngx-timeago.svg?maxAge=2592000)](https://www.npmjs.com/package/ngx-timeago) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

Live updating timestamps in Angular.

✨ **Now with full standalone component support!** Use with NgModules or standalone components.

[https://ihym.github.io/ngx-timeago/](https://ihym.github.io/ngx-timeago/)

Get the complete changelog here: https://github.com/ihym/ngx-timeago/releases

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contribute](#contribute)

## Installation

First you need to install the package:

```sh
pnpm add ngx-timeago
```

Choose the version corresponding to your Angular version:

| Angular           | ngx-timeago |
| ----------------- | ----------- |
| 20                | 4.x+        |
| 16,17,18,19       | 3.x+        |
| 10,11,12,13,14,15 | 2.x+        |
| 6,7,8,9           | 1.x+        |

## Setup

ngx-timeago supports both **standalone components** and **NgModule** approaches.

### Standalone Components (Recommended)

```ts
// main.ts
import { provideTimeago } from 'ngx-timeago';

bootstrapApplication(AppComponent, {
  providers: [provideTimeago()],
});
```

```ts
// component.ts
import { TimeagoPipe } from 'ngx-timeago';

@Component({
  standalone: true,
  imports: [TimeagoPipe],
  template: `{{ date | timeago }}`,
})
export class MyComponent {}
```

With custom configuration:

```ts
provideTimeago({
  formatter: { provide: TimeagoFormatter, useClass: CustomFormatter },
  clock: { provide: TimeagoClock, useClass: MyClock },
  intl: { provide: TimeagoIntl, useClass: CustomIntl },
});
```

### NgModule Approach

```ts
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [TimeagoModule.forRoot()],
})
export class AppModule {}
```

With custom configuration:

```ts
TimeagoModule.forRoot({
  formatter: { provide: TimeagoFormatter, useClass: CustomFormatter },
  clock: { provide: TimeagoClock, useClass: MyClock },
  intl: { provide: TimeagoIntl, useClass: CustomIntl },
});
```

For lazy loaded modules, use `forChild()` instead of `forRoot()`.

## Usage

### Using the Pipe

```html
<div>{{ date | timeago }}</div>
<div>{{ date | timeago: live }}</div>
```

### Using the Directive

```html
<div timeago [date]="date"></div>
<div timeago [date]="date" [live]="live"></div>
```

The `live` parameter controls automatic updates (default: `true`).

## Configuration

### Internationalization (I18n)

By default, there is no intl service available, as the default formatter doesn't provide language support.
You should provide one, if you end up with a formatter that needs it (either `TimeagoCustomFormatter` which is provided by the lib or your own). The purpose of the intl service is to contain all the necessary i18n strings used by your formatter.

```ts
export class MyIntl extends TimeagoIntl {
  // Customize strings
}

// Then provide it with TimeagoCustomFormatter
provideTimeago({
  intl: { provide: TimeagoIntl, useClass: MyIntl },
  formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
});
```

There is support for a large number of languages out of the box. This support is based on the string objects taken from `jquery-timeago`.

To use any of the languages provided, you will have to import the language strings and feed them to the intl service.

```ts
import { Component } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';

@Component({...})
export class MyComponent {
  constructor(private intl: TimeagoIntl) {
    this.intl.strings = englishStrings;
    this.intl.changes.next();
  }
}
```

See [available languages](lib/src/language-strings/).

### Custom Formatter

Implement `TimeagoFormatter` to customize timestamp display:

```ts
import { TimeagoFormatter } from 'ngx-timeago';

export class CustomFormatter extends TimeagoFormatter {
  format(then: number): string {
    const seconds = Math.round(Math.abs(Date.now() - then) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.round(seconds / 60) + ' minutes ago';
    // ... your logic
  }
}
```

Then provide it: `{ provide: TimeagoFormatter, useClass: CustomFormatter }`

[See full example](lib/src/timeago.formatter.ts)

### Custom Clock

Implement `TimeagoClock` to control update intervals:

```ts
import { TimeagoClock } from 'ngx-timeago';
import { interval } from 'rxjs';

export class MyClock extends TimeagoClock {
  tick(then: number) {
    return interval(2000); // Update every 2 seconds
  }
}
```

Then provide it: `{ provide: TimeagoClock, useClass: MyClock }`

[See full example](lib/src/timeago.clock.ts)

## Contribute

```bash
$ pnpm install
$ pnpm build:lib
$ pnpm start              # NgModule demo
$ pnpm start:standalone   # Standalone demo
```

Both demos available at `http://localhost:4200`

---

MIT © [Vasilis Diakomanolis](https://github.com/ihym)
