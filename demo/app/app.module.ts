import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeagoModule } from 'ngx-timeago';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimeagoModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
