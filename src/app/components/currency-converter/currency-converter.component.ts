import { Component, OnInit } from '@angular/core';
import { PopolarCurrenciesResponseModel } from 'src/app/shared/interface/exchange-rates.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  parentMessage:boolean = true;
  amountInput:number;
  popolarCurrenciesInput;

  constructor() { }

  ngOnInit() {

  }

  //get currencies from child component
  getPopolarCurrencies($event){
    this.popolarCurrenciesInput = Object.entries($event.rates).map(([key, value]) => ({key,value}));
    this.amountInput = $event.amount;
  }
}
