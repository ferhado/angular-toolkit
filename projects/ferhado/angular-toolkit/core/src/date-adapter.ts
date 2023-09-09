import { DatePipe } from '@angular/common';
import { NativeDateAdapter } from '@angular/material/core';

const UTC_TIMEZONE = 'utc';

function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  return Array.from({ length }, (_, i) => valueFunction(i));
}

function createDtf(locale: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: UTC_TIMEZONE,
  });
}

export class FatDateAdapter extends NativeDateAdapter {
  private formatDate(dtf: Intl.DateTimeFormat, date: Date): string {
    const d = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
    return dtf.format(d);
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const dtf = createDtf(this.locale, { weekday: 'short' });
    return range(7, (i) => this.formatDate(dtf, new Date(2017, 0, i + 1)));
  }

  override getDateNames(): string[] {
    const dtf = createDtf(this.locale, { day: '2-digit' });
    return range(31, (i) => this.formatDate(dtf, new Date(2017, 0, i + 1)));
  }

  override format(date: any, displayFormat: any): any {
    return new DatePipe(this.locale).transform(date, displayFormat);
  }
}
