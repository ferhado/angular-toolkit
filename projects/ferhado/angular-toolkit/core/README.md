# @ferhado/angular-toolkit/core

Enhance Angular Material with custom date formats, currency pipes, and user inactivity tracking.

> **Prerequisite**: Requires `Angular Material`. Install it before using `FatLocaleModule`.

## Install

```bash
npm install @ferhado/angular-toolkit
```

## Setup

```typescript
import { FatLocaleModule } from "@ferhado/angular-toolkit/core";

@NgModule({
  imports: [FatLocaleModule.init({ currency: "€", dateFormat: "dd.MM.yy" })],
})
export class AppModule {}
```

## Services

### FatUserActivity

Tracks user inactivity using Angular's native `ApplicationRef`. Emits a notification after a specified timeout (in minutes).

#### Import & Usage

```typescript
import { FatUserActivity } from "@ferhado/angular-toolkit/core";

constructor(private userActivity: FatUserActivity) {
  this.userActivity.timeoutNotifier(10).subscribe(() => console.log("timeout: 10 min"));
}
```

## Support

- [Issues & Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
