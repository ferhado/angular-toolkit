import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';

const DEFAULT_LANG = 'en';
const DEFAULT_DIR = 'ltr';
const ALLOWED_LANGS = ['en'];

const RTL_LANGS = new Set([
  'ar',
  'fa',
  'ur',
  'he',
  'ps',
  'ku',
  'sd',
  'yi',
  'ms',
]);

export const FAT_LANG_STORAGE_KEY = 'fat.x-lang';

@Injectable({
  providedIn: 'root',
})
export class FatTranslatorService {
  private translations: Record<string, any> = {};
  public currentLang: string;
  public textDirection: 'ltr' | 'rtl' = DEFAULT_DIR;
  private validLangs: Set<string>;

  private _onLangChange: EventEmitter<any> = new EventEmitter();

  get onLangChange(): EventEmitter<any> {
    return this._onLangChange;
  }

  getLang(): string {
    return this.currentLang;
  }

  constructor(
    @Optional()
    @Inject('FAT_TRANSLATOR_CONFIG')
    config?: {
      allowedLangs?: string[];
      defaultLang?: string;
    }
  ) {
    this.validLangs = new Set(config?.allowedLangs || ALLOWED_LANGS);

    const storedLang: string =
      localStorage.getItem(FAT_LANG_STORAGE_KEY) ??
      config?.defaultLang ??
      DEFAULT_LANG;

    this.currentLang = this.isValidLang(storedLang) ? storedLang : DEFAULT_LANG;
    localStorage.setItem(FAT_LANG_STORAGE_KEY, this.currentLang);

    this.onLangChange.next(this.currentLang);
    this.setDirectionAndLang(this.currentLang);
  }

  isValidLang(lang: string): boolean {
    return this.validLangs.has(lang);
  }

  addTranslation(key: string, value: any): void {
    this.translations[key] = value;
  }

  setTranslations(value: Record<string, any>): void {
    this.translations = value;
  }

  setLang(lang: string, reload = true): void {
    if (this.currentLang !== lang && this.isValidLang(lang)) {
      localStorage.setItem(FAT_LANG_STORAGE_KEY, lang);
      if (reload) {
        location.reload();
        return;
      }
      this.currentLang = lang;
    }

    this.setDirectionAndLang(lang);
    this.onLangChange.emit(lang);
  }

  translate(key: string): string {
    try {
      const keySegments = key.split('.');
      let result: any = this.translations;
      for (const segment of keySegments) {
        result = result[segment];
      }
      return result ?? `__${key}`;
    } catch (error) {
      return `__${key}`;
    }
  }

  private setDirectionAndLang(lang: string): void {
    this.textDirection = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
    const htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.setAttribute('dir', this.textDirection);
    htmlElement.setAttribute('lang', this.currentLang);
  }
}
