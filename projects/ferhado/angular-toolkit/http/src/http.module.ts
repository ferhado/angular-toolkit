import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FatHttpLoadingInterceptor } from './http.loading.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FatHttpLoadingInterceptor,
      multi: true,
    },
  ],
})
export class FatHttpModule {
  static init(FatHttpConfig?: {
    apiEndpointUrl?: string;
  }): ModuleWithProviders<FatHttpModule> {
    return {
      ngModule: FatHttpModule,
      providers: [{ provide: 'FAT_HTTP_CONFIG', useValue: FatHttpConfig }],
    };
  }
}
