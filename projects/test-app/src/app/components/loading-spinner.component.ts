import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'fat-loading-spinner',
  template: ` <div
    *ngIf="isLoading"
    class="fixed-top bottom-0 d-flex align-items-center justify-content-center overlay"
  >
    <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`,
  styles: [
    `
      .overlay {
        background-color: rgba(0, 0, 0, 0.5);
        color: red;
      }
    `,
  ],
  standalone: true,
  imports: [NgIf],
})
export class LoadingSpinnerComponent {
  @Input() isLoading: boolean = false;
}
