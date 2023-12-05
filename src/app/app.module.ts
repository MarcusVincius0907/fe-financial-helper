import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTransactionsModule } from './list-transactions/list-transactions.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ListTransactionsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
