import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CurrencyConverterFormComponent } from './currency-converter-form/currency-converter-form.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
    CurrencyConverterFormComponent,
  ],
  declarations: [HeaderComponent, NotFoundComponent, CurrencyConverterFormComponent]
})
export class CoreModule { }
