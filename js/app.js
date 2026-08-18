/**
 * ConvertsText - Master Application UI, AdSense Compliance, Affiliate Monetization & Interactivity Controller
 */

// All tools database for instant search palette & quick-navigation
const ALL_TOOLS_REGISTRY = [
  // Standard Cases
  { id: 'sentence-case', name: 'Sentence case', category: 'Standard Cases', icon: 'Aa', page: 'sentence-case.html', desc: 'Capitalize the first letter of each sentence' },
  { id: 'lower-case', name: 'lower case', category: 'Standard Cases', icon: 'aa', page: 'upper-lower-case.html', desc: 'Convert all letters to lowercase' },
  { id: 'upper-case', name: 'UPPER CASE', category: 'Standard Cases', icon: 'AA', page: 'upper-lower-case.html', desc: 'Convert all letters to uppercase' },
  { id: 'capitalized-case', name: 'Capitalized Case', category: 'Standard Cases', icon: 'Abc', page: 'title-case.html', desc: 'Capitalize the first letter of every single word' },
  { id: 'title-case', name: 'Title Case', category: 'Standard Cases', icon: 'Title', page: 'title-case.html', desc: 'Smart headline casing preserving minor prepositions' },
  { id: 'alternating-case', name: 'aLtErNaTiNg cAsE', category: 'Standard Cases', icon: 'aL', page: 'upper-lower-case.html', desc: 'Toggle between lowercase and uppercase letters' },
  { id: 'inverse-case', name: 'InVeRsE CaSe', category: 'Standard Cases', icon: 'iNv', page: 'upper-lower-case.html', desc: 'Invert the case of each character in text' },
  { id: 'mocking-case', name: 'mOcKiNg cAsE', category: 'Standard Cases', icon: 'Mock', page: 'stylized-fancy-text.html', desc: 'Spongebob mocking meme random casing' },

  // Developer Cases
  { id: 'camel-case', name: 'camelCase', category: 'Developer Cases', icon: 'dC', page: 'developer-cases.html', desc: 'Variable naming format starting with lowercase' },
  { id: 'pascal-case', name: 'PascalCase', category: 'Developer Cases', icon: 'Pc', page: 'developer-cases.html', desc: 'Class and component naming with initial capital' },
  { id: 'snake-case', name: 'snake_case', category: 'Developer Cases', icon: 's_c', page: 'developer-cases.html', desc: 'Words joined with underscores in lowercase' },
  { id: 'kebab-case', name: 'kebab-case', category: 'Developer Cases', icon: 'k-c', page: 'developer-cases.html', desc: 'URL slugs and CSS properties joined with hyphens' },
  { id: 'constant-case', name: 'CONSTANT_CASE', category: 'Developer Cases', icon: 'C_C', page: 'developer-cases.html', desc: 'Screaming snake case for constants and env vars' },
  { id: 'dot-case', name: 'dot.case', category: 'Developer Cases', icon: 'd.c', page: 'developer-cases.html', desc: 'Words separated by dots' },
  { id: 'path-case', name: 'path/case', category: 'Developer Cases', icon: 'p/c', page: 'developer-cases.html', desc: 'Words separated by file path slashes' },
  { id: 'header-case', name: 'Header-Case', category: 'Developer Cases', icon: 'H-C', page: 'developer-cases.html', desc: 'HTTP header casing format' },
  { id: 'cobol-case', name: 'COBOL-CASE', category: 'Developer Cases', icon: 'COB', page: 'developer-cases.html', desc: 'Uppercase words joined with hyphens' },

  // Analysis & Readability Tools
  { id: 'text-analyzer', name: 'Text & Readability Analyzer', category: 'Analysis Tools', icon: 'Read', page: 'text-analyzer.html', desc: 'Flesch score, Grade level, Gunning Fog, Lexical diversity' },
  { id: 'word-counter', name: 'Word & Character Counter', category: 'Analysis Tools', icon: 'Word', page: 'word-counter.html', desc: 'Live counter with Twitter, SMS and social media limits' },
  { id: 'diff-checker', name: 'Text Diff Checker', category: 'Analysis Tools', icon: 'Diff', page: 'diff-checker.html', desc: 'Side-by-side & unified text comparison tool' },

  // Generators & Specialized Editors
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator (6 Themes)', category: 'Generators', icon: 'Doc', page: 'lorem-ipsum.html', desc: 'Generate Classic, Tech, Corporate, Pirate, Hipster Ipsum' },
  { id: 'markdown-html', name: 'Markdown to HTML Live Studio', category: 'Generators', icon: 'MD', page: 'markdown-html.html', desc: 'Interactive dual-pane Markdown editor with live HTML preview' },
  { id: 'invisible-text', name: 'Zero-Width Steganography', category: 'Generators', icon: 'Sec', page: 'invisible-text.html', desc: 'Hide secret messages inside text using zero-width spaces' },
  { id: 'random-generator', name: 'Password & UUID Generator', category: 'Generators', icon: 'Pass', page: 'random-generator.html', desc: 'Secure passwords and batch UUID v4 generator' },

  // Stylized Fonts
  { id: 'small-caps', name: 'Small Caps', category: 'Stylized Fonts', icon: 'ꜱᴍᴄ', page: 'stylized-fancy-text.html', desc: 'Unicode small capital glyphs ᴀ ʙ ᴄ' },
  { id: 'wide-text', name: 'Wide / Vaporwave', category: 'Stylized Fonts', icon: 'Ｗｉ', page: 'stylized-fancy-text.html', desc: 'Aesthetic fullwidth spaced characters' },
  { id: 'upside-down', name: 'Upside Down', category: 'Stylized Fonts', icon: 'ʇxǝʇ', page: 'stylized-fancy-text.html', desc: 'Flip text upside down and backwards' },
  { id: 'reverse-text', name: 'Reverse Text', category: 'Stylized Fonts', icon: '⇄', page: 'stylized-fancy-text.html', desc: 'Reverse text character by character' },
  { id: 'reverse-words', name: 'Reverse Words', category: 'Stylized Fonts', icon: '⇆', page: 'stylized-fancy-text.html', desc: 'Reverse the order of words in sentences' },
  { id: 'strikethrough', name: 'Strikethrough', category: 'Stylized Fonts', icon: 's̶t̶', page: 'stylized-fancy-text.html', desc: 'Cross out text with strikethrough lines' },
  { id: 'underline', name: 'Underline Text', category: 'Stylized Fonts', icon: 'u͟n͟', page: 'stylized-fancy-text.html', desc: 'Add continuous underline combining marks' },
  { id: 'bubble-text', name: 'Bubble / Circled', category: 'Stylized Fonts', icon: 'ⓑ', page: 'stylized-fancy-text.html', desc: 'Enclosed circled alphanumeric characters' },
  { id: 'cursive-text', name: 'Cursive / Script', category: 'Stylized Fonts', icon: '𝒞𝓊', page: 'stylized-fancy-text.html', desc: 'Elegant handwriting script Unicode letters' },
  { id: 'gothic-text', name: 'Gothic / Fraktur', category: 'Stylized Fonts', icon: '𝔊𝔬', page: 'stylized-fancy-text.html', desc: 'Medieval Fraktur calligraphic letters' },
  { id: 'zalgo-text', name: 'Zalgo Glitch Text', category: 'Stylized Fonts', icon: 'Z̵a̵l̵', page: 'stylized-fancy-text.html', desc: 'Corrupted glitch text with chaos slider' },

  // Ciphers & Encoders
  { id: 'binary-code', name: 'Binary Code (0101)', category: 'Encoders & Ciphers', icon: '01', page: 'ciphers-encoders.html', desc: 'Convert text to binary 8-bit bytes and back' },
  { id: 'hex-code', name: 'Hexadecimal', category: 'Encoders & Ciphers', icon: '0x', page: 'ciphers-encoders.html', desc: 'Convert text to Hex values and decode' },
  { id: 'base64', name: 'Base64 Encode / Decode', category: 'Encoders & Ciphers', icon: '64', page: 'ciphers-encoders.html', desc: 'UTF-8 safe Base64 encoding and decoding' },
  { id: 'url-encode', name: 'URL Percent Encode', category: 'Encoders & Ciphers', icon: '%20', page: 'ciphers-encoders.html', desc: 'Encode URL queries and escape special characters' },
  { id: 'morse-code', name: 'Morse Code (Audio Beep)', category: 'Encoders & Ciphers', icon: '.-', page: 'ciphers-encoders.html', desc: 'Translate text to Morse code with live audio beeper' },
  { id: 'nato-phonetic', name: 'NATO Phonetic', category: 'Encoders & Ciphers', icon: 'Alfa', page: 'ciphers-encoders.html', desc: 'Aviation and military spelling alphabet' },
  { id: 'rot13', name: 'ROT13 Caesar Cipher', category: 'Encoders & Ciphers', icon: '13', page: 'ciphers-encoders.html', desc: 'Rotate letter positions by 13 places' },

  // Cleaners & Sorters
  { id: 'text-cleaner', name: 'Text Cleaner & Whitespace', category: 'Text Utilities', icon: 'Trim', page: 'text-cleaner-sorter.html', desc: 'Trim spaces, convert line breaks, strip HTML' },
  { id: 'duplicate-lines', name: 'Duplicate Line Remover', category: 'Text Utilities', icon: 'Uniq', page: 'text-cleaner-sorter.html', desc: 'Remove repetitive lines from text or code' },
  { id: 'line-sorter', name: 'Alphabetizer & Line Sorter', category: 'Text Utilities', icon: 'Sort', page: 'text-cleaner-sorter.html', desc: 'Sort lines A-Z, Z-A, by length, or randomize' },
  { id: 'find-replace', name: 'Find & Replace', category: 'Text Utilities', icon: 'Find', page: 'text-cleaner-sorter.html', desc: 'Fast text replacement with Regex support' },

  // Resources, Writing Affiliates & Company
  { id: 'faq-help', name: 'FAQ & Knowledge Base', category: 'Resources', icon: 'FAQ', page: 'faq.html', desc: 'Frequently asked questions, developer naming guides, and privacy reference' },
  { id: 'recommended-tools', name: 'Best AI Writing Tools & Assistants', category: 'Resources', icon: 'Top', page: 'recommended-tools.html', desc: 'Grammarly, QuillBot, Jasper AI free trials and discounts' },
  { id: 'blog', name: 'Blog & Writing Guides', category: 'Resources', icon: 'Blog', page: 'blog.html', desc: 'Tutorials on readability formulas and developer casing' },
  { id: 'about-us', name: 'About ConvertsText', category: 'Company', icon: 'Team', page: 'about.html', desc: 'Our story, technology, and privacy standards' },
  { id: 'contact-us', name: 'Contact Support', category: 'Company', icon: 'Mail', page: 'contact.html', desc: 'Send feedback, bug reports, or feature requests' },
  { id: 'privacy-policy', name: 'Privacy Policy', category: 'Company', icon: 'Priv', page: 'privacy-policy.html', desc: '100% Client-Side Privacy & GDPR disclosures' },
  { id: 'terms-of-service', name: 'Terms of Service', category: 'Company', icon: 'Term', page: 'terms.html', desc: 'Terms of usage and legal disclaimers' }
];

