import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <mat-dialog-content [innerHTML]="safeHtml"></mat-dialog-content>

    <mat-dialog-actions>
      <button mat-stroked-button (click)="dialogRef.close(false)">
        {{ data.cancelText }}
      </button>

      <button
        mat-raised-button
        [color]="data.color"
        (click)="dialogRef.close(true)"
        cdkFocusInitial
      >
        {{ data.acceptText }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-actions {
        flex-wrap: nowrap;
        justify-content: flex-end;
      }
    `,
  ],
})
export class FatConfirmBoxComponent {
  safeHtml!: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<FatConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer
  ) {
    this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.data.message);
  }
}
