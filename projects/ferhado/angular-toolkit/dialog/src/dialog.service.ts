import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';

export type FatDiCallback = (value: any) => void;
export type FatDiCallbackObj = { next?: FatDiCallback; fail?: FatDiCallback };

@Injectable({
  providedIn: 'root',
})
export class FatDialogService {
  private dialogCloserIsOn: boolean = false;

  constructor(private dialog: MatDialog) {
    window.addEventListener('popstate', this.handlePopStateEvent);

    // Remove Empty Entries on Load
    this.handlePopStateEvent();
  }

  open(
    component: any,
    customOptions?: MatDialogConfig
  ): {
    then: (callback: FatDiCallback | FatDiCallbackObj) => void;
    ref: MatDialogRef<any>;
  } {
    const dialogOptions: MatDialogConfig = {
      panelClass: 'fat-full-modal',
      autoFocus: false,
      disableClose: true,
      closeOnNavigation: false,
      ...(customOptions as MatDialogConfig),
    };

    const onSuccess = new Subject<any>();
    const onFailure = new Subject<any>();

    const dialogRef = this.dialog.open(component, dialogOptions);

    dialogRef.afterOpened().subscribe(() => {
      history.pushState(
        { name: 'fat-dialog', id: dialogRef.id },
        'dialog-' + dialogRef.id,
        window.location.href
      );
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      this.dialogCloserIsOn = false;
      this.handlePopStateEvent();

      if (response) {
        onSuccess.next(response);
        onSuccess.complete();
      } else {
        onFailure.next(response);
        onFailure.complete();
      }
    });

    return {
      ref: dialogRef,
      then: (callback: FatDiCallback | FatDiCallbackObj) => {
        if (typeof callback === 'function') {
          onSuccess.subscribe(callback);
        } else {
          callback.next && onSuccess.subscribe(callback.next);
          callback.fail && onFailure.subscribe(callback.fail);
        }
      },
    };
  }

  closeAll() {
    this.dialog.closeAll();
  }

  private handlePopStateEvent = () => {
    const state = window.history.state;

    if (this.dialogCloserIsOn) {
      const dialogRef = this.dialog.openDialogs.pop();

      if (dialogRef) {
        dialogRef.close();
      }
    }

    // Remove Empty Entries
    if (state && state.name == 'fat-dialog') {
      if (!this.isDialogOpen(state.id)) {
        this.dialogCloserIsOn = false;
        window.history.back();
        return;
      }
    }

    this.dialogCloserIsOn = true;
  };

  private isDialogOpen(dialogId: string) {
    return this.dialog.openDialogs.map((d) => d.id).includes(dialogId);
  }
}
