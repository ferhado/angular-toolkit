import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FatHttpLoadingService } from './http.loading.service';
import { LOADING_TAG } from './http.service';

@Injectable()
export class FatHttpLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: FatHttpLoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const loadingTag = req.context.get(LOADING_TAG);
    this.loadingService.startLoading(loadingTag);

    return next
      .handle(req)
      .pipe(finalize(() => this.loadingService.stopLoading(loadingTag)));
  }
}
