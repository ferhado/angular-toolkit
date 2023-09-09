# @fathado/angular-toolkit/toast

> **Important Note:** Before using `FatToastService`, please note:
>
> This service relies on Angular Material for its functionality.
> Ensure that you have imported `MatSnackBarModule` in your AppModule since the service is provided at the root level.

## Description

An Angular service for displaying toast notifications in Angular applications. The service provides methods to display success, warning, and error messages using Angular Material's `MatSnackBar`.

## Installation

To install the package, run the following command:

```bash
npm install @fathado/angular-toolkit
```

## Usage

### Import Module

First, import the `FatToastModule` into your Angular module:

```typescript
import { FatToastModule } from "@fathado/angular-toolkit/toast";

@NgModule({
  imports: [FatToastModule, MatSnackBarModule],
})
export class AppModule {}
```

### Use in Components

Inject the `FatToastService` into your component to use its methods:

```typescript
import { FatToastService } from "@fathado/angular-toolkit/toast";
import { MatSnackBarModule } from "@angular/material/snack-bar";

export class AppComponent {
  constructor(private toastService: FatToastService) {}

  showSuccess() {
    this.toastService.success("Operation successful");
  }

  showWarning() {
    this.toastService.warning("Operation might be risky");
  }

  showError() {
    this.toastService.error("Operation failed");
  }
}
```

### Use HTML Content in Components

The `FatToastService` also accepts HTML content for more advanced styling. You can use Bootstrap classes or your own custom styles.

```typescript
import { FatToastService } from "@fathado/angular-toolkit/toast";

export class AppComponent {
  constructor(private toastService: FatToastService) {}

  showCustomMessage() {
    const htmlMessage = `
      <div class="alert alert-primary" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
    `;

    this.toastService.notify(htmlMessage, { duration: 5000, panelClass: "custom-panel-class" });
  }
}
```

In this example, we use Bootstrap classes like `alert` and `alert-heading` to style the toast message. The `showCustomMessage` method uses the `notify` function of `FatToastService` to display the custom HTML message.

### Toast Types

The service provides the following methods to display different types of toast messages:

- `success(message: string)`: Displays a success message.
- `warning(message: string)`: Displays a warning message.
- `error(message: string)`: Displays an error message.

Each method accepts a string message as an argument.

## Customization

The service uses default configurations for displaying the toast messages. You can customize the appearance by modifying the `MatSnackBarConfig` values.

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
