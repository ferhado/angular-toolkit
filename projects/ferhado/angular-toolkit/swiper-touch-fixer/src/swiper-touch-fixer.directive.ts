import { Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[fat-swiper-touch-fixer]',
  standalone: true,
})
export class FatSwiperElementsTouchFixer implements OnDestroy {
  private initialX: number | null = null;
  private initialY: number | null = null;
  private touchMoveSubscription!: Subscription;

  constructor(private el: ElementRef, private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.touchMoveSubscription = fromEvent<TouchEvent>(
        this.el.nativeElement,
        'touchmove',
        {
          passive: false,
        }
      ).subscribe((e) => this.handleTouchMove(e));

      this.el.nativeElement.addEventListener(
        'touchstart',
        this.handleTouchStart.bind(this),
        {
          passive: true,
        }
      );
    });
  }

  handleTouchStart(e: TouchEvent): void {
    if (e.touches?.length > 0) {
      this.initialX = e.touches[0].clientX;
      this.initialY = e.touches[0].clientY;
    }
  }

  handleTouchMove(e: TouchEvent): void {
    if (
      this.initialX === null ||
      this.initialY === null ||
      !e.touches ||
      e.touches.length === 0
    ) {
      return;
    }

    const deltaX = e.touches[0].clientX - this.initialX;
    const deltaY = e.touches[0].clientY - this.initialY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }

  ngOnDestroy(): void {
    this.touchMoveSubscription.unsubscribe();
  }
}
