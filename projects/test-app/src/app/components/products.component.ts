import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'fat-products',
  template: `
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
        <div *ngFor="let product of products" class="col">
          <!--  -->
          <mat-card class="h-100">
            <div class="ratio ratio-16x9">
              <img [src]="product.thumbnail" class="w-100" />
            </div>

            <mat-card-content class="pt-3">
              <h5>{{ product.title }}</h5>
              <p class="max-line-2">{{ product.description }}</p>
              <p>{{ product.price | currency }}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .max-line-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      img {
        object-fit: cover;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class ProductsComponent {
  @Input() products!: any[];
}
