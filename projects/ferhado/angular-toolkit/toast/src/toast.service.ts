import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FatToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class FatToastService {
  private defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  private _getConfig(duration: number, panelClass: string): MatSnackBarConfig {
    return {
      duration,
      panelClass: [panelClass],
    };
  }

  success(message: string) {
    this.notify(message, this._getConfig(1000, 'fat-toast-success'));
  }

  warning(message: string) {
    this.notify(message, this._getConfig(1500, 'fat-toast-warning'));
  }

  error(message: string) {
    this.notify(message, this._getConfig(10000, 'fat-toast-error'));
  }

  notify(message: string, config: MatSnackBarConfig) {
    this.snackBar.openFromComponent(FatToastComponent, {
      data: message,
      ...this.defaultConfig,
      ...config,
    });
  }
}
