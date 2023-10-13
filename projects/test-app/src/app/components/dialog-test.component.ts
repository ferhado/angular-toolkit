import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-test',
  template: `
    <mat-dialog-content>
      <form #f="ngForm" (ngSubmit)="onSubmit(f)" id="user-form">
        <label for="">Name</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          [(ngModel)]="matData.name"
          required
        />
        <br />
        <label for="">Age</label>
        <input
          type="text"
          name="age"
          placeholder="age"
          [(ngModel)]="matData.age"
          required
        />
      </form>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close>Abbrechen</button>

      <button mat-raised-button color="primary" form="user-form">
        Speichern
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
})
export class DialogTestComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public matData: any,
    private dialogRef: MatDialogRef<DialogTestComponent>
  ) {}

  onSubmit(form: NgForm) {
    const data = form.value;

    if (form.valid) {
      this.dialogRef.close(data);
    }
  }
}
