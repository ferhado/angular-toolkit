# @ferhado/angular-toolkit

> **Important Note:** Before using `FatConfirmBoxService`, please note:
>
> This service relies on Angular Material for its functionality. Ensure that you have imported `MatDialogModule` in your AppModule since the service is provided at the root level.

## Description

A highly customizable and easy-to-use confirmation dialog library that leverages Angular Material Dialog for its core functionality.

## Installation

```bash
npm install @ferhado/angular-toolkit
```

## Usage

### Importing the Service

```typescript
import { FatConfirmBoxService } from '@ferhado/angular-toolkit/confirm-box';

// Inject the service in your component
constructor(private fcb: FatConfirmBoxService) {}
```

### Basic Usage

```typescript
this.fcb.open("Are you sure?").then(() => console.log("confirmed"));
```

### Advanced Usage with HTML Content and Custom Options

```typescript
const message = `
  <h5 class="mb-3 text-warning">Attention!</h5>
  <h6 class="mb-2">Do you really want to delete?</h6>
  <p>Please note that this action is irreversible and the data will be permanently deleted.</p>
`;

this.fcb
  .open(
    message,
    { acceptText: "Yop", cancelText: "Nop", color: "primary" },
    {
      /* MatDialogConfig options here */
    }
  )
  .then({
    next: (r) => console.log("next: " + r),
    fail: (r) => console.log("fail: " + r),
  });
```

### Options

You can customize the dialog by passing an `options` object with the following properties:

```typescript
options?: {
  cancelText?: string;
  acceptText?: string;
  color?: 'primary' | 'accent' | 'warn';
}
```

### Additional Dialog Configuration

Pass `MatDialogConfig` options as the third argument to the `open` method for further customization:

```typescript
dialogOptions?: MatDialogConfig
```

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
