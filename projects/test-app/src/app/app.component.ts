import { Component, OnInit } from '@angular/core';
import { FatConfirmBoxService } from '@ferhado/angular-toolkit/confirm-box';
import { FatHttpService } from '@ferhado/angular-toolkit/http';
import { FatToastService } from '@ferhado/angular-toolkit/toast';
import { FatTranslatorService } from '@ferhado/angular-toolkit/translator';
import { TRANSLATION_OBJECT } from './lang';

@Component({
  selector: 'fat-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  isLoadingCustom: boolean = false;

  productsList: any = [];

  constructor(
    private httpService: FatHttpService,
    private fcb: FatConfirmBoxService,
    public tr: FatTranslatorService,
    private toastService: FatToastService
  ) {
    this.tr.setTranslations(TRANSLATION_OBJECT[this.tr.currentLang]);
  }

  ngOnInit(): void {
    this.httpService.loading.subscribe(
      ({ request }) => (this.isLoading = request)
    );

    this.httpService.loading.subscribe(
      ({ product }) => (this.isLoadingCustom = product)
    );

    this.testHttp();
  }

  testHttp(loadingTag = '') {
    this.httpService
      .get(
        'products',
        {
          limit: 1,
          skip: this.productsList.length,
        },
        { loadingTag }
      )
      .subscribe(({ products }: any) => {
        this.productsList = [...this.productsList, ...products];
        if (loadingTag) this.showCustomMessage();
        else this.toastService.success('Operation failed');
      });
  }

  onConfirm() {
    const message = `
      <h5 class="mb-3 text-warning">Attention!</h5>
      <h6 class="mb-2">Do you really want to delete?</h6>
      <p>Please note that this action is irreversible and the data will be permanently deleted.</p>
    `;

    this.fcb
      .open(message, { acceptText: 'Yop', cancelText: 'Nop', color: 'primary' })
      .then({
        next: (r) => console.log('next: ' + r),
        fail: (r) => console.log('fail: ' + r),
      });
  }

  showCustomMessage() {
    const htmlMessage = `
      <div class="alert alert-primary" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p >Aww yeah, you successfully read this important alert message.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
    `;

    this.toastService.notify(htmlMessage, {
      duration: 5000,
      panelClass: 'fat-toast-error',
    });
  }

  setLanguage(lang: string) {
    this.tr.setLang(lang);
  }
}
