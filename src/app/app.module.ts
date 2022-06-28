import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ServiceWorkerModule } from '@angular/service-worker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { CurrencyExchangeRequestService } from './shared/service/currency-exchange-request.service';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    ChartsModule,
    FormsModule
  ],
  providers: [CurrencyExchangeRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
