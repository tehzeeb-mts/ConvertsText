# ConvertsText ✍️⚡

> A high-performance, private, client-side web application for text case conversion, readability analysis, and writing utility tools.

[![Deploy to Cloudflare Pages](https://github.com/convertstext/convertstext/actions/workflows/deploy.yml/badge.svg)](https://github.com/convertstext/convertstext/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Database](https://img.shields.io/badge/Database-Zero%20Database%20Pledge-emerald.svg)](contact.html)

---

## 🌟 Features

- **40+ Text Converters**: Sentence Case, Title Case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, upside-down, small caps, binary, hex, base64, and morse code with Web Audio playback.
- **Lossless Case Chaining**: Intelligent boundary detection preserves spaces when switching between developer formats and natural sentence/title cases.
- **In-Browser Grammar & Spell Linter**: 100% client-side linguistic checker for repeated words, confused homophones, wordiness, and punctuation errors.
- **Readability Suite**: Real-time Flesch-Kincaid Grade Level, Flesch Reading Ease score, Dale-Chall index, speaking time, and reading time estimates.
- **Privacy By Design**: 100% serverless, zero-database architecture. Text is processed entirely in the user's browser.
- **SEO & AdSense Ready**: Semantic HTML5, mobile-responsive layout, XML sitemap, `robots.txt`, and Google Analytics GA4 integration.

---

## 🚀 Quick Start

### Local Development
```bash
# Start local HTTP preview
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Open `http://localhost:8080/` in your browser.

### Deploy to Cloudflare
```bash
# Deploy to Cloudflare Workers
npm run deploy

# Deploy to Cloudflare Pages
npm run deploy:pages
```

---

## 📁 Project Structure

```
ConvertsText/
├── index.html               # Master Conversion Studio & Grammar Linter
├── sentence-case.html       # Sentence Case Converter
├── title-case.html          # Title Case (AP / APA / Chicago / MLA)
├── upper-lower-case.html    # UPPERCASE & lowercase tools
├── developer-cases.html     # camelCase, snake_case, PascalCase, kebab-case
├── stylized-fancy-text.html # Unicode fonts & aesthetic text
├── ciphers-encoders.html    # Base64, Hex, Binary, Morse Code & NATO
├── text-cleaner-sorter.html # Line deduplication, sorting & whitespace cleaner
├── diff-checker.html        # Split & Unified visual text comparison
├── word-counter.html        # Comprehensive word & character counter
├── lorem-ipsum.html         # Dummy text generator with 6 themes
├── text-analyzer.html       # Flesch-Kincaid readability & sentiment analyzer
├── recommended-tools.html   # Curated writing tools hub
├── blog.html                # Content marketing & writing guides
├── about.html               # About Us & Mission
├── contact.html             # Contact page with Zero-Database Pledge
├── privacy-policy.html      # GDPR & CCPA privacy policy
├── terms.html               # Terms of Service
├── 404.html & 500.html      # Custom branded error handlers
├── js/
│   ├── app.js               # Global UI, Theme & Search controller
│   ├── converters.js        # Core conversion algorithms & boundary tokenizer
│   ├── grammar-engine.js    # Client-side grammar, spelling & conciseness linter
│   ├── readability.js       # Linguistic & grade-level calculators
│   ├── morse-audio.js       # Web Audio API morse synthesizer
│   └── diff-engine.js       # LCS diff computation & visual rendering
├── css/
│   └── style.css            # Responsive design system
├── wrangler.toml            # Cloudflare Workers configuration
├── _headers                 # Cloudflare Pages security & caching headers
└── .github/workflows/       # GitHub Actions automated CI/CD pipeline
```

---

## 📜 License
MIT License. Free for personal and commercial use.
