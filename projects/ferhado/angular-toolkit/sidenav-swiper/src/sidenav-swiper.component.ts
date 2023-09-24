import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const DOCUMENT_DIRECTIONS: { [key: string]: { start: string; end: string } } = {
  ltr: { start: 'ltr', end: 'rtl' },
  rtl: { start: 'rtl', end: 'ltr' },
};

@Component({
  selector: 'fat-sidenav-swiper',
  template: `<ng-content></ng-content>`,
})
export class FatSidenavSwiperComponent implements AfterViewInit, OnDestroy {
  @Input() direction: 'start' | 'end' = 'start';
  @Input() isOpened = false;
  @Input() threshold = 50; // New input for threshold
  @Input() swipeThreshold = 50; // New input for swipeThreshold

  @Output() open = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<boolean>();
  private calculatedDirection!: string;

  private startX!: number;
  private startY!: number;
  private currentX!: number;
  private touchingSideNav = false;
  private subscriptions: Subscription[] = [];

  ngAfterViewInit() {
    const touchStart$ = fromEvent<TouchEvent>(window, 'touchstart');
    const touchMove$ = fromEvent<TouchEvent>(window, 'touchmove').pipe(
      throttleTime(10)
    );
    const touchEnd$ = fromEvent<TouchEvent>(window, 'touchend');

    this.subscriptions.push(
      touchStart$.subscribe((event) => this.onDrawerStart(event)),
      touchMove$.subscribe((event) => this.onDrawerMove(event)),
      touchEnd$.subscribe(() => this.onDrawerEnd())
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onDrawerStart(event: TouchEvent) {
    if (!event.touches) {
      return;
    }

    this.startX = event.touches[0].pageX;
    this.startY = event.touches[0].pageY;
    this.currentX = this.startX;

    this.calculatedDirection =
      DOCUMENT_DIRECTIONS[document.documentElement.dir || 'ltr'][
        this.direction
      ];

    this.touchingSideNav =
      this.isOpened ||
      (this.calculatedDirection === 'ltr' && this.startX < this.threshold) ||
      (this.calculatedDirection === 'rtl' &&
        this.startX > window.innerWidth - this.threshold);
  }

  onDrawerMove(event: TouchEvent) {
    if (!this.touchingSideNav) return;

    const moveX = event.touches[0].pageX;
    const moveY = event.touches[0].pageY;

    const diffX = Math.abs(this.startX - moveX);
    const diffY = Math.abs(this.startY - moveY);

    if (diffX > diffY) {
      this.currentX = moveX;
      const translateX = this.currentX - this.startX;

      const shouldOpen =
        this.calculatedDirection === 'ltr'
          ? translateX > this.swipeThreshold
          : translateX < -this.swipeThreshold;
      const shouldClose =
        this.calculatedDirection === 'ltr'
          ? translateX < -this.swipeThreshold
          : translateX > this.swipeThreshold;

      if ((shouldOpen && !this.isOpened) || (shouldClose && this.isOpened)) {
        this.toggleEmit(!this.isOpened);
      }
    }
  }

  onDrawerEnd() {
    this.touchingSideNav = false;
  }

  private toggleEmit(arg: boolean) {
    this.isOpened = arg;
    this.toggle.emit(arg);
    (arg ? this.open : this.close).emit();
  }
}
