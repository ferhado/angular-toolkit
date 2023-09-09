# @fathado/angular-toolkit/sidenav-swiper

A powerful Angular component that provides swipe gesture functionality for toggling a side navigation drawer. It's designed to be easy to use, highly customizable, and supports both left-to-right (LTR) and right-to-left (RTL) text directions.

### Installation

```bash
npm install @fathado/angular-toolkit
```

### Usage

First, import `FatSidenavSwiperModule` in your module:

```typescript
import { FatSidenavSwiperModule } from "@fathado/angular-toolkit/sidenav-swiper";

@NgModule({
  imports: [
    // other imports...
    FatSidenavSwiperModule,
  ],
})
export class AppModule {}
```

Then, use the `fat-sidenav-swiper` component in your Angular component:

```html
<fat-sidenav-swiper [direction]="'start'" [isOpened]="false" [threshold]="50" [swipeThreshold]="100" (open)="onOpen()" (close)="onClose()" (toggle)="onToggle($event)">
  <!-- Your sidenav content goes here -->
</fat-sidenav-swiper>
```

...

#### Usage with Angular Material

If you're using Angular Material's `mat-sidenav`, you can use `fat-sidenav-swiper` to add swipe gesture support:

```html
<mat-sidenav-container>
  <mat-sidenav #sidenav position="start">
    <!-- Your sidenav content goes here -->
  </mat-sidenav>

  <mat-sidenav-content>
    <!-- Your main content goes here -->
  </mat-sidenav-content>
</mat-sidenav-container>

<fat-sidenav-swiper (open)="sidenav.open()" (close)="sidenav.close()" [isOpened]="sidenav.opened" [threshold]="50" [swipeThreshold]="100" [direction]="sidenav.position"> </fat-sidenav-swiper>
```

> **Note:** Note: If the sidenav is closed by another method (like a button click), you should manually update the `isOpened` property of `fat-sidenav-swiper` to reflect the new state.

> **Note:** This library is designed to handle touch events for swiping a sidenav. It does not handle mouse events. Therefore, it is most suitable for use in mobile or touch-enabled applications.

### API

#### Inputs

- `direction`: The direction of the swipe gesture. Can be either `'start'` or `'end'`. Default is `'start'`. This input is RTL-aware, meaning `'start'` refats to right in RTL mode and left in LTR mode, and vice versa for `'end'`.

- `isOpened`: A boolean indicating whether the sidenav is opened or not. Default is `false`.

- `threshold`: The threshold for starting the swipe in pixels. Default is `30`.

- `swipeThreshold`: The threshold for triggering the swipe action in pixels. Default is `50`.

#### Outputs

- `open`: An event that is emitted when the sidenav is opened. It does not emit any value.

- `close`: An event that is emitted when the sidenav is closed. It does not emit any value.

- `toggle`: An event that is emitted when the sidenav is toggled. It emits a boolean indicating the new state of the sidenav.

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
