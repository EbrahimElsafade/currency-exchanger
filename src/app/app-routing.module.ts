import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/currency-converter',
    pathMatch: 'full',
  },
   { path: 'currency-converter', component: CurrencyConverterComponent },
   { path: 'currency-details/:amount/:from/:to', component: CurrencyDetailsComponent },
   { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
