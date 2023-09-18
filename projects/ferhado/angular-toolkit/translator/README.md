# @ferhado/angular-toolkit/translator

An Angular library for translation services in Angular applications. Includes a translation service and a pipe for transforming text based on the current language and text direction.

## Installation

Install using [npm](https://www.npmjs.com/):

```bash
npm install @ferhado/angular-toolkit
```

## Usage

### Import Module

```typescript
import { FatTranslatorModule } from "@ferhado/angular-toolkit/translator";

@NgModule({
  imports: [
    FatTranslatorModule.forRoot({
      allowedLangs: ["en", "de", "fr"],
      defaultLang: "en",
    }),
  ],
})
export class AppModule {}
```

### Use in Templates

```html
<p>{{ 'greeting.hello' | translate }} & {{ 'farewell.goodbye' | translate }}</p>
```

### Use in Components

```typescript
import { FatTranslatorService } from "@ferhado/angular-toolkit/translator";

export class AppComponent {
  constructor(private translator: FatTranslatorService) {
    // Initialize with a greeting object
    this.translator.setTranslations({
      greeting: {
        hello: "Hello",
        hi: "Hi",
        morning: "Good Morning",
      },
    });

    // Add a new farewell object to existing translations
    this.translator.addTranslation("farewell", {
      goodbye: "Goodbye",
      seeYou: "See You",
      night: "Good Night",
    });

    // Get translation
    console.log(this.translator.translate("farewell.goodbye"));
  }
}
```

### Change Language and Direction

To change the language, use the `setLang` method. The second parameter, `reload`, is optional and defaults to true.

```typescript
this.translator.setLang("en"); // Changes language to English and reloads window
```

For custom behavior:

```typescript
this.translator.setLang("en", false); // Changes language to English without reloading window
```

### Access Current Language and Direction

You can access the current language and text direction settings using `currentLang` and `currentDirection` properties of the `FatTranslatorService`.

```typescript
const currentLanguage = this.translator.currentLang; // Access the current language, e.g., "en"
const currentDirection = this.translator.textDirection; // Access the current text direction, e.g., "ltr"
```

These properties can be useful for conditionally rendering elements based on the current language or text direction.

## Validating Language

To check if a language is allowed, use the `isValidLang` method:

```typescript
console.log(this.translator.isValidLang("es")); // Output will be false if "es" is not an allowed language
```

## Support

Feel free to report any

- [Issues](https://github.com/ferhado/angular-toolkit/issues)
- [Bugs](https://github.com/ferhado/angular-toolkit/issues)
- [Feature Requests](https://github.com/ferhado/angular-toolkit/issues)

## License

MIT
