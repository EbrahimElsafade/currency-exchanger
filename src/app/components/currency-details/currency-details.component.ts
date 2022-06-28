import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CurrencyExchangeRequestService } from 'src/app/shared/service/currency-exchange-request.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss'],
  providers: [DatePipe]
})
export class CurrencyDetailsComponent implements OnInit {
  parentMessage: boolean = false;
  currenciesName: string;
  currencyName: string;
  fromParam = this.route.snapshot.paramMap.get('from');
  toParam = this.route.snapshot.paramMap.get('to');
  fromDate: any = new Date();
  toDate: any = new Date();
  currencyHistory: string[];
  months = [];
  values = [];
  chartData = {}


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public currencyExchangeService: CurrencyExchangeRequestService,
  ) {

  }

  ngOnInit() {
    this.getAllCurrenciesName();
    this.getCurrenciesHestory();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.fromParam = this.route.snapshot.paramMap.get('from');
        this.toParam = this.route.snapshot.paramMap.get('to');
        this.fromDate = new Date();
        this.toDate = new Date();
        this.getAllCurrenciesName();
        this.getCurrenciesHestory();
      }
    });
  }

  //charts data I should remove static data
  public lineChartType: ChartType = 'line';
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Currancy', stack: 'c' }
  ];


  //here I was thinking to get all currencies name from the form the child component to reduce server requests but I think we need to subscribe here because if user came from header
  //method to get all currencies name then to display filtered currency's name
  getAllCurrenciesName() {
    this.currencyExchangeService.getExchangeCurrency().subscribe(results => {
      this.currenciesName = results.symbols;
      this.currencyName = this.currenciesName[this.fromParam];
    });
  }

  //get all currancy hestory and filter it into array of 12 months than map end of every month with incoming data
  getCurrenciesHestory() {
    this.fromDate = new Date(this.toDate.getFullYear() - 1, this.toDate.getMonth() + 1, this.toDate.getDay())
    this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    this.currencyExchangeService.getCurrenciesHistory(this.fromDate, this.toDate, this.fromParam, this.toParam).subscribe(results => {
      this.currencyHistory = results.rates;

      if (this.currencyHistory) {

        for (var i = 1; i <= 12; i++) {
          var currentDate = new Date();
          var pastYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth() + 1, currentDate.getDay());
          var lastDayOfMonth = new Date(pastYearDate.getFullYear(), pastYearDate.getMonth() + i, 0);
          if (lastDayOfMonth > currentDate) {
            lastDayOfMonth = currentDate
          }
          let formattedDate = this.datePipe.transform(lastDayOfMonth, 'yyyy-MM-dd')
          this.months.push(formattedDate);

          let pushedValues = this.currencyHistory[formattedDate][this.toParam]
          this.values.push(pushedValues);
        }
        this.chartData = [{
          data: this.values,
          label: 'Currancy', stack: 'c'
        }];
      }
    });
  }

}
