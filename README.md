# ngx-timeago [![Build Status](https://travis-ci.org/ihym/ngx-timeago.svg?branch=master)](https://travis-ci.org/ngx-timeago) [![npm version](https://badge.fury.io/js/ngx-timeago.svg)](https://badge.fury.io/js/ngx-timeago) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square)](https://renovateapp.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

Live updating timestamps in Angular 6+.

Check [demo](/demo) for a simple example.

Get the complete changelog here: https://github.com/ihym/ngx-timeago/releases

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Contribute](#contribute)
* [TODO](#todo)


## Installation

First you need to install the npm module:

```sh
npm install ngx-timeago --save
```


If you use **SystemJS** to load your files, you should adjust your configuration to point our UMD bundle:

```javascript
map: {
  ...
  'ngx-timeago': 'node_modules/ngx-timeago/bundles/ngx-timeago.umd.js'
}
```


## Usage

#### 1. Import the `TimeagoModule`:

Once installed you need to import the main module into your application module by calling TimeagoModule.forRoot(). 

Make sure you only call this method in the root module of your application, most of the time called `AppModule`.
This method allows you to configure the `TimeagoModule` by specifying a formatter, clock and/or an intl service. You should end up with code similar to this:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    BrowserModule,
    TimeagoModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### SharedModule

If you use a [`SharedModule`](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-modules) that you import in multiple other feature modules,
you can export the `TimeagoModule` to make sure you don't have to import it in every module.

```ts
@NgModule({
  exports: [
    CommonModule,
    TimeagoModule
  ]
})
export class SharedModule { }
```

> Note: Never call a `forRoot` static method in the `SharedModule`. You might end up with different instances of the service in your injector tree. But you can use `forChild` if necessary.

##### Lazy loaded modules

When you lazy load a module, you should use the `forChild` static method to import the `TimeagoModule`.

Since lazy loaded modules use a different injector from the rest of your application, you can configure them separately with a different formatter/clock/intl service.

```ts
@NgModule({
  imports: [
    TimeagoModule.forChild({
      formatter: {provide: TimeagoFormatter, useClass: CustomFormatter},
      clock: {provide: TimeagoClock, useClass: CustomClock},
      intl: {provide: TimeagoIntl, useClass: CustomIntl},
    })
  ]
})
export class LazyLoadedModule { }
```

##### Configuration

By default, there is no intl service available, as the default formatter doesn't provide language support.
You should provide one, if you end up with a formatter that needs it (either TimeagoCustomFormatter which is provided by the lib or your own). The purpose of the intl service is to contain all the necessary i18n strings used in the provided formatter (similar to how Angular Material handles i18n).

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Timeago, TimeagoIntl } from 'ngx-timeago';
import { AppComponent } from './app';

export class MyIntl extends TimeagoIntl {
// do extra stuff here...
}

@NgModule({
  imports: [
    BrowserModule,
    Timeago.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

There is support for a large number of languages out of the box. This support is based on the string objects taken from `jquery-timeago`.

To use any of the languages provided, you will have to import the language strings and feed them to the intl service.

```ts
import { Component } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import englishStrings from 'ngx-timeago/language-strings/en';

@Component({
  selector: 'app',
  template: `
    <div timeago [date]="myDate"></div>
  `
})
export class AppComponent {
  constructor(intl: TimeagoIntl) {
    Object.assign(intl, englishStrings);
    intl.changes.next();
  }
}
```

You can also customize the language strings or provide your own. Combined with the ability to provide your own formatter, you have total control of the final output.


#### 2. Use the directive:

This is how you use the **directive**:
```html
<div timeago [date]="myDate" [live]="isLive" [suffix]="hasSuffix"></div>
```

## API

#### Write your own formatter

If you want to write your own formatter, you need to create a class that implements `TimeagoFormatter`. The only required method is `parse` that must return the final `string`.

[Example](lib/src/timeago.formatter.ts)

Once you've defined your formatter, you can provide it in your configuration by adding it to its `providers` property.

```ts
@NgModule({
  imports: [
    BrowserModule,
    TimeagoModule.forRoot({
      formatter: {provide: TimeagoFormatter, useClass: CustomFormatter}
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Write your own clock

The only required method to build your own clock, is `register` that must return an `Observable<any>`. Whenever this observable emits, the timestamp will be updated, using the provided formatter (and maybe intl, if provided).

```ts
import { TimeagoClock } from 'ngx-timeago';

// ticks every 2s
export class MyClock extends TimeagoClock {
  register(then: number): Observable<number> {
    return interval(2000).pipe(startWith(0));
  }
}
```

Setup the clock in your module import by adding it to the `forRoot` (or `forChild`) configuration.

```ts
@NgModule({
  imports: [
    BrowserModule,
    TimeagoModule.forRoot({
      clock: {provide: TimeagoClock, useClass: MyClock},
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Contribute
`ngx-timeago` is packaged with [ng-packagr](https://github.com/dherges/ng-packagr) and then imported into an Angular CLI app.
To run the demo, do the following steps:

```bash
$ npm install
$ npm run build:lib
$ npm start dev
```

## TODO
* Increase test coverage
* Add TimeagoPipe
* Enhance demo (PRs are welcome!)
* Provide more sophisticated clocks/formatters (PRs are welcome too!)

***
MIT © [Vasilis Diakomanolis](https://github.com/ihym)
