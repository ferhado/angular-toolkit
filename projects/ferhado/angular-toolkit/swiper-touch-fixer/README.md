# Swiper Elements Touch Fixer

This directive is specifically designed for [Swiper Element (WebComponent)](https://swiperjs.com/element) to resolve the "Swiper Element breaks touch events" issue, thereby enhancing touch responsiveness.

## Installation

```bash
npm install @ferhado/angular-toolkit
```

### Install Swiper

```bash
npm install swiper
```

## Usage

### Importing the Directive

```typescript
import { FatSwiperElementsTouchFixer } from "@ferhado/angular-toolkit/swiper-elements-touch-fixer";

import { register } from "swiper/element/bundle";
register();

// Add the directive to your Component
@Component({
  imports: [FatSwiperElementsTouchFixer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YourComponent {}
```

Add the directive to your `swiper-container`:

```html
<swiper-container fat-swiper-touch-fixer>
  <swiper-slide>Slide 1</swiper-slide>
  <swiper-slide>Slide 2</swiper-slide>
  <swiper-slide>Slide 3</swiper-slide>
</swiper-container>
```

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
