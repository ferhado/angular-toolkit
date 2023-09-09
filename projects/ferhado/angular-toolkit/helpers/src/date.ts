import { formatDate } from '@angular/common';
import { is } from './is';

export const date = {
  format: (
    inputDate: Date | string | number,
    format: string = 'yyyy-MM-dd',
    locale: string = 'en-US'
  ) => {
    if (!is.date(inputDate)) {
      return '';
    }

    return formatDate(inputDate, format, locale);
  },

  sqlFormat: (inputDate: Date | string | number, time = false) => {
    return date.format(inputDate, time ? 'yyyy-mm-dd HH:mm:ss' : 'yyyy-mm-dd');
  },

  dayName: (inputDate: Date | string | number, length: number = 0) => {
    if (!is.date(inputDate)) {
      return '';
    }

    const dayName = date.format(inputDate, 'EEEE');
    return (length && dayName.slice(0, length)) || dayName;
  },
};
