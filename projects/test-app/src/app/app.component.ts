import { Component, OnInit } from '@angular/core';
import { FatConfirmBoxService } from '@ferhado/angular-toolkit/confirm-box';
import { FatDialogService } from '@ferhado/angular-toolkit/dialog';
import { FatHttpService } from '@ferhado/angular-toolkit/http';
import { FatToastService } from '@ferhado/angular-toolkit/toast';
import { FatTranslatorService } from '@ferhado/angular-toolkit/translator';
import { DialogTestComponent } from './components/dialog-test.component';
import { TRANSLATION_OBJECT } from './lang';

@Component({
  selector: 'fat-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  isLoadingCustom: boolean = false;
  userData: any = {
    name: 'John',
    age: 32,
  };

  productsList: any = [];

  constructor(
    private httpService: FatHttpService,
    private fcb: FatConfirmBoxService,
    public tr: FatTranslatorService,
    private toastService: FatToastService,
    private dialog: FatDialogService
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
      .post(
        'products/add',
        {
          id: 1,
          title: 'iPhone 9',
          description: 'An apple mobile which is nothing like apple',
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: 'Apple',
          category: 'smartphones',
          thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/1/1.jpg',
            'https://i.dummyjson.com/data/products/1/2.jpg',
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          ],
        },
        { loadingTag }
      )
      .subscribe(({ products }: any) => {
        this.productsList = [...this.productsList, ...products];
        if (loadingTag) this.showCustomMessage();
        else this.toastService.success('Operation failed');
      });

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

  editUser() {
    this.dialog
      .open(DialogTestComponent, { data: { ...this.userData } })
      .then((data) => {
        Object.assign(this.userData, data);
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
