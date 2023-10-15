import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { is } from '@ferhado/angular-toolkit/helpers';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { FatHttpLoadingService } from './http.loading.service';

export const LOADING_TAG = new HttpContextToken<string>(() => 'isLoading');

export interface FatHttpRequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  body?: any;
  reportProgress?: boolean;
  withCredentials?: boolean;
  skipApiPrefix?: boolean;
  loadingTag?: string;
  observe?: 'body' | 'events' | 'response';
}

@Injectable({
  providedIn: 'root',
})
export class FatHttpService {
  private readonly progressBar: Subject<number> = new Subject();
  private readonly apiEndpointUrl: string = '';

  constructor(
    private http: HttpClient,
    private loadingService: FatHttpLoadingService,
    @Optional() @Inject('FAT_HTTP_CONFIG') config: { apiEndpointUrl?: string }
  ) {
    if (config?.apiEndpointUrl) this.apiEndpointUrl = config.apiEndpointUrl;
  }

  private makeUrl(url: string, ignorePrefix?: boolean): string {
    return ignorePrefix ? url : `${this.apiEndpointUrl}${url}`;
  }

  private makeParam(params: any): HttpParams {
    let httpParams = new HttpParams();

    if (is.object(params)) {
      let copiedParams = { ...params };

      for (let key in copiedParams) {
        if (is.array(copiedParams[key]) || is.object(copiedParams[key]))
          copiedParams[key] = JSON.stringify(copiedParams[key]);
        httpParams = httpParams.append(key, copiedParams[key]);
      }
    }

    return httpParams;
  }

  request<T>(
    method: string,
    url: string,
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    let headers =
      reqOptions?.headers ||
      new HttpHeaders({ 'Content-Type': 'application/json' });

    const finalUrl = reqOptions?.skipApiPrefix ? url : this.makeUrl(url);
    const context = new HttpContext().set(
      LOADING_TAG,
      reqOptions?.loadingTag || 'isLoading'
    );

    if (
      !headers.has('Content-Type') ||
      headers.get('Content-Type') === 'application/x-www-form-urlencoded'
    ) {
      params = this.makeParam(params);
    }

    const options: any = {
      headers,
      context,
    };

    if (method === 'GET') {
      options.params = params;
    } else {
      options.body = params;
    }

    return this.http.request<T>(method, finalUrl, {
      ...options,
      ...reqOptions,
    } as any) as Observable<T>;
  }

  get<T>(
    url: string,
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    return this.request<T>('GET', url, params, reqOptions);
  }

  post<T>(
    url: string,
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    return this.request<T>('POST', url, params, reqOptions);
  }

  put<T>(
    url: string,
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    return this.request<T>('PUT', url, params, reqOptions);
  }

  delete<T>(
    url: string,
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    return this.request<T>('DELETE', url, params, reqOptions);
  }

  patch<T>(
    url: string,
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    return this.request<T>('PATCH', url, params, reqOptions);
  }

  upload<T>(
    url: string,
    files: File[],
    params?: any,
    reqOptions?: FatHttpRequestOptions
  ): Observable<T> {
    const finalReqOptions: FatHttpRequestOptions = {
      loadingTag: 'isUploading',
      reportProgress: true,
      observe: 'events',
      ...reqOptions,
    };

    const formData = new FormData();

    if (files.length === 1) {
      formData.append('file', files[0]);
    } else {
      for (let file of files) formData.append('files[]', file);
    }

    if (is.object(params)) {
      for (let key in params) formData.append(key, params[key]);
    }

    return this.request<HttpEvent<any>>(
      'POST',
      url,
      formData,
      finalReqOptions
    ).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // Compute and show the % done:
            if (event.total) {
              const percentDone = Math.round(
                (100 * event.loaded) / event.total
              );
              this.progressBar.next(percentDone);
            }
            break;
          case HttpEventType.Response:
            return event.body;
        }
      }),

      filter((response) => response !== undefined),
      catchError((error: HttpErrorResponse) => {
        this.progressBar.next(0);
        return throwError(() => error);
      })
    );
  }

  get progress(): Observable<number> {
    return this.progressBar.asObservable();
  }

  get loading() {
    return this.loadingService.loadingSubject.asObservable();
  }
}
