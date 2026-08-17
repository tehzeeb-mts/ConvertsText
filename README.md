<div align="center">

# ConvertsText ✍️⚡

**The fast, private, all-in-one text converter, readability analyzer, and linguistic studio.**

[![Live Website](https://img.shields.io/badge/Live%20Website-convertstext.com-6366f1.svg?style=for-the-badge&logo=cloudflare)](https://convertstext.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-Live-F38020.svg?style=for-the-badge&logo=cloudflarepages)](https://convertstext.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Zero Database Pledge](https://img.shields.io/badge/Privacy-Zero%20Database-10b981.svg?style=for-the-badge)](https://convertstext.com/privacy-policy.html)

</div>

---

## 📖 Overview

**ConvertsText** is an open-source, client-side web application offering 40+ professional text transformation tools, in-browser grammar linting, real-time readability analytics, phonetic audio synthesis, diff checking, and developer formatters.

Everything runs **100% locally in your browser**. No user text is ever uploaded to any database or external server.

---

## ✨ Features & Tool Suites

| Category | Available Tools |
| :--- | :--- |
| 🔤 **Case Converters** | Sentence Case, Title Case (AP/APA/Chicago/MLA), UPPERCASE, lowercase, Capitalized Case, aLtErNaTiNg cAsE, InVeRsE CaSe |
| 💻 **Developer Cases** | camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, header-case |
| 📊 **Linguistic & Analytics** | Word & Character Count, Flesch-Kincaid Grade Level, Flesch Reading Ease, Dale-Chall Score, Reading & Speaking Time estimates |
| ✍️ **In-Editor Grammar Linter** | Real-time spell check, repetition detection, common homophone confusion, punctuation fixes, style suggestions |
| 🔐 **Ciphers & Encoders** | Base64 Encode/Decode, Hex, Binary, Morse Code (with Web Audio tone playback), NATO Phonetic Alphabet, ROT13, Caesar Cipher, Reverse Text |
| 🧹 **Text Cleaners & Sorters** | Remove duplicate lines, sort alphabetically/numerically, strip extra whitespace, remove empty lines, line numbering |
| 🔍 **Visual Diff Checker** | Side-by-side & Unified text comparison with LCS (Longest Common Subsequence) inline character diffing |
| 📝 **Content Utilities** | Lorem Ipsum Generator (6 themes), Markdown-to-HTML Live Converter, Invisible Unicode character detector |

---

## 🏗️ Architecture & Project Structure

ConvertsText is built with lightweight vanilla JavaScript, semantic HTML5, and modular CSS tokens for instant load speeds and zero runtime framework overhead.

```
ConvertsText/
├── 📄 index.html               # Main Conversion Studio & In-Editor Grammar Linter
├── 📄 sentence-case.html       # Dedicated Sentence Case Tool
├── 📄 title-case.html          # Title Capitalization Tool (AP, Chicago, APA, MLA)
├── 📄 upper-lower-case.html    # UPPERCASE and lowercase Suite
├── 📄 developer-cases.html     # Developer naming conventions (camelCase, snake_case, etc.)
├── 📄 text-analyzer.html       # Readability formulas & sentiment analyzer
├── 📄 diff-checker.html        # Split & unified text difference comparator
├── 📄 word-counter.html        # Real-time character, word, sentence & syllable counter
├── 📄 ciphers-encoders.html    # Base64, Binary, Hex, Morse Audio Synthesizer
├── 📄 text-cleaner-sorter.html # Deduplication, whitespace stripping & sorting
├── 📄 stylized-fancy-text.html # Aesthetic Unicode fonts & stylized symbols
├── 📄 lorem-ipsum.html         # Dummy text generator with multiple themes
├── 📄 markdown-html.html       # Markdown to HTML live compiler
├── 📄 invisible-text.html      # Zero-width & invisible character detector
│
├── 📂 js/
│   ├── app.js                 # Theme switcher, global search (Ctrl+K), UI controls
│   ├── converters.js          # 40+ case conversion engines & boundary tokenizer
│   ├── grammar-engine.js      # Client-side grammar, spelling & style linter
│   ├── readability.js         # Flesch-Kincaid, Dale-Chall & reading time formulas
│   ├── morse-audio.js         # Web Audio API 800Hz sine oscillator tone player
│   └── diff-engine.js         # Myers / LCS diffing algorithm
│
├── 📂 css/
│   ├── style.css              # Main responsive styling & design token system
│   └── dossier-theme.css      # Dark/Light theme token overrides
│
├── 📂 .github/
│   ├── workflows/             # GitHub Actions CI & Cloudflare Pages deployment
│   └── ISSUE_TEMPLATE/        # Standardized Bug Report & Feature Request templates
│
├── 📄 wrangler.toml           # Cloudflare Workers configuration
├── 📄 _headers                # Security headers, CSP & edge caching policies
└── 📄 sitemap.xml & robots.txt# SEO optimization assets
```

---

## 🚀 Getting Started

### Prerequisites
- Modern Web Browser (Chrome, Safari, Firefox, Edge)
- [Node.js](https://nodejs.org/) v18+ (optional, for local preview & deployment)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/convertstext.git
   cd convertstext
   ```

2. **Run a local server**:
   ```powershell
   # Using PowerShell server helper
   powershell -ExecutionPolicy Bypass -File .\server.ps1

   # Or using npx / python
   npx serve .
   # or
   python -m http.server 8080
   ```

3. Open `http://localhost:8080` in your web browser.

---

## ☁️ Deployment

### Cloudflare Pages (Recommended)

1. **Deploy with Wrangler CLI**:
   ```bash
   # Login to Cloudflare
   npx wrangler login

   # Deploy to Cloudflare Pages
   npx wrangler pages deploy . --project-name=convertstext --branch=main
   ```

2. **Automated GitHub Actions CI/CD**:
   - Add your `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` into repository Secrets (`Settings -> Secrets and variables -> Actions`).
   - Every push to `main` automatically triggers `.github/workflows/deploy.yml`.

---

## 🔒 Privacy Pledge

ConvertsText is firmly committed to digital privacy:
- **Zero Database**: No user text is stored, logged, or transmitted.
- **Client-Side Only**: All conversions occur locally in RAM.
- **No Intrusive Trackers**: Zero telemetry on text inputs.

Read our complete [Privacy Policy](https://convertstext.com/privacy-policy.html).

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CONTRIBUTING.md#code-of-conduct) before submitting a pull request.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
