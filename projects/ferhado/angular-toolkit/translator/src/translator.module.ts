import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FatTranslatorPipe } from './translator.pipe';

@NgModule({
  declarations: [FatTranslatorPipe],
  exports: [FatTranslatorPipe],
})
export class FatTranslatorModule {
  static init(configOptions?: {
    allowedLangs?: string[];
    defaultLang?: string;
    localeProvider?: Provider;
  }): ModuleWithProviders<FatTranslatorModule> {
    return {
      ngModule: FatTranslatorModule,
      providers: [
        { provide: 'FAT_TRANSLATOR_CONFIG', useValue: configOptions },
      ],
    };
  }
}
