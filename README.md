# ngx-timeago [![Build Status](https://travis-ci.org/ihym/ngx-timeago.svg?branch=master)](https://travis-ci.org/ihym/ngx-timeago) [![npm version](https://badge.fury.io/js/ngx-timeago.svg)](https://badge.fury.io/js/ngx-timeago) [![npm](https://img.shields.io/npm/dm/ngx-timeago.svg?maxAge=2592000)](https://www.npmjs.com/package/ngx-timeago) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

Live updating timestamps in Angular 6+.

[https://ihym.github.io/ngx-timeago/](https://ihym.github.io/ngx-timeago/)

Get the complete changelog here: https://github.com/ihym/ngx-timeago/releases

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Contribute](#contribute)


## Installation

First you need to install the npm module:

```sh
npm install ngx-timeago --save
```

Choose the version corresponding to your Angular version:

| Angular       | ngx-timeago        |
| ------------- | -------------------|
| 10            | 2.x+               |
| 6,7,8,9       | 1.x+               |

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

##### I18n

By default, there is no intl service available, as the default formatter doesn't provide language support.
You should provide one, if you end up with a formatter that needs it (either TimeagoCustomFormatter which is provided by the lib or your own). The purpose of the intl service is to contain all the necessary i18n strings used by your formatter.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Timeago, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import { AppComponent } from './app';

export class MyIntl extends TimeagoIntl {
// do extra stuff here...
}

@NgModule({
  imports: [
    BrowserModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
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
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';

@Component({
  selector: 'app',
  template: `
    <div timeago [date]="1553683912689"></div>
  `
})
export class AppComponent {
  constructor(intl: TimeagoIntl) {
    intl.strings = englishStrings;
    intl.changes.next();
  }
}
```

You can also customize the language strings or provide your own.


#### 2. Use the pipe or the directive:

This is how you do it with the **pipe**:
```html
<div>{{1553683912689 | timeago:live}}</div>
```
And in your component define live (`true` by default).

This is how you use the **directive**:
```html
<div timeago [date]="1553683912689" [live]="live"></div>
```

## API

#### Write your own formatter

If you want to write your own formatter, you need to create a class that implements `TimeagoFormatter`. The only required method is `format` that must return the final `string`.

[Example](lib/src/timeago.formatter.ts)

Once you've defined your formatter, you can provide it in your configuration.

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

The only required method to build your own clock, is `tick` that must return an `Observable<any>`. Whenever this observable emits, the timestamp will be updated, using your formatter (and intl, if available).

```ts
import { TimeagoClock } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';

// ticks every 2s
export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return interval(2000);
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

***
MIT © [Vasilis Diakomanolis](https://github.com/ihym)
