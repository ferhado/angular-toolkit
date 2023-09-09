// ANSI escape codes for text colors
const reset = "\x1b[0m"; // Reset color
const cyan = "\x1b[36m"; // Cyan color
const green = "\x1b[32m"; // Green color
const emoji = "🌟"; // Emoji for gratitude

// Display a message thanking the user with custom colors and emoji
console.log(`\n${green}${emoji} Thank you for using @ferhado/angular-toolkit! ${emoji}${reset}

To fully utilize the power of ${cyan}FatDialogService${reset}, ${cyan}FatConfirmBoxService${reset}, or ${cyan}FatSnackbarService${reset}, please ensure you have installed "@angular/material" as a dependency.

You can install it using the following command:
${cyan}ng add @angular/material${reset}

This will ensure that the required materials are available for these services, preventing runtime issues.`);
