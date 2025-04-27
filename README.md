# cypress-selector-extension

This Chrome Extension simplifies the process of creating selectors for Cypress tests, making it easier to write reliable tests.

## ✨ Features

You are able to generate a Cypress selector using two ways:

- Click the "Select an Element" button in the extension popup and then click the element directly from the page;
- Pasting a complete element on the extension popup text field and click "Generate Selector".

## 📥 Installation

1. Clone or download this repository;
2. Open Chrome and navigate to `chrome://extensions/`;
3. Enable "Developer mode" in the top-right corner;
4. Click "Load unpacked" and select the 'extension' folder.

## 🛠️ Usage

Method 1 (Simple, less accurate):

1. Click the extension's icon in the Chrome toolbar;
2. Click the "Select an Element" button;
3. Click the element you want to generate a selector for.

Method 2 (Complex, very accurate):

1. Using the DevTools select the element you want to generate a selector for;
   - Open DevTools using F12 and go to Elements section;
   - Right click the element, click "Copy" and then click "Copy Element".
2. Click the extension's icon in the Chrome toolbar;
3. Paste the full element onto the extension's text field;
4. Click "Generate Selector" button.

Both of these methods will automatically copy the selector to your clipboard.

## 📚 References

Cypress Documentation / Blog Posts:

- [Get Element](https://docs.cypress.io/api/commands/get)
- [Best Practices](https://docs.cypress.io/app/core-concepts/best-practices)
- [Understanding Selectors](https://www.cypress.io/blog/understanding-selectors-in-testing)