// App Global State & Controller
class ConvertsApp {
  constructor() {
    this.historyStack = [];
    this.historyIndex = -1;
    this.maxHistory = 40;
    this.speechSynth = window.speechSynthesis || null;
    this.speechUtterance = null;
    this.speechRecognition = null;
    this.isRecognizing = false;

    this.initTheme();
    this.initGlobalSearch();
    this.initMobileNav();
    this.initSpeechRecognition();
    this.initCookieConsent();
    this.initFaqAccordions();
    this.initGlobalTracking();
    this.checkStagingDomainNoindex();
  }

  // -------------------------------------------------------------
  // NOINDEX FOR STAGING DOMAINS (*.pages.dev / *.workers.dev)
  // -------------------------------------------------------------
  checkStagingDomainNoindex() {
    const host = window.location.hostname.toLowerCase();
    if (host.endsWith('pages.dev') || host.endsWith('workers.dev')) {
      const botNames = ['robots', 'googlebot', 'bingbot'];
      botNames.forEach(bot => {
        let tag = document.querySelector(`meta[name="${bot}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.name = bot;
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
      });
    }
  }

  // -------------------------------------------------------------
  // THEME MANAGEMENT (Dark / Light)
  // -------------------------------------------------------------
  initTheme() {
    const savedTheme = localStorage.getItem('convertcase_theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcons(savedTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleTheme());
    });
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.add('theme-transition');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('convertcase_theme', next);
    this.updateThemeIcons(next);

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);

    this.showToast(`Switched to ${next} mode`, 'info');
  }

  updateThemeIcons(theme) {
    const sunSvg = `<svg class="icon icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    const moonSvg = `<svg class="icon icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
      const icon = btn.querySelector('.theme-icon');
      if (icon) {
        icon.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
      }
    });
  }

  // -------------------------------------------------------------
  // GDPR & CCPA COOKIE CONSENT BANNER
  // -------------------------------------------------------------
  initCookieConsent() {
    const consent = localStorage.getItem('convertstext_cookie_consent');
    if (!consent) {
      const banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.className = 'cookie-consent-banner show';
      banner.innerHTML = `
        <div class="cookie-consent-header">🍪 Cookie & Privacy Preferences</div>
        <p class="cookie-consent-text">We use essential local storage to remember your theme preferences and non-intrusive cookies to serve relevant advertisements via Google AdSense. All text conversion occurs 100% locally on your device.</p>
        <div class="cookie-consent-buttons">
          <button type="button" class="tool-btn tool-btn-primary" id="btn-cookie-accept">Accept All</button>
          <button type="button" class="tool-btn" id="btn-cookie-reject">Essential Only</button>
          <a href="privacy-policy.html" style="font-size: 0.8rem; text-decoration: underline; margin-left: 0.5rem;">Privacy Policy</a>
        </div>
      `;
      document.body.appendChild(banner);

      document.getElementById('btn-cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('convertstext_cookie_consent', 'accepted');
        banner.remove();
        this.showToast('Preferences saved. Thank you!', 'success', 2000);
      });

      document.getElementById('btn-cookie-reject')?.addEventListener('click', () => {
        localStorage.setItem('convertstext_cookie_consent', 'essential_only');
        banner.remove();
        this.showToast('Essential cookies only enabled.', 'info', 2000);
      });
    }
  }

  // -------------------------------------------------------------
  // FAQ ACCORDIONS CONTROLLER
  // -------------------------------------------------------------
  initFaqAccordions() {
    document.querySelectorAll('.faq-accordion-question').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-accordion-item');
        if (item) {
          item.classList.toggle('active');
        }
      });
    });
  }

  // -------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // -------------------------------------------------------------
  showToast(message, type = 'success', duration = 2500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-toast-in`;

    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';
    if (type === 'warning') icon = '⚠';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('animate-toast-out');
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // -------------------------------------------------------------
  // ANALYTICS & EVENT TRACKING (GA4 gtag & GTM dataLayer)
  // -------------------------------------------------------------
  trackEvent(eventName, params = {}) {
    try {
      const payload = {
        page_path: window.location.pathname,
        page_title: document.title,
        ...params
      };

      // 1. Dispatch directly to Google Analytics 4 (Measurement ID: G-F3WH082XX7)
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }

      // 2. Push to Google Tag Manager dataLayer for custom GTM triggers
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...payload
      });
    } catch (err) {
      console.debug('Event tracking error:', err);
    }
  }

  initGlobalTracking() {
    document.addEventListener('click', (e) => {
      // 1. Conversion Buttons
      const convertBtn = e.target.closest('.convert-btn, [id^="btn-convert-"], [data-action], [data-convert-action]');
      if (convertBtn && !convertBtn.id.includes('copy') && !convertBtn.id.includes('download') && !convertBtn.id.includes('clear')) {
        const action = convertBtn.getAttribute('data-action') ||
          convertBtn.getAttribute('data-convert-action') ||
          convertBtn.id.replace('btn-convert-', '');
        const btnText = (convertBtn.querySelector('.convert-btn-name')?.textContent ||
          convertBtn.textContent ||
          action || '').trim().replace(/\s+/g, ' ');
        const category = convertBtn.getAttribute('data-cat') || 'standard';

        this.trackEvent('text_conversion_click', {
          conversion_type: action,
          button_text: btnText,
          category: category
        });
        return;
      }

      // 2. Copy Buttons
      const copyBtn = e.target.closest('#btn-copy, #btn-copy-main, .btn-mini-copy, [id*="btn-copy"], [data-action="copy"]');
      if (copyBtn) {
        const btnText = (copyBtn.textContent || 'Copy').trim().replace(/\s+/g, ' ');
        const target = copyBtn.getAttribute('data-target') || 'main-editor';

        this.trackEvent('copy_click', {
          button_text: btnText,
          target_element: target
        });
        return;
      }

      // 3. Download / Export Buttons
      const downloadBtn = e.target.closest('#btn-download, #btn-download-main, [id*="btn-download"], [data-action="download"]');
      if (downloadBtn) {
        const btnText = (downloadBtn.textContent || 'Download').trim().replace(/\s+/g, ' ');

        this.trackEvent('download_click', {
          button_text: btnText
        });
        return;
      }

      // 4. Grammar / Linter Trigger Button
      const grammarBtn = e.target.closest('#btn-check-grammar, #btn-grammar-fix-all');
      if (grammarBtn) {
        this.trackEvent('grammar_check_click', {
          button_id: grammarBtn.id
        });
      }
    }, { capture: true });
  }

  // -------------------------------------------------------------
  // CLIPBOARD HELPER
  // -------------------------------------------------------------
  async copyText(text, successMessage = 'Copied to clipboard!') {
    if (!text) {
      this.showToast('Nothing to copy', 'warning');
      return false;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      this.showToast(successMessage, 'success');
      this.trackEvent('copy_success', {
        char_count: text.length
      });
      return true;
    } catch (e) {
      this.showToast('Failed to copy text', 'error');
      return false;
    }
  }

  // -------------------------------------------------------------
  // DOWNLOAD AS TXT FILE
  // -------------------------------------------------------------
  downloadFile(text, filename = 'converted-text.txt') {
    if (!text) {
      this.showToast('Nothing to download', 'warning');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    this.showToast(`Downloaded ${filename}`, 'info');
    this.trackEvent('download_file_success', {
      file_name: filename,
      char_count: text.length
    });
  }

  // -------------------------------------------------------------
  // UNDO / REDO HISTORY STACK
  // -------------------------------------------------------------
  pushHistory(text, targetTextarea) {
    if (this.historyStack[this.historyIndex] === text) return;

    this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    this.historyStack.push(text);
    if (this.historyStack.length > this.maxHistory) {
      this.historyStack.shift();
    }
    this.historyIndex = this.historyStack.length - 1;
    this.updateUndoRedoButtons();
  }

  undo(targetTextarea) {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      targetTextarea.value = this.historyStack[this.historyIndex];
      targetTextarea.dispatchEvent(new Event('input'));
      this.updateUndoRedoButtons();
      this.showToast('Undo', 'info', 1000);
    }
  }

  redo(targetTextarea) {
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyIndex++;
      targetTextarea.value = this.historyStack[this.historyIndex];
      targetTextarea.dispatchEvent(new Event('input'));
      this.updateUndoRedoButtons();
      this.showToast('Redo', 'info', 1000);
    }
  }

  updateUndoRedoButtons() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');
    if (undoBtn) undoBtn.disabled = this.historyIndex <= 0;
    if (redoBtn) redoBtn.disabled = this.historyIndex >= this.historyStack.length - 1;
  }

  // -------------------------------------------------------------
  // SPEECH SYNTHESIS (Voice Reader)
  // -------------------------------------------------------------
  speakText(text, btnElement) {
    if (!('speechSynthesis' in window)) {
      this.showToast('Text-to-speech not supported in this browser', 'warning');
      return;
    }

    if (this.speechSynth.speaking) {
      this.speechSynth.cancel();
      if (btnElement) {
        btnElement.classList.remove('btn-active-speech');
        btnElement.querySelector('.btn-label')?.replaceChildren(document.createTextNode('Read Aloud'));
      }
      this.showToast('Speech stopped', 'info');
      return;
    }

    if (!text || !text.trim()) {
      this.showToast('No text to read aloud', 'warning');
      return;
    }

    this.speechUtterance = new SpeechSynthesisUtterance(text);
    this.speechUtterance.rate = 1.0;
    this.speechUtterance.pitch = 1.0;

    if (btnElement) {
      btnElement.classList.add('btn-active-speech');
      const label = btnElement.querySelector('.btn-label');
      if (label) label.textContent = 'Stop Reading';
    }

    this.speechUtterance.onend = () => {
      if (btnElement) {
        btnElement.classList.remove('btn-active-speech');
        const label = btnElement.querySelector('.btn-label');
        if (label) label.textContent = 'Read Aloud';
      }
    };

    this.speechUtterance.onerror = () => {
      if (btnElement) {
        btnElement.classList.remove('btn-active-speech');
        const label = btnElement.querySelector('.btn-label');
        if (label) label.textContent = 'Read Aloud';
      }
    };

    this.speechSynth.speak(this.speechUtterance);
    this.showToast('Reading text aloud...', 'info');
  }

  // -------------------------------------------------------------
  // SPEECH RECOGNITION (Dictation)
  // -------------------------------------------------------------
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
    }
  }

  toggleSpeechDictation(targetTextarea, btnElement) {
    if (!this.speechRecognition) {
      this.showToast('Speech recognition not supported in this browser', 'warning');
      return;
    }

    if (this.isRecognizing) {
      this.speechRecognition.stop();
      this.isRecognizing = false;
      if (btnElement) {
        btnElement.classList.remove('btn-recording');
        const label = btnElement.querySelector('.btn-label');
        if (label) label.textContent = 'Dictate';
      }
      this.showToast('Dictation stopped', 'info');
      return;
    }

    let originalVal = targetTextarea.value;
    if (originalVal && !originalVal.endsWith(' ') && !originalVal.endsWith('\n')) {
      originalVal += ' ';
    }

    this.speechRecognition.onstart = () => {
      this.isRecognizing = true;
      if (btnElement) {
        btnElement.classList.add('btn-recording');
        const label = btnElement.querySelector('.btn-label');
        if (label) label.textContent = 'Listening...';
      }
      this.showToast('Listening... Speak now', 'info');
    };

    this.speechRecognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      targetTextarea.value = originalVal + transcript;
      targetTextarea.dispatchEvent(new Event('input'));
    };

    this.speechRecognition.onerror = (event) => {
      this.isRecognizing = false;
      if (btnElement) {
        btnElement.classList.remove('btn-recording');
        const label = btnElement.querySelector('.btn-label');
        if (label) label.textContent = 'Dictate';
      }
      this.showToast(`Speech error: ${event.error}`, 'error');
    };

    this.speechRecognition.onend = () => {
      this.isRecognizing = false;
      if (btnElement) {
        btnElement.classList.remove('btn-recording');
        const label = btnElement.querySelector('.btn-label');
        if (label) label.textContent = 'Dictate';
      }
    };

    this.speechRecognition.start();
  }

  // -------------------------------------------------------------
  // FILE DRAG & DROP AND UPLOAD
  // -------------------------------------------------------------
  setupFileDrop(dropArea, targetTextarea) {
    if (!dropArea || !targetTextarea) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
    });

    dropArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        this.readFile(files[0], targetTextarea);
      }
    });

    const fileInput = document.getElementById('file-upload-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.readFile(e.target.files[0], targetTextarea);
        }
      });
    }
  }

  readFile(file, targetTextarea) {
    if (!file.type.match('text.*') && !file.name.match(/\.(txt|md|js|json|html|css|py|csv)$/i)) {
      this.showToast('Please upload a plain text file (.txt, .md, .js, .json, etc.)', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      targetTextarea.value = e.target.result;
      targetTextarea.dispatchEvent(new Event('input'));
      this.pushHistory(e.target.result, targetTextarea);
      this.showToast(`Loaded ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 'success');
    };
    reader.readAsText(file);
  }

  // -------------------------------------------------------------
  // LIVE STATS & READABILITY RIBBON CALCULATOR
  // -------------------------------------------------------------
  updateStatsRibbon(text) {
    const stats = ConvertsEngine.getTextStats(text);

    const updateElem = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    updateElem('stat-characters', stats.characters.toLocaleString());
    updateElem('stat-characters-no-spaces', stats.charactersNoSpaces.toLocaleString());
    updateElem('stat-words', stats.words.toLocaleString());
    updateElem('stat-sentences', stats.sentences.toLocaleString());
    updateElem('stat-paragraphs', stats.paragraphs.toLocaleString());
    updateElem('stat-lines', stats.lines.toLocaleString());
    updateElem('stat-reading-time', stats.readingTimeFormatted);
    updateElem('stat-speaking-time', stats.speakingTimeFormatted);

    // Quick Readability score badge if ReadabilityEngine is available
    if (typeof ReadabilityEngine !== 'undefined') {
      const readability = ReadabilityEngine.analyze(text);
      const easePill = document.getElementById('stat-flesch-pill');
      if (easePill) {
        easePill.textContent = `${readability.fleschReadingEase.score}/100 (${readability.fleschReadingEase.label})`;
        easePill.className = `readability-pill badge-${readability.fleschReadingEase.badge}`;
      }
    }

    return stats;
  }

  // -------------------------------------------------------------
  // GLOBAL SEARCH MODAL (Ctrl+K / Cmd+K)
  // -------------------------------------------------------------
  initGlobalSearch() {
    let modal = document.getElementById('search-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'search-modal';
      modal.className = 'search-modal-backdrop';
      modal.innerHTML = `
        <div class="search-modal-box" role="dialog" aria-modal="true">
          <div class="search-modal-header">
            <span class="search-modal-icon">🔍</span>
            <input type="text" id="global-search-input" class="search-modal-input" placeholder="Search 40+ tools & pages (e.g. Flesch, password, camelCase, privacy)..." autocomplete="off">
            <button type="button" class="search-modal-close-btn" id="search-modal-close" aria-label="Close search">&times;</button>
          </div>
          <div class="search-modal-results" id="search-modal-results"></div>
          <div class="search-modal-footer">
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const input = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('search-modal-results');
    const closeBtn = document.getElementById('search-modal-close');

    const renderResults = (query = '') => {
      const q = query.toLowerCase().trim();
      const filtered = ALL_TOOLS_REGISTRY.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
      );

      if (!filtered.length) {
        resultsContainer.innerHTML = `<div class="search-no-results">No tools matching "<strong>${this.escapeHtml(query)}</strong>"</div>`;
        return;
      }

      let html = '';
      let currentCat = '';
      filtered.forEach((tool, idx) => {
        if (tool.category !== currentCat) {
          currentCat = tool.category;
          html += `<div class="search-category-title">${currentCat}</div>`;
        }
        html += `
          <a href="${tool.page}" class="search-result-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}" data-tool-id="${tool.id}">
            <div class="search-result-badge">${tool.icon}</div>
            <div class="search-result-info">
              <div class="search-result-name">${tool.name}</div>
              <div class="search-result-desc">${tool.desc}</div>
            </div>
            <span class="search-result-arrow">→</span>
          </a>
        `;
      });

      resultsContainer.innerHTML = html;

      resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          resultsContainer.querySelectorAll('.search-result-item').forEach(el => el.classList.remove('selected'));
          item.classList.add('selected');
        });
      });
    };

    const openSearch = () => {
      modal.classList.add('open');
      input.value = '';
      renderResults('');
      setTimeout(() => input.focus(), 60);
    };

    const closeSearch = () => {
      modal.classList.remove('open');
    };

    document.querySelectorAll('.open-search-btn, .search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });

    closeBtn?.addEventListener('click', closeSearch);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });

    input.addEventListener('input', (e) => renderResults(e.target.value));

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('open')) closeSearch();
        else openSearch();
      }

      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeSearch();
      }

      if (modal.classList.contains('open')) {
        const items = Array.from(resultsContainer.querySelectorAll('.search-result-item'));
        if (!items.length) return;
        const selectedIdx = items.findIndex(el => el.classList.contains('selected'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIdx = (selectedIdx + 1) % items.length;
          items.forEach(el => el.classList.remove('selected'));
          items[nextIdx].classList.add('selected');
          items[nextIdx].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIdx = (selectedIdx - 1 + items.length) % items.length;
          items.forEach(el => el.classList.remove('selected'));
          items[prevIdx].classList.add('selected');
          items[prevIdx].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedIdx >= 0 && items[selectedIdx]) {
            items[selectedIdx].click();
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // MOBILE NAVIGATION & ACCORDION DRAWER CONTROLLER
  // -------------------------------------------------------------
  initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-links');
    if (!hamburger || !navMenu) return;

    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }

    const toggleNav = (isOpen) => {
      const state = typeof isOpen === 'boolean' ? isOpen : !navMenu.classList.contains('open');
      hamburger.classList.toggle('active', state);
      navMenu.classList.toggle('open', state);
      backdrop.classList.toggle('open', state);
      document.body.style.overflow = state ? 'hidden' : '';
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    backdrop.addEventListener('click', () => {
      toggleNav(false);
    });

    // Submenu accordion toggle for mobile
    navMenu.querySelectorAll('.nav-item').forEach(item => {
      const dropdown = item.querySelector('.nav-dropdown');
      const link = item.querySelector('.nav-link');
      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 960) {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('dropdown-open');
          }
        });
      }
    });

    // Close on regular link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (!link.classList.contains('nav-link') || !link.closest('.nav-item')?.querySelector('.nav-dropdown') || window.innerWidth > 960) {
          toggleNav(false);
        }
      });
    });

    // Add mobile floating quick action bar if main editor exists
    this.initMobileQuickActionBar();
  }

  // -------------------------------------------------------------
  // FLOATING MOBILE QUICK-ACTION BAR (1-Tap Copy & Navigation)
  // -------------------------------------------------------------
  initMobileQuickActionBar() {
    const mainEditor = document.getElementById('main-editor');
    if (!mainEditor) return;

    let bar = document.getElementById('mobile-quick-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'mobile-quick-bar';
      bar.className = 'mobile-quick-action-bar';
      bar.innerHTML = `
        <button type="button" class="mobile-quick-btn" id="mobile-quick-copy" title="Copy result to clipboard">
          <span>📋</span> <span>Copy Result</span>
        </button>
        <button type="button" class="tool-btn" id="mobile-quick-clear" style="padding:0.4rem 0.65rem; min-height:auto; font-size:0.75rem; border-radius:9999px; background:rgba(255,255,255,0.15); color:#fff; border-color:rgba(255,255,255,0.25);" title="Clear text">
          <span>🗑️</span>
        </button>
        <button type="button" class="tool-btn" id="mobile-quick-scroll-top" style="padding:0.4rem 0.65rem; min-height:auto; font-size:0.75rem; border-radius:9999px; background:rgba(255,255,255,0.15); color:#fff; border-color:rgba(255,255,255,0.25);" title="Scroll to top">
          <span>⬆️</span>
        </button>
      `;
      document.body.appendChild(bar);

      document.getElementById('mobile-quick-copy')?.addEventListener('click', () => {
        const text = mainEditor.value;
        if (!text) {
          this.showToast('Editor is empty.', 'warning');
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Copied to clipboard! 📋', 'success');
        }).catch(() => {
          mainEditor.select();
          document.execCommand('copy');
          this.showToast('Copied to clipboard! 📋', 'success');
        });
      });

      document.getElementById('mobile-quick-clear')?.addEventListener('click', () => {
        if (mainEditor.value) {
          mainEditor.value = '';
          mainEditor.dispatchEvent(new Event('input', { bubbles: true }));
          this.showToast('Buffer cleared.', 'info');
        }
      });

      document.getElementById('mobile-quick-scroll-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

window.app = new ConvertsApp();
