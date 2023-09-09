import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FatHttpModule } from '@ferhado/angular-toolkit/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FatTranslatorModule,
  FatTranslatorService,
} from '@ferhado/angular-toolkit/translator';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';
import { ProductsComponent } from './components/products.component';

import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

// Arabic
import localeAr from '@angular/common/locales/ar';
import localeArExtra from '@angular/common/locales/extra/ar';

// English
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';

import { registerLocaleData } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FatLocaleModule } from '@ferhado/angular-toolkit/core';

registerLocaleData(localeDe, localeDeExtra);
registerLocaleData(localeAr, localeArExtra);
registerLocaleData(localeEn, localeEnExtra);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FatHttpModule.init({ apiEndpointUrl: 'https://dummyjson.com/' }),
    FatTranslatorModule.init({
      allowedLangs: ['en', 'de'],
    }),

    LoadingSpinnerComponent,
    ProductsComponent,

    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FatLocaleModule.init({
      currency: '€',
      dateFormat: 'dd.MM.yy',
    }),
    MatDatepickerModule,
    MatFormFieldModule,
  ],

  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (t: FatTranslatorService) => t.currentLang,
      deps: [FatTranslatorService],
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
