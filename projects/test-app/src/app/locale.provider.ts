import { LOCALE_ID, Provider } from '@angular/core';
import { FatTranslatorService } from '@ferhado/angular-toolkit/translator';

export class LocaleId extends String {
  constructor(private localeService: FatTranslatorService) {
    super();
  }

  override toString(): string {
    return this.localeService.currentLang;
  }

  override valueOf(): string {
    return this.toString();
  }
}

export const LocaleProvider: Provider = {
  provide: LOCALE_ID,
  useClass: LocaleId,
  deps: [FatTranslatorService],
};
