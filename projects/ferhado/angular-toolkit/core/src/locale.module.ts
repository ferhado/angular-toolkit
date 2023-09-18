import {
  DEFAULT_CURRENCY_CODE,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FatDateAdapter } from './date-adapter';

@NgModule()
export class FatLocaleModule {
  public static init(config?: {
    currency?: string;
    dateFormat?: any;
  }): ModuleWithProviders<any> {
    return {
      ngModule: FatLocaleModule,
      providers: [
        {
          provide: DateAdapter,
          useClass: FatDateAdapter,
          deps: [MAT_DATE_LOCALE],
        },
        {
          provide: MAT_DATE_FORMATS,
          useValue: {
            parse: { dateInput: config?.dateFormat || 'mediumDate' },
            display: {
              dateInput: config?.dateFormat || 'mediumDate',
              monthLabel: 'MMMM',
              monthYearLabel: 'MMM YYYY',
              dateA11yLabel: 'LL',
              monthYearA11yLabel: 'MMMM YYYY',
            },
          },
        },
        {
          provide: DEFAULT_CURRENCY_CODE,
          useValue: config?.currency || '$',
        },
      ],
    };
  }
}
