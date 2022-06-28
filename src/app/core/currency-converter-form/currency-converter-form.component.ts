import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CurrencyExchangeRequestService } from '../../shared/service/currency-exchange-request.service';
import { CurrencyConversionResponseModel, PopolarCurrenciesResponseModel } from 'src/app/shared/interface/exchange-rates.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss']
})
export class CurrencyConverterFormComponent implements OnInit {
  changeCurrencyForm: FormGroup;
  currency: string[];
  @Output() currencyName: EventEmitter<string[]> = new EventEmitter();
  popolarCurrencies: string[] = ['USD', 'EGP', 'JPY', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY'];
  amount: number;
  from: string;
  to: string;
  amountParam: string;
  fromParam: string;
  toParam: string;
  submitted: boolean = false;
  isSelected: boolean = false;
  convertedCurrency: CurrencyConversionResponseModel;

  @Input() childMessage: boolean;
  @Output() popolarCurrenciesResponceOutput: EventEmitter<PopolarCurrenciesResponseModel> = new EventEmitter();

  constructor(
    public currencyExchangeService: CurrencyExchangeRequestService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder

  ) {
    //define new form
    this.changeCurrencyForm = new FormGroup({
      amount: new FormControl(),
      from: new FormControl(),
      to: new FormControl()
    });
  }

  ngOnInit() {
    this.getCurrency();
    //add validation to the form
    this.changeCurrencyForm = this.formBuilder.group({
      amount: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]

    });
    this.setParams();
    //this route code used to watch if there is any change on the URL
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.amountParam = this.route.snapshot.queryParamMap.get('amount');
        this.amountParam = this.route.snapshot.queryParamMap.get('from');
        this.amountParam = this.route.snapshot.queryParamMap.get('to');
        this.setParams();
      }
    });
  }
  //helps us to catch the form inputs
  get form() {
    return this.changeCurrencyForm.controls;
  }

  //get all dropdowns currency data from API
  getCurrency() {
    this.currencyExchangeService.getExchangeCurrency().subscribe(results => {
      this.currency = Object.keys(results.symbols);
      this.currencyName.emit(results.symbols);;
    })
  }

  //used on details page to set data to the form
  setParams() {
    this.amountParam = this.route.snapshot.paramMap.get('amount');
    this.fromParam = this.route.snapshot.paramMap.get('from');
    this.toParam = this.route.snapshot.paramMap.get('to');
    if (this.amountParam && this.fromParam && this.toParam) {
      this.changeCurrencyForm.patchValue({
        amount: this.amountParam,
        from: this.fromParam,
        to: this.toParam
      });
    }
    if (this.fromParam) {
      this.isSelected = true;
    }
  }

  //here we check if form input is valid and get data from the form to call the API and get the currency rate then we call API agian to show the most 9 popolar currenies
  convertCurrency() {
    this.submitted = true;
    if (this.changeCurrencyForm.invalid) {
      return;
    }
    this.amount = this.changeCurrencyForm.get('amount').value
    this.from = this.changeCurrencyForm.get('from').value
    this.to = this.changeCurrencyForm.get('to').value

    this.currencyExchangeService.convertCurrencyRate(this.from, this.to, this.amount).subscribe(results => {
      this.convertedCurrency = results
    })

    this.currencyExchangeService.getPopolarCurrencies(this.from, this.popolarCurrencies.join(',')).subscribe(results => {
      results.amount = this.amount;
      this.popolarCurrenciesResponceOutput.emit(results);
    })

  }

  //switch between from and to inputs
  switchSelectedValue() {
    this.from = this.changeCurrencyForm.get('from').value
    this.to = this.changeCurrencyForm.get('to').value

    if (this.from && this.to) {
      this.changeCurrencyForm.patchValue({
        from: this.to,
        to: this.from
      });
    }
  }

}
