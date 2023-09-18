import {
  DEFAULT_CURRENCY_CODE,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FatDateAdapter } from './date-adapter';

export const FAT_LOCALE_CONFIG = new InjectionToken('fat-locale.config');

interface FatLocaleConfig {
  currency?: string;
  dateFormat?: string;
}

@NgModule()
export class FatLocaleModule {
  public static forRoot(
    config: FatLocaleConfig
  ): ModuleWithProviders<FatLocaleModule> {
    return {
      ngModule: FatLocaleModule,
      providers: [
        {
          provide: FAT_LOCALE_CONFIG,
          useValue: config,
        },
        {
          provide: DateAdapter,
          useClass: FatDateAdapter,
          deps: [MAT_DATE_LOCALE],
        },
        {
          provide: MAT_DATE_FORMATS,
          useFactory: (config: FatLocaleConfig) => ({
            parse: { dateInput: config.dateFormat || 'mediumDate' },
            display: {
              dateInput: config.dateFormat || 'mediumDate',
              monthLabel: 'MMMM',
              monthYearLabel: 'MMM YYYY',
              dateA11yLabel: 'LL',
              monthYearA11yLabel: 'MMMM YYYY',
            },
          }),
          deps: [FAT_LOCALE_CONFIG],
        },
        {
          provide: DEFAULT_CURRENCY_CODE,
          useFactory: (config: FatLocaleConfig) => config.currency || '$',
          deps: [FAT_LOCALE_CONFIG],
        },
      ],
    };
  }
}
