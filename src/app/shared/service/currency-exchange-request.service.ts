import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';
import { ExchangeCurrency, CurrencyConversionResponseModel, PopolarCurrenciesResponseModel } from '../interface/exchange-rates.model';

@Injectable()
export class CurrencyExchangeRequestService {

  headers= new HttpHeaders()
  .set('apikey', environment.exchangeRatesAPIKey);

    constructor(public http: HttpClient) {}

    public getExchangeCurrency(): Observable<any> {
     return this.http.get<any>(`${environment.exchangeRatesAPIUrl}symbols`, { 'headers': this.headers });
    }

    public getPopolarCurrencies (from:string, to:string): Observable<PopolarCurrenciesResponseModel> {
      return this.http.get<PopolarCurrenciesResponseModel>(`${environment.exchangeRatesAPIUrl}latest?symbols=${to}&base=${from}`, { 'headers': this.headers });
    }

    public convertCurrencyRate(from:string, to:string, amont:number): Observable<CurrencyConversionResponseModel> {
      return this.http.get<CurrencyConversionResponseModel>(`${environment.exchangeRatesAPIUrl}convert?to=${to}&from=${from}&amount=${amont}`, { 'headers': this.headers });
    }

    public getCurrenciesHistory(fromDate:string, toDate:string, fromCurrency:string, toCurrency:string): Observable<any>{
      return this.http.get<any>(`${environment.exchangeRatesAPIUrl}timeseries?start_date=${fromDate}&end_date=${toDate}&base=${fromCurrency}&symbols=${toCurrency}`, { 'headers': this.headers });
    }

}
