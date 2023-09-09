import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { FatDialogService } from '@ferhado/angular-toolkit/dialog';
import { FatConfirmBoxComponent } from './confirm-box.component';

@Injectable({
  providedIn: 'root',
})
export class FatConfirmBoxService {
  private defaultOptions: MatDialogConfig = {
    panelClass: 'fat-confirm-dialog',
    minWidth: '300px',
    maxWidth: 'calc(220px + 20vw)',
    maxHeight: '370px',
    disableClose: false,
  };

  private defaultData = {
    message: '',
    cancelText: 'No',
    acceptText: 'Yes',
    color: 'warn',
  };

  constructor(private dialog: FatDialogService) {}

  open(
    message: string,
    options?: {
      cancelText?: string;
      acceptText?: string;
      color?: 'primary' | 'accent' | 'warn';
    },

    dialogOptions?: MatDialogConfig
  ) {
    dialogOptions = { ...this.defaultOptions, ...dialogOptions };
    dialogOptions.data = { ...this.defaultData, ...options, message };

    return this.dialog.open(FatConfirmBoxComponent, dialogOptions);
  }
}
