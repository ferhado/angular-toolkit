import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'fat-toast-container',
  template: ` <div [innerHTML]="safeHtml"></div> `,
  standalone: true,
  host: {
    '(click)': 'snackRef.dismiss()',
    class: 'fat-toast-container',
  },

  styles: [
    `
      .fat-toast-container {
        display: flex;
        padding: 14px 16px;
      }

      .fat-toast-success,
      .fat-toast-warning,
      .fat-toast-error {
        justify-content: flex-end !important;

        .mdc-snackbar__label,
        .mdc-snackbar__surface {
          padding: 0 !important;
        }

        .mdc-snackbar__surface {
          max-width: 344px !important;
        }
      }

      .mat-mdc-snack-bar-container.fat-toast-success {
        --mat-mdc-snack-bar-button-color: #fff;
        --mdc-snackbar-container-color: #28a745;
        --mdc-snackbar-supporting-text-color: #fff;
      }

      .mat-mdc-snack-bar-container.fat-toast-warning {
        --mat-mdc-snack-bar-button-color: #000;
        --mdc-snackbar-container-color: #ffc107;
        --mdc-snackbar-supporting-text-color: #000;
      }

      .mat-mdc-snack-bar-container.fat-toast-error {
        --mat-mdc-snack-bar-button-color: #fff;
        --mdc-snackbar-container-color: #dc3545;
        --mdc-snackbar-supporting-text-color: #fff;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FatToastComponent {
  safeHtml!: SafeHtml;

  constructor(
    public snackRef: MatSnackBarRef<FatToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public message: string,
    private _sanitizer: DomSanitizer
  ) {
    this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.message);
  }
}
