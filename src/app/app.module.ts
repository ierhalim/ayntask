import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataAccessModule } from './data-access/data-access.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataAccessModule.forRoot()
  ],
  //Work arround: Maybe there should be some kind of shared module would be good to declare our pipes and provide dependencies.
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
