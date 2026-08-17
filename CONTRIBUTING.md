# Contributing to ConvertsText

Thank you for your interest in contributing to **ConvertsText**! We welcome contributions to help make this the fastest, most private, and most versatile client-side text toolkit on the web.

---

## 🧭 Code of Conduct

Please be respectful, collaborative, and constructive when opening issues, submitting pull requests, or participating in discussions.

---

## 🛠️ How to Contribute

### 1. Reporting Bugs
- Search existing [Issues](https://github.com/convertstext/convertstext/issues) to verify if the problem has already been reported.
- If not, open a new issue using our **Bug Report** template. Include details about your browser, operating system, expected behavior, and reproducible sample text.

### 2. Suggesting New Tools / Converters
- We love adding useful text transformers, ciphers, and formatting utilities!
- Open a **Feature Request** issue describing the converter rule, sample input/output, and why it's useful.

### 3. Submitting Code Changes (Pull Requests)

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/my-new-converter
   ```
2. **Make your changes**:
   - Ensure all conversions run 100% locally in the browser (no external API calls that transmit user text).
   - Maintain vanilla JavaScript, semantic HTML5, and standard CSS rules without introducing heavy frontend framework dependencies.
3. **Validate Code**:
   ```bash
   # Test JavaScript syntax
   node --check js/app.js
   node --check js/converters.js
   node --check js/grammar-engine.js
   ```
4. **Commit with descriptive messages**:
   ```bash
   git commit -m "feat(converters): add Base64 URL-safe conversion mode"
   ```
5. **Push & Open a Pull Request**:
   ```bash
   git push origin feat/my-new-converter
   ```

---

## 📐 Architecture & Standards

- **Zero-Database & Privacy First**: No text typed by users should ever be persisted, logged, or sent to analytics endpoints.
- **Pure Client-Side**: All string transforms belong in [`js/converters.js`](js/converters.js), linguistic checks in [`js/grammar-engine.js`](js/grammar-engine.js), and UI controllers in [`js/app.js`](js/app.js).
- **Responsive & Accessible**: Support dark/light mode, mobile touch targets, and proper ARIA labels.

---

## 📜 License
By contributing to ConvertsText, you agree that your contributions will be licensed under the [MIT License](LICENSE).
