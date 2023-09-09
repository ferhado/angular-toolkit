# @ferhado/angular-toolkit/dialog

> **Important Note:** Before using `FatDialogService`, please note:
>
> This service relies on Angular Material for its functionality.
> Ensure that you have imported `MatDialogModule` in your AppModule since the service is provided at the root level.

### Description

The `FatDialogService` simplifies Angular Material dialog management and seamlessly handles navigation history in your Angular applications.

### Main Feature: Navigation Handling

With the `FatDialogService`, dialogs are smoothly managed during navigation:

- **Smart Registration**: The service registers opened dialogs in the navigation history and closes them as needed. This ensures a more intuitive and seamless user experience compared to native Angular Material's `closeOnNavigation`, which closes all opened dialogs indiscriminately.

## Installation

```bash
npm @ferhado/angular-toolkit
```

### Usage

```typescript
import { Component } from "@angular/core";
import { FatDialogService } from "@ferhado/angular-toolkit/dialog";

@Component({
  selector: "app-your-component",
  template: '<button (click)="openDialog()">Open Dialog</button>',
})
export class YourComponent {
  constructor(private fatDialogService: FatDialogService) {}

  openDialog() {
    // Define custom dialog options here
    const dialogOptions = {
      // Your custom options
    };

    // Open a dialog and get a reference
    const dialog = this.fatDialogService.open(DialogComponent, dialogOptions);

    // Example 1: Handling data provided after the dialog is closed
    dialog.then((result) => {
      // Handle data when provided after the dialog is closed
    });

    // Example 2: Using then with an object for success and failure callbacks
    dialog.then({
      next: (result) => {
        // Handle data when provided after the dialog is closed
      },
      fail: (result) => {
        // Handle the case when no data is provided after the dialog is closed
      },
    });
  }
}
```

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
