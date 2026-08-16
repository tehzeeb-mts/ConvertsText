/**
 * ConvertsText - Core Text Conversion & Utilities Engine
 * 100% Client-Side Pure JavaScript
 */

const ConvertsEngine = (() => {
  // Minor words for Title Case
  const TITLE_CASE_MINOR_WORDS = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'as', 'at', 
    'by', 'for', 'from', 'in', 'into', 'near', 'of', 'off', 'on', 
    'onto', 'per', 'to', 'up', 'via', 'with', 'yet', 'so'
  ]);

  // Unicode character maps
  const SMALL_CAPS_MAP = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ',
    'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ',
    'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ꞯ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ',
    'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
  };

  const SUPERSCRIPT_MAP = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ',
    'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ',
    't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
    'A': 'ᴬ', 'B': 'ᴮ', 'D': 'ᴰ', 'E': 'ᴱ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ',
    'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ', 'T': 'ᵀ', 'U': 'ᵁ', 'W': 'ᵂ'
  };

  const SUBSCRIPT_MAP = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
    'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ',
    'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ'
  };

  const BUBBLE_MAP = {
    'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ',
    'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
    's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
    'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ',
    'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ',
    'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
    '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
  };

  const CURSIVE_MAP = {
    'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾',
    'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇',
    's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ',
    'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ',
    'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
  };

  const GOTHIC_MAP = {
    'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦',
    'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯',
    's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷',
    'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ',
    'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ',
    'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ'
  };

  const UPSIDE_DOWN_MAP = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ',
    'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
    's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
    'A': '∀', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I',
    'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ',
    'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
    '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
    '.': '˙', ',': '\'', '\'': ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[',
    '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾'
  };

  const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
    '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
  };
  const REVERSE_MORSE_MAP = Object.entries(MORSE_MAP).reduce((acc, [k, v]) => { acc[v] = k; return acc; }, {});

  const NATO_MAP = {
    'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot',
    'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett', 'K': 'Kilo', 'L': 'Lima',
    'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo',
    'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray',
    'Y': 'Yankee', 'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
    '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner'
  };

  // Multi-Theme Placeholder Dictionaries
  const THEME_DICTIONARIES = {
    classic: [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
      'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
      'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
      'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
      'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ],
    tech: [
      'kubernetes', 'cloud-native', 'microservices', 'serverless', 'docker', 'graphql', 'rest-api',
      'machine-learning', 'neural-network', 'typescript', 'react', 'nextjs', 'tailwind', 'devops',
      'ci-cd', 'pipeline', 'kafka', 'redis', 'postgres', 'distributed', 'scalability', 'latency',
      'observability', 'telemetry', 'fullstack', 'architecture', 'load-balancer', 'asynchronous',
      'event-driven', 'frontend', 'backend', 'webhook', 'containerization', 'agile', 'sprint', 'git'
    ],
    corporate: [
      'synergy', 'deliverables', 'leverage', 'pivot', 'bandwidth', 'circle-back', 'touch-base',
      'actionable-insights', 'paradigm-shift', 'scalable', 'roi', 'core-competency', 'value-add',
      'deep-dive', 'game-changer', 'stakeholders', 'alignment', 'streamline', 'empower', 'holistic',
      'frictionless', 'omnichannel', 'low-hanging-fruit', 'win-win', 'thought-leadership', 'north-star'
    ],
    pirate: [
      'ahoy', 'matey', 'shiver-me-timbers', 'plunder', 'booty', 'grog', 'scallywag', 'buccaneer',
      'walk-the-plank', 'black-spot', 'avast', 'corsair', 'doubloons', 'pieces-of-eight', 'jolly-roger',
      'aye', 'landlubber', 'starboard', 'portside', 'cutlass', 'high-seas', 'treasure-chest', 'galleon'
    ],
    hipster: [
      'artisanal', 'kombucha', 'cold-pressed', 'bespoke', 'fixie', 'pour-over', 'vinyl', 'succulent',
      'quinoa', 'avocado-toast', 'farm-to-table', 'craft-beer', 'aesthetic', 'vintage', 'ethical',
      'sustainable', 'locally-sourced', 'raw-denim', 'typewriter', 'polaroid', 'sourdough', 'microdosing'
    ],
    cyberpunk: [
      'neural-link', 'cyberdeck', 'matrix', 'nanotech', 'megacorp', 'netrunner', 'neon', 'subroutine',
      'mainframe', 'cyberspace', 'synthetic', 'augmented', 'glitch', 'biometric', 'dystopia',
      'terminal', 'overclock', 'firewall', 'cryo', 'quantum', 'black-ice', 'encrypted', 'protocol'
    ]
  };

  // Reverse unicode mappings helper for lossless switching (only map non-ASCII glyphs to ASCII)
  const REVERSE_UNICODE_MAP = {};
  [
    SMALL_CAPS_MAP, SUPERSCRIPT_MAP, SUBSCRIPT_MAP, 
    BUBBLE_MAP, CURSIVE_MAP, GOTHIC_MAP, UPSIDE_DOWN_MAP
  ].forEach(map => {
    Object.entries(map).forEach(([k, v]) => {
      if (v && v.charCodeAt(0) > 127) {
        REVERSE_UNICODE_MAP[v] = k;
      }
    });
  });

  function normalizeToPlainText(text) {
    if (!text) return '';
    let result = '';
    // Strip combining characters like strikethrough (\u0336), underline (\u035F), and zalgo marks (\u0300-\u036f)
    const stripped = text.replace(/[\u0300-\u036f]/g, '');
    for (const char of stripped) {
      const code = char.charCodeAt(0);
      // Fullwidth / Wide text (0xFF01 to 0xFF5E)
      if (code >= 65281 && code <= 65374) {
        result += String.fromCharCode(code - 65248);
      } else if (char === '　') { // Fullwidth space
        result += ' ';
      } else if (REVERSE_UNICODE_MAP[char]) {
        result += REVERSE_UNICODE_MAP[char];
      } else {
        result += char;
      }
    }
    return result;
  }

  // Helper: split text into developer word tokens cleanly
  function extractWords(text) {
    if (!text) return [];
    let plain = normalizeToPlainText(text);
    // If binary, decode first
    if (/^[01]{8}(?:\s+[01]{8})+$/.test(plain.trim())) {
      try {
        const decoded = ConvertsEngine.fromBinary(plain);
        if (decoded && !decoded.startsWith('Error:')) plain = decoded;
      } catch (e) {}
    }
    return plain
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
      .replace(/[^a-zA-Z0-9\u00C0-\u024F]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  // Helper: unpack camelCase, PascalCase, snake_case, kebab-case, dot.case, CONSTANT_CASE, binary into natural spaced words
  function unpackDeveloperSlugs(text) {
    if (!text) return '';
    let plain = normalizeToPlainText(text);

    // If input is purely binary (8-bit bytes), decode it back to text
    if (/^[01]{8}(?:\s+[01]{8})+$/.test(plain.trim())) {
      try {
        const decoded = ConvertsEngine.fromBinary(plain);
        if (decoded && !decoded.startsWith('Error:')) plain = decoded;
      } catch (e) {}
    }

    return plain.split('\n').map(line => {
      // If line has natural spaces and is standard prose with punctuation, preserve it
      if (line.includes(' ') && !/^[a-zA-Z0-9_\-./\\]+$/.test(line.trim())) {
        // Expand isolated camelCase words inside sentences without losing commas/periods
        return line.replace(/\b[a-zA-Z0-9_\-./\\]+\b/g, token => {
          if (/[_\-./\\]/.test(token) && !/^https?:\/\//i.test(token) && !/^\d+\.\d+$/.test(token)) {
            return token.replace(/[_\-./\\]+/g, ' ');
          }
          if (/([a-z\d])([A-Z])/.test(token)) {
            return token.replace(/([a-z\d])([A-Z])/g, '$1 $2')
                        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2');
          }
          return token;
        });
      }

      // Otherwise, unpack the slug line
      let unp = line
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
        .replace(/[_\-./\\]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return unp || line;
    }).join('\n');
  }

  return {
    // -------------------------------------------------------------
    // STANDARD CASES (With Lossless Chaining & Boundary Normalization)
    // -------------------------------------------------------------
    toSentenceCase(text) {
      if (!text) return '';
      const normalized = unpackDeveloperSlugs(text);
      let result = normalized.toLowerCase();
      result = result.replace(/(^\s*|[.!?\n]\s*)([a-z\u00E0-\u00FC])/g, (m, p1, p2) => p1 + p2.toUpperCase());
      result = result.replace(/\b(i)\b/g, 'I');
      return result;
    },

    toLowerCase(text) {
      if (!text) return '';
      const plain = normalizeToPlainText(text);
      return plain.toLowerCase();
    },

    toUpperCase(text) {
      if (!text) return '';
      const plain = normalizeToPlainText(text);
      return plain.toUpperCase();
    },

    toCapitalizedCase(text) {
      if (!text) return '';
      const normalized = unpackDeveloperSlugs(text);
      return normalized.toLowerCase().replace(/\b([a-z\u00C0-\u024F])/gi, m => m.toUpperCase());
    },

    toTitleCase(text, customIgnoreWords) {
      if (!text) return '';
      const normalized = unpackDeveloperSlugs(text);
      const ignore = customIgnoreWords ? new Set(customIgnoreWords) : TITLE_CASE_MINOR_WORDS;
      
      return normalized.toLowerCase().replace(/\b[a-z\d]+(?:'[a-z]+)?\b/gi, (word, index, fullStr) => {
        const isFirstWord = index === 0 || /[\.\!\?\n\:\;\-\—]\s*$/.test(fullStr.slice(0, index));
        const isLastWord = index + word.length >= fullStr.trimEnd().length;
        const lower = word.toLowerCase();

        if (!isFirstWord && !isLastWord && ignore.has(lower)) {
          return lower;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
    },

    toAlternatingCase(text) {
      if (!text) return '';
      const plain = normalizeToPlainText(text);
      let isUpper = false;
      return plain.split('').map(char => {
        if (/[a-zA-Z\u00C0-\u024F]/.test(char)) {
          const res = isUpper ? char.toUpperCase() : char.toLowerCase();
          isUpper = !isUpper;
          return res;
        }
        return char;
      }).join('');
    },

    toInverseCase(text) {
      if (!text) return '';
      const plain = normalizeToPlainText(text);
      return plain.split('').map(char => {
        if (char === char.toUpperCase()) return char.toLowerCase();
        return char.toUpperCase();
      }).join('');
    },

    toMockingCase(text) {
      if (!text) return '';
      const plain = normalizeToPlainText(text);
      let isUpper = true;
      return plain.split('').map(char => {
        if (/[a-zA-Z\u00C0-\u024F]/.test(char)) {
          const rand = Math.random() > 0.85 ? !isUpper : isUpper;
          const res = rand ? char.toUpperCase() : char.toLowerCase();
          isUpper = !isUpper;
          return res;
        }
        return char;
      }).join('');
    },

    // -------------------------------------------------------------
    // DEVELOPER / PROGRAMMING CASES
    // -------------------------------------------------------------
    toCamelCase(text) {
      const words = extractWords(text);
      if (!words.length) return '';
      return words.map((w, i) => {
        const lower = w.toLowerCase();
        if (i === 0) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }).join('');
    },

    toPascalCase(text) {
      const words = extractWords(text);
      if (!words.length) return '';
      return words.map(w => {
        const lower = w.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }).join('');
    },

    toSnakeCase(text) {
      const words = extractWords(text);
      return words.map(w => w.toLowerCase()).join('_');
    },

    toKebabCase(text) {
      const words = extractWords(text);
      return words.map(w => w.toLowerCase()).join('-');
    },

    toConstantCase(text) {
      const words = extractWords(text);
      return words.map(w => w.toUpperCase()).join('_');
    },

    toDotCase(text) {
      const words = extractWords(text);
      return words.map(w => w.toLowerCase()).join('.');
    },

    toPathCase(text) {
      const words = extractWords(text);
      return words.map(w => w.toLowerCase()).join('/');
    },

    toHeaderCase(text) {
      const words = extractWords(text);
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('-');
    },

    toCobolCase(text) {
      const words = extractWords(text);
      return words.map(w => w.toUpperCase()).join('-');
    },

    // -------------------------------------------------------------
    // STYLIZED / FANCY UNICODE TEXT
    // -------------------------------------------------------------
    toSmallCaps(text) {
      if (!text) return '';
      return text.split('').map(char => {
        const lower = char.toLowerCase();
        return SMALL_CAPS_MAP[lower] || char;
      }).join('');
    },

    toWideText(text) {
      if (!text) return '';
      return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (char === ' ') return '  ';
        if (code >= 33 && code <= 126) {
          return String.fromCharCode(code + 65248);
        }
        return char;
      }).join('');
    },

    toSuperscript(text) {
      if (!text) return '';
      return text.split('').map(char => SUPERSCRIPT_MAP[char] || char).join('');
    },

    toSubscript(text) {
      if (!text) return '';
      return text.split('').map(char => SUBSCRIPT_MAP[char] || char).join('');
    },

    toBubbleText(text) {
      if (!text) return '';
      return text.split('').map(char => BUBBLE_MAP[char] || char).join('');
    },

    toCursiveText(text) {
      if (!text) return '';
      return text.split('').map(char => CURSIVE_MAP[char] || char).join('');
    },

    toGothicText(text) {
      if (!text) return '';
      return text.split('').map(char => GOTHIC_MAP[char] || char).join('');
    },

    toUpsideDown(text) {
      if (!text) return '';
      return text.split('').map(char => UPSIDE_DOWN_MAP[char] || char).reverse().join('');
    },

    toReversedText(text) {
      if (!text) return '';
      return Array.from(text).reverse().join('');
    },

    toReverseWords(text) {
      if (!text) return '';
      return text.split('\n').map(line => line.split(/\s+/).reverse().join(' ')).join('\n');
    },

    toStrikethrough(text) {
      if (!text) return '';
      return text.split('').map(char => char === '\n' ? '\n' : char + '\u0336').join('');
    },

    toUnderline(text) {
      if (!text) return '';
      return text.split('').map(char => char === '\n' ? '\n' : char + '\u035F').join('');
    },

    toZalgoText(text, chaos = 'medium') {
      if (!text) return '';
      const marksUp = [
        '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
        '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c'
      ];
      const marksMid = [
        '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
        '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362'
      ];
      const marksDown = [
        '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
        '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330'
      ];

      let numUp = 2, numMid = 1, numDown = 2;
      if (chaos === 'mini') { numUp = 1; numMid = 0; numDown = 1; }
      if (chaos === 'max') { numUp = 6; numMid = 3; numDown = 6; }

      return text.split('').map(char => {
        if (/\s/.test(char)) return char;
        let result = char;
        for (let i = 0; i < Math.floor(Math.random() * numUp) + 1; i++) {
          result += marksUp[Math.floor(Math.random() * marksUp.length)];
        }
        for (let i = 0; i < Math.floor(Math.random() * numMid); i++) {
          result += marksMid[Math.floor(Math.random() * marksMid.length)];
        }
        for (let i = 0; i < Math.floor(Math.random() * numDown) + 1; i++) {
          result += marksDown[Math.floor(Math.random() * marksDown.length)];
        }
        return result;
      }).join('');
    },

    // -------------------------------------------------------------
    // CIPHERS & ENCODERS
    // -------------------------------------------------------------
    toBinary(text) {
      if (!text) return '';
      return new TextEncoder().encode(text).reduce((acc, byte) => {
        return acc + (acc ? ' ' : '') + byte.toString(2).padStart(8, '0');
      }, '');
    },

    fromBinary(binary) {
      if (!binary) return '';
      try {
        const clean = binary.trim().replace(/[^01\s]/g, '');
        const bytes = clean.split(/\s+/).filter(Boolean).map(bin => parseInt(bin, 2));
        return new TextDecoder().decode(new Uint8Array(bytes));
      } catch (e) {
        return 'Error: Invalid binary input';
      }
    },

    toHex(text) {
      if (!text) return '';
      return new TextEncoder().encode(text).reduce((acc, byte) => {
        return acc + (acc ? ' ' : '') + byte.toString(16).padStart(2, '0').toUpperCase();
      }, '');
    },

    fromHex(hex) {
      if (!hex) return '';
      try {
        const clean = hex.replace(/[^a-fA-F0-9]/g, '');
        if (clean.length % 2 !== 0) return 'Error: Hex string length must be even';
        const bytes = [];
        for (let i = 0; i < clean.length; i += 2) {
          bytes.push(parseInt(clean.substr(i, 2), 16));
        }
        return new TextDecoder().decode(new Uint8Array(bytes));
      } catch (e) {
        return 'Error: Invalid hex input';
      }
    },

    toBase64(text) {
      if (!text) return '';
      try {
        const bytes = new TextEncoder().encode(text);
        let binStr = '';
        bytes.forEach(b => { binStr += String.fromCharCode(b); });
        return btoa(binStr);
      } catch (e) {
        return 'Error: Base64 encoding failed';
      }
    },

    fromBase64(base64) {
      if (!base64) return '';
      try {
        const binStr = atob(base64.trim());
        const bytes = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i++) {
          bytes[i] = binStr.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
      } catch (e) {
        return 'Error: Invalid Base64 string';
      }
    },

    toUrlEncode(text) {
      if (!text) return '';
      return encodeURIComponent(text);
    },

    fromUrlDecode(text) {
      if (!text) return '';
      try {
        return decodeURIComponent(text);
      } catch (e) {
        return 'Error: Invalid URL encoded string';
      }
    },

    toRot13(text) {
      if (!text) return '';
      return text.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + 13) % 26) + 65);
        }
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      });
    },

    toMorseCode(text) {
      if (!text) return '';
      return text.toUpperCase().split('').map(char => {
        return MORSE_MAP[char] !== undefined ? MORSE_MAP[char] : (char === '\n' ? '\n' : '?');
      }).join(' ');
    },

    fromMorseCode(morse) {
      if (!morse) return '';
      return morse.trim().split(/\n/).map(line => {
        return line.trim().split(/\s{2,}|\s*\/\s*/).map(word => {
          return word.split(/\s+/).map(code => REVERSE_MORSE_MAP[code] || '?').join('');
        }).join(' ');
      }).join('\n');
    },

    toNatoPhonetic(text) {
      if (!text) return '';
      return text.toUpperCase().split('').map(char => {
        if (char === ' ') return '[space]';
        if (char === '\n') return '\n';
        return NATO_MAP[char] || char;
      }).join(' ');
    },

    // -------------------------------------------------------------
    // ZERO-WIDTH STEGANOGRAPHY & INVISIBLE TEXT
    // -------------------------------------------------------------
    encodeInvisibleMessage(coverText, secretText) {
      if (!secretText) return coverText || '';
      const cover = coverText || 'Click here to reveal the secret.';
      
      // Convert secretText to binary string
      const bytes = new TextEncoder().encode(secretText);
      let binaryStr = '';
      bytes.forEach(b => {
        binaryStr += b.toString(2).padStart(8, '0');
      });

      // Zero-width space \u200B = '0', Zero-width non-joiner \u200C = '1'
      // Delimiter \u200D (zero-width joiner)
      let hiddenUnicode = '\u200D';
      for (let i = 0; i < binaryStr.length; i++) {
        hiddenUnicode += binaryStr[i] === '0' ? '\u200B' : '\u200C';
      }
      hiddenUnicode += '\u200D';

      // Insert hidden characters after the first character of cover text
      if (cover.length > 1) {
        return cover.slice(0, 1) + hiddenUnicode + cover.slice(1);
      }
      return cover + hiddenUnicode;
    },

    decodeInvisibleMessage(text) {
      if (!text) return '';
      // Find content between delimiters \u200D...\u200D or match zero-width chars
      const match = text.match(/\u200D([\u200B\u200C]+)\u200D/);
      if (!match) {
        // Try fallback to any sequence of \u200B and \u200C
        const fallback = text.match(/[\u200B\u200C]{8,}/);
        if (!fallback) return 'No hidden message found in the text.';
        return this.binaryToDecodedText(fallback[0]);
      }
      return this.binaryToDecodedText(match[1]);
    },

    binaryToDecodedText(zeroWidthStr) {
      let bin = '';
      for (let i = 0; i < zeroWidthStr.length; i++) {
        if (zeroWidthStr[i] === '\u200B') bin += '0';
        else if (zeroWidthStr[i] === '\u200C') bin += '1';
      }

      if (bin.length % 8 !== 0) {
        bin = bin.slice(0, bin.length - (bin.length % 8));
      }

      const bytes = [];
      for (let i = 0; i < bin.length; i += 8) {
        bytes.push(parseInt(bin.substr(i, 8), 2));
      }

      try {
        return new TextDecoder().decode(new Uint8Array(bytes));
      } catch (e) {
        return 'Error: Could not decode hidden message.';
      }
    },

    // -------------------------------------------------------------
    // MULTI-THEME LOREM IPSUM GENERATOR
    // -------------------------------------------------------------
    generateLoremIpsum(theme = 'classic', type = 'paragraphs', count = 4, startWithStandard = true, wrapHtml = false) {
      const wordsPool = THEME_DICTIONARIES[theme] || THEME_DICTIONARIES.classic;

      function makeSentence() {
        const len = Math.floor(Math.random() * 8) + 8;
        const words = [];
        for (let i = 0; i < len; i++) {
          words.push(wordsPool[Math.floor(Math.random() * wordsPool.length)]);
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ') + '.';
      }

      function makeParagraph() {
        const numSentences = Math.floor(Math.random() * 3) + 4;
        const sentences = [];
        for (let i = 0; i < numSentences; i++) {
          sentences.push(makeSentence());
        }
        return sentences.join(' ');
      }

      const safeCount = Math.max(1, Math.min(100, count));

      if (type === 'paragraphs') {
        const paragraphs = [];
        for (let i = 0; i < safeCount; i++) {
          let p = makeParagraph();
          if (i === 0 && startWithStandard && theme === 'classic') {
            p = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + p;
          }
          paragraphs.push(wrapHtml ? `<p>${p}</p>` : p);
        }
        return paragraphs.join('\n\n');
      }

      if (type === 'sentences') {
        const sentences = [];
        for (let i = 0; i < safeCount; i++) {
          sentences.push(makeSentence());
        }
        const res = sentences.join(' ');
        return wrapHtml ? `<p>${res}</p>` : res;
      }

      if (type === 'words') {
        const words = [];
        for (let i = 0; i < safeCount; i++) {
          words.push(wordsPool[Math.floor(Math.random() * wordsPool.length)]);
        }
        if (startWithStandard && theme === 'classic' && safeCount >= 5) {
          words.splice(0, 5, 'lorem', 'ipsum', 'dolor', 'sit', 'amet');
        }
        return words.join(' ');
      }

      if (type === 'list') {
        const items = [];
        for (let i = 0; i < safeCount; i++) {
          const s = makeSentence().slice(0, -1);
          items.push(wrapHtml ? `  <li>${s}</li>` : `• ${s}`);
        }
        return wrapHtml ? `<ul>\n${items.join('\n')}\n</ul>` : items.join('\n');
      }

      return '';
    },

    // -------------------------------------------------------------
    // RANDOM STRING, UUID & SECURE PASSWORD GENERATOR
    // -------------------------------------------------------------
    generateSecurePassword(length = 16, includeUpper = true, includeLower = true, includeDigits = true, includeSymbols = true, excludeAmbiguous = false) {
      let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lowercase = 'abcdefghijklmnopqrstuvwxyz';
      let digits = '0123456789';
      let symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

      if (excludeAmbiguous) {
        uppercase = uppercase.replace(/[IO]/g, '');
        lowercase = lowercase.replace(/[l]/g, '');
        digits = digits.replace(/[01]/g, '');
        symbols = symbols.replace(/[|`~]/g, '');
      }

      let charset = '';
      if (includeUpper) charset += uppercase;
      if (includeLower) charset += lowercase;
      if (includeDigits) charset += digits;
      if (includeSymbols) charset += symbols;

      if (!charset) charset = lowercase + digits;

      const randomBytes = new Uint32Array(length);
      window.crypto.getRandomValues(randomBytes);

      let result = '';
      for (let i = 0; i < length; i++) {
        result += charset[randomBytes[i] % charset.length];
      }
      return result;
    },

    generateUUIDv4() {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    generateUUIDs(count = 5) {
      const safeCount = Math.max(1, Math.min(100, count));
      const res = [];
      for (let i = 0; i < safeCount; i++) {
        res.push(this.generateUUIDv4());
      }
      return res.join('\n');
    },

    // -------------------------------------------------------------
    // MARKDOWN TO HTML CONVERTER
    // -------------------------------------------------------------
    markdownToHtml(md) {
      if (!md) return '';
      let html = md
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Code blocks
      html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (m, lang, code) => {
        return `<pre><code class="language-${lang}">${code}</code></pre>`;
      });

      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

      // Headings (# h1, ## h2, ### h3, #### h4)
      html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

      // Blockquotes
      html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

      // Bold & Italic
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');

      // Links & Images
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

      // Unordered lists
      html = html.replace(/^\s*[-*+]\s+(.*$)/gim, '<ul><li>$1</li></ul>');
      html = html.replace(/<\/ul>\s*<ul>/gim, '');

      // Paragraphs
      html = html.split(/\n{2,}/).map(paragraph => {
        if (/^<(h[1-6]|ul|ol|pre|blockquote)/.test(paragraph)) {
          return paragraph;
        }
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
      }).join('\n\n');

      return html;
    },

    // -------------------------------------------------------------
    // TEXT CLEANERS & FORMATTERS
    // -------------------------------------------------------------
    removeDuplicateLines(text, caseSensitive = false, trim = true) {
      if (!text) return '';
      const lines = text.split('\n');
      const seen = new Set();
      const result = [];

      for (const rawLine of lines) {
        const line = trim ? rawLine.trim() : rawLine;
        const key = caseSensitive ? line : line.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          result.push(rawLine);
        }
      }
      return result.join('\n');
    },

    sortLines(text, mode = 'az') {
      if (!text) return '';
      const lines = text.split('\n');
      
      switch (mode) {
        case 'az':
          return lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })).join('\n');
        case 'za':
          return lines.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })).join('\n');
        case 'length-asc':
          return lines.sort((a, b) => a.length - b.length || a.localeCompare(b)).join('\n');
        case 'length-desc':
          return lines.sort((a, b) => b.length - a.length || a.localeCompare(b)).join('\n');
        case 'reverse':
          return lines.reverse().join('\n');
        case 'shuffle':
          for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
          }
          return lines.join('\n');
        default:
          return text;
      }
    },

    removeExtraSpaces(text) {
      if (!text) return '';
      return text.split('\n').map(line => line.replace(/[ \t]+/g, ' ').trim()).join('\n');
    },

    removeLineBreaks(text, separator = ' ') {
      if (!text) return '';
      return text.replace(/\r?\n|\r/g, separator).replace(/\s+/g, separator === ' ' ? ' ' : separator);
    },

    removeEmptyLines(text) {
      if (!text) return '';
      return text.split('\n').filter(line => line.trim().length > 0).join('\n');
    },

    stripHtmlTags(text) {
      if (!text) return '';
      return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    },

    addLineNumbers(text, start = 1, format = 'number-dot') {
      if (!text) return '';
      const lines = text.split('\n');
      return lines.map((line, idx) => {
        const num = start + idx;
        if (format === 'bracket') return `[${num}] ${line}`;
        if (format === 'zero-padded') return `${String(num).padStart(2, '0')}. ${line}`;
        if (format === 'hash') return `#${num} ${line}`;
        return `${num}. ${line}`;
      }).join('\n');
    },

    findAndReplace(text, findStr, replaceStr, caseSensitive = true, useRegex = false, replaceAll = true) {
      if (!text || !findStr) return text || '';
      try {
        let flags = '';
        if (replaceAll) flags += 'g';
        if (!caseSensitive) flags += 'i';
        
        let pattern;
        if (useRegex) {
          pattern = new RegExp(findStr, flags);
        } else {
          pattern = new RegExp(findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        }
        return text.replace(pattern, replaceStr || '');
      } catch (e) {
        return `Error: Invalid Regex - ${e.message}`;
      }
    },

    // -------------------------------------------------------------
    // TEXT STATISTICS & ANALYSIS
    // -------------------------------------------------------------
    getTextStats(text) {
      if (!text || !text.trim()) {
        return {
          characters: 0,
          charactersNoSpaces: 0,
          words: 0,
          sentences: 0,
          paragraphs: 0,
          lines: 0,
          readingTimeSeconds: 0,
          readingTimeFormatted: '0 sec',
          speakingTimeSeconds: 0,
          speakingTimeFormatted: '0 sec',
          averageWordLength: 0,
          syllables: 0,
          topWords: []
        };
      }

      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      
      const wordsArr = text.trim().match(/\b[\w'-]+\b/g) || [];
      const words = wordsArr.length;

      const sentencesArr = text.match(/[^.!?\n]+[.!?\n]+/g) || (text.trim() ? [text] : []);
      const sentences = sentencesArr.length;

      const paragraphsArr = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      const paragraphs = paragraphsArr.length || (text.trim() ? 1 : 0);

      const lines = text.split('\n').length;

      const readingMinutes = words / 225;
      const readingTimeSeconds = Math.round(readingMinutes * 60);
      const readingTimeFormatted = readingTimeSeconds < 60 
        ? `${readingTimeSeconds}s` 
        : `${Math.floor(readingTimeSeconds / 60)}m ${readingTimeSeconds % 60}s`;

      const speakingMinutes = words / 130;
      const speakingTimeSeconds = Math.round(speakingMinutes * 60);
      const speakingTimeFormatted = speakingTimeSeconds < 60 
        ? `${speakingTimeSeconds}s` 
        : `${Math.floor(speakingTimeSeconds / 60)}m ${speakingTimeSeconds % 60}s`;

      let syllables = 0;
      wordsArr.forEach(w => {
        const word = w.toLowerCase().replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
        const syl = word.match(/[aeiouy]{1,2}/g);
        syllables += syl ? syl.length : 1;
      });

      const averageWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0;

      const freqMap = {};
      const stopWords = new Set(['the', 'and', 'to', 'of', 'a', 'in', 'that', 'is', 'it', 'for', 'on', 'with', 'as', 'this', 'was', 'at', 'by', 'an', 'be', 'are']);
      wordsArr.forEach(w => {
        const clean = w.toLowerCase();
        if (clean.length > 2 && !stopWords.has(clean)) {
          freqMap[clean] = (freqMap[clean] || 0) + 1;
        }
      });
      const topWords = Object.entries(freqMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([word, count]) => ({ word, count, percentage: ((count / words) * 100).toFixed(1) }));

      return {
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        lines,
        readingTimeSeconds,
        readingTimeFormatted,
        speakingTimeSeconds,
        speakingTimeFormatted,
        averageWordLength,
        syllables,
        topWords
      };
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConvertsEngine;
} else {
  window.ConvertsEngine = ConvertsEngine;
}
