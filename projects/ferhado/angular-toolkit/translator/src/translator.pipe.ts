import { Pipe, PipeTransform } from '@angular/core';
import { FatTranslatorService } from './translator.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class FatTranslatorPipe implements PipeTransform {
  constructor(private _translate: FatTranslatorService) {}

  transform(key: any) {
    if (!key) return '__Error';

    return this._translate.translate(key);
  }
}
