export interface ExchangeCurrency {
  code: string;
  title: string;
}

export interface PopolarCurrenciesResponseModel {
  base: string;
  rates: string[];
  amount: number;
}

export interface CurrencyConversionResponseModel {
  info: CurrencyInfo;
  query: CurrencyExchangeQuery;
  result: number;
}

export interface CurrencyInfo{
  rate:number;
}

export interface CurrencyExchangeQuery{
  amount:number;
  from:string;
  to:string;
}
