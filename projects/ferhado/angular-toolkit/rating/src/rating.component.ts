import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fat-rating',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      class="fat-rating"
      style="--fat-rating-size:  {{ size }}; --fat-rating-space: {{
        this.space
      }}"
    >
      <svg
        *ngFor="let star of fullStarArray"
        class="fat-rating-star"
        viewBox="0 0 25 25"
      >
        <polygon
          [attr.points]="points"
          [attr.fill]="color"
          [attr.stroke]="color"
        ></polygon>
      </svg>

      <svg *ngIf="partialStar > 0" class="fat-rating-star" viewBox="0 0 25 25">
        <polygon
          [attr.points]="points"
          [attr.fill]="color"
          [attr.stroke]="color"
          [attr.clip-path]="'inset(0 ' + (1 - partialStar) * 100 + '% 0 0)'"
        ></polygon>
        <polygon
          [attr.points]="points"
          fill="white"
          [attr.stroke]="color"
          [attr.clip-path]="'inset(0 0 0 ' + partialStar * 100 + '%)'"
        ></polygon>
      </svg>

      <svg
        *ngFor="let star of emptyStarArray"
        class="fat-rating-star"
        viewBox="0 0 25 25"
      >
        <polygon
          [attr.points]="points"
          fill="white"
          [attr.stroke]="color"
        ></polygon>
      </svg>
    </div>
  `,

  styles: [
    `
      .fat-rating {
        --fat-rating-space: 5px;
        --fat-rating-size: 25px;
        display: flex;
        gap: var(--fat-rating-space);
      }

      .fat-rating-star {
        width: var(--fat-rating-size);
        height: var(--fat-rating-size);
      }
    `,
  ],
})
export class FatRating implements OnInit {
  @Input() maxStars: number = 5;
  @Input() stars: number = 0;
  @Input() color: string = '#db5e04';
  @Input() size: string = '16px';
  @Input() space: string = '1px';

  fullStarArray: number[] = [];
  emptyStarArray: number[] = [];
  fullStars: number = 0;
  partialStar: number = 0;
  points: string =
    '12.5,2.5 16,9.5 25,9.5 18,15 20,25 12.5,20 5,25 7,15 0,9.5 9,9.5';

  ngOnInit() {
    this.updateStars();
  }

  ngOnChanges() {
    this.updateStars();
  }

  updateStars() {
    this.stars = Math.min(Math.max(this.stars, 0), this.maxStars);
    this.fullStars = Math.floor(this.stars);
    this.partialStar = this.stars - this.fullStars;
    this.fullStarArray = Array(this.fullStars).fill(0);
    this.emptyStarArray = Array(this.maxStars - Math.ceil(this.stars)).fill(0);
  }
}
