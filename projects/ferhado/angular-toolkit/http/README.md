# @ferhado/angular-toolkit/http

## Overview

A robust HTTP service for Angular, offering simplified HTTP methods, loading state management, and more.

## Installation

```bash
npm install @ferhado/angular-toolkit
```

## Features

- Simplified HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`)
- Loading state management
- Upload progress bar
- Customizable options
- Uploading files

## Usage

### Setup

Import `FatHttpModule` and configure:

```typescript
import { FatHttpModule } from "@ferhado/angular-toolkit/http";

@NgModule({
  imports: [FatHttpModule.forRoot({ apiEndpointUrl: "https://dummyjson.com/" })],
})
export class AppModule {}
```

### Requests

Inject `httpService`:

```typescript
constructor(private httpService: FatHttpService) {}
```

#### GET

```typescript
this.httpService.get<T>("url").subscribe();
```

#### POST

```typescript
this.httpService.post<T>("url", params).subscribe();
```

### Options

Customize requests with `FatHttpRequestOptions`:

```typescript
const options: FatHttpRequestOptions = {
  headers: new HttpHeaders({ "Custom-Header": "value" }),
  loadingTag: "customTag",
};

this.httpService.get<T>("url", null, options).subscribe();
```

### Uploads

```typescript
const files: File[] = [
  /* File list */
];
this.httpService.upload<T>("url", files).subscribe();
```

### Loading & Progress

Default:

```typescript
this.httpService.loading.subscribe(({ isLoading }) => (this.isLoading = isLoading));
```

Upload:

```typescript
this.httpService.loading.subscribe(({ isUploading }) => (this.isLoading = isUploading));
```

Custom:

```typescript
this.httpService.loading.subscribe(({ YourCustomeLoadingTag }) => (this.isLoadingCustom = YourCustomeLoadingTag));
```

ProgressBar:

```typescript
this.httpService.progress.subscribe((progress) => console.log(`Upload progress: ${progress}%`));
```

## API

### `FatHttpRequestOptions`

- `headers`: HttpHeaders
- `params`: HttpParams
- `loadingTag`: string

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
