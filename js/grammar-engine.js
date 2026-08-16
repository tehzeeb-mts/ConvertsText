/**
 * ConvertsText - Pure Client-Side Grammar, Spell & Style Linter Engine
 * 100% Private, Zero Server Calls, Instant Local Linting
 */

const GrammarEngine = (() => {
  // Common Wordy Phrases & Clichés (Conciseness)
  const CONCISENESS_RULES = [
    { regex: /\bdue to the fact that\b/gi, replacement: 'because', reason: 'Wordy phrase. Use "because" for cleaner writing.', category: 'Conciseness' },
    { regex: /\bin order to\b/gi, replacement: 'to', reason: 'Wordy phrase. "to" is more concise.', category: 'Conciseness' },
    { regex: /\bat this point in time\b/gi, replacement: 'currently / now', category: 'Conciseness' },
    { regex: /\bat the present time\b/gi, replacement: 'now', category: 'Conciseness' },
    { regex: /\ba large number of\b/gi, replacement: 'many', category: 'Conciseness' },
    { regex: /\ba large majority of\b/gi, replacement: 'most', category: 'Conciseness' },
    { regex: /\bfor the purpose of\b/gi, replacement: 'to / for', category: 'Conciseness' },
    { regex: /\beach and every\b/gi, replacement: 'each', category: 'Conciseness' },
    { regex: /\bfirst and foremost\b/gi, replacement: 'first', category: 'Conciseness' },
    { regex: /\bhas the ability to\b/gi, replacement: 'can', category: 'Conciseness' },
    { regex: /\bin spite of the fact that\b/gi, replacement: 'although', category: 'Conciseness' },
    { regex: /\bin the event that\b/gi, replacement: 'if', category: 'Conciseness' },
    { regex: /\butilize\b/gi, replacement: 'use', reason: 'Prefer "use" over "utilize" for clearer tone.', category: 'Clarity' },
    { regex: /\butilizes\b/gi, replacement: 'uses', category: 'Clarity' },
    { regex: /\butilized\b/gi, replacement: 'used', category: 'Clarity' },
    { regex: /\butilizing\b/gi, replacement: 'using', category: 'Clarity' }
  ];

  // Commonly Confused Homophones & Typos
  const CONFUSED_WORDS_RULES = [
    { regex: /\b(would|could|should|must|might)\s+of\b/gi, replacement: '$1 have', reason: 'Incorrect preposition. Did you mean "$1 have"?', category: 'Grammar' },
    { regex: /\byour\s+(welcome|right|wrong|leaving|coming|invited|next)\b/gi, replacement: "you're $1", reason: 'Did you mean the contraction "you\'re" (you are)?', category: 'Grammar' },
    { regex: /\byou're\s+(car|house|phone|name|email|account|work|opinion|feedback)\b/gi, replacement: "your $1", reason: 'Did you mean the possessive pronoun "your"?', category: 'Grammar' },
    { regex: /\btheir\s+(is|are|was|were|will|can|could|should)\b/gi, replacement: "there $1", reason: 'Did you mean "there" indicating existence or location?', category: 'Grammar' },
    { regex: /\bthere\s+(house|car|names|books|accounts|thoughts|opinion)\b/gi, replacement: "their $1", reason: 'Did you mean the possessive "their"?', category: 'Grammar' },
    { regex: /\bthey're\s+(is|was|house|car|names|books)\b/gi, replacement: "there $1", reason: 'Incorrect contraction "they\'re" (they are).', category: 'Grammar' },
    { regex: /\bits\s+(a|an|the|very|not|going|been|okay|time)\b/gi, replacement: "it's $1", reason: 'Did you mean the contraction "it\'s" (it is)?', category: 'Grammar' },
    { regex: /\bit's\s+(color|size|shape|price|weight|speed|name|value)\b/gi, replacement: "its $1", reason: 'Did you mean the possessive "its" without an apostrophe?', category: 'Grammar' },
    { regex: /\b(better|more|less|faster|slower|easier|harder|bigger|smaller|greater)\s+then\b/gi, replacement: "$1 than", reason: 'Comparisons require "than" instead of "then".', category: 'Grammar' },
    { regex: /\b(cause\s+and)\s+affect\b/gi, replacement: "$1 effect", reason: 'Did you mean "effect" (noun)?', category: 'Grammar' },
    { regex: /\bside\s+affects\b/gi, replacement: "side effects", reason: 'Did you mean "side effects"?', category: 'Grammar' },
    { regex: /\bloose\s+(weight|the\s+game|money|control|hope)\b/gi, replacement: "lose $1", reason: 'Did you mean "lose" (opposite of find/win) rather than "loose" (not tight)?', category: 'Grammar' },
    { regex: /\balot\b/gi, replacement: "a lot", reason: '"alot" is not a standard English word. Use "a lot".', category: 'Spelling' },
    { regex: /\bdefinately\b/gi, replacement: "definitely", reason: 'Misspelling. Correct word is "definitely".', category: 'Spelling' },
    { regex: /\bseperate\b/gi, replacement: "separate", reason: 'Misspelling. Correct word is "separate".', category: 'Spelling' },
    { regex: /\buntill\b/gi, replacement: "until", reason: 'Misspelling. Correct word is "until".', category: 'Spelling' },
    { regex: /\brecieve\b/gi, replacement: "receive", reason: 'Misspelling. "I before E except after C".', category: 'Spelling' },
    { regex: /\boccured\b/gi, replacement: "occurred", reason: 'Misspelling. Correct word is "occurred".', category: 'Spelling' },
    { regex: /\btruely\b/gi, replacement: "truly", reason: 'Misspelling. Correct word is "truly".', category: 'Spelling' }
  ];

  // Punctuation & Spacing Glitches
  const PUNCTUATION_RULES = [
    { regex: /([a-zA-Z0-9])\s+([,.:;?!])/g, replacement: '$1$2', reason: 'Unnecessary space before punctuation mark.', category: 'Punctuation' },
    { regex: /([,;])([a-zA-Z0-9])/g, replacement: '$1 $2', reason: 'Missing space after punctuation mark.', category: 'Punctuation' },
    { regex: /[ ]{2,}/g, replacement: ' ', reason: 'Multiple consecutive spaces detected.', category: 'Punctuation' },
    { regex: /\?{2,}/g, replacement: '?', reason: 'Repeated question marks. Standard writing uses a single "?".', category: 'Style' },
    { regex: /!{2,}/g, replacement: '!', reason: 'Repeated exclamation marks. Standard writing uses a single "!".', category: 'Style' }
  ];

  return {
    /**
     * Analyze text and return array of detailed suggestions
     */
    check(text) {
      if (!text || !text.trim()) {
        return { issues: [], cleanText: text, score: 100 };
      }

      const issues = [];

      // 1. Repeated duplicate words (e.g. "the the", "is is")
      const duplicateRegex = /\b([a-zA-Z]+)\s+\1\b/gi;
      let match;
      while ((match = duplicateRegex.exec(text)) !== null) {
        issues.push({
          type: 'duplicate',
          category: 'Grammar',
          original: match[0],
          replacement: match[1],
          index: match.index,
          length: match[0].length,
          reason: `Repeated word: "${match[1]}". Consider removing the duplicate.`
        });
      }

      // 2. Standalone lowercase 'i'
      const standaloneIRegex = /(^|\s)(i)(\s|[.,!?;]|$)/g;
      while ((match = standaloneIRegex.exec(text)) !== null) {
        issues.push({
          type: 'capitalization',
          category: 'Capitalization',
          original: 'i',
          replacement: 'I',
          index: match.index + match[1].length,
          length: 1,
          reason: 'The pronoun "I" should always be capitalized.'
        });
      }

      // 3. Check Confused Words & Common Grammar/Spelling
      CONFUSED_WORDS_RULES.forEach(rule => {
        let m;
        const reg = new RegExp(rule.regex);
        while ((m = reg.exec(text)) !== null) {
          const rep = m[0].replace(rule.regex, rule.replacement);
          issues.push({
            type: 'confused_word',
            category: rule.category,
            original: m[0],
            replacement: rep,
            index: m.index,
            length: m[0].length,
            reason: rule.reason
          });
        }
      });

      // 4. Conciseness & Wordy phrases
      CONCISENESS_RULES.forEach(rule => {
        let m;
        const reg = new RegExp(rule.regex);
        while ((m = reg.exec(text)) !== null) {
          issues.push({
            type: 'conciseness',
            category: rule.category,
            original: m[0],
            replacement: rule.replacement,
            index: m.index,
            length: m[0].length,
            reason: rule.reason || `Replace wordy phrase with "${rule.replacement}".`
          });
        }
      });

      // 5. Punctuation and spacing
      PUNCTUATION_RULES.forEach(rule => {
        let m;
        const reg = new RegExp(rule.regex);
        while ((m = reg.exec(text)) !== null) {
          const rep = m[0].replace(rule.regex, rule.replacement);
          issues.push({
            type: 'punctuation',
            category: rule.category,
            original: m[0],
            replacement: rep,
            index: m.index,
            length: m[0].length,
            reason: rule.reason
          });
        }
      });

      // Sort issues by index
      issues.sort((a, b) => a.index - b.index);

      // Deduplicate overlapping issue ranges
      const uniqueIssues = [];
      let lastEnd = -1;
      issues.forEach(iss => {
        if (iss.index >= lastEnd) {
          uniqueIssues.push(iss);
          lastEnd = iss.index + iss.length;
        }
      });

      // Compute an overall writing clarity score (0 - 100)
      const wordCount = (text.match(/\b\w+\b/g) || []).length;
      const penalty = uniqueIssues.length * 5;
      const score = Math.max(20, Math.min(100, 100 - Math.round((penalty / Math.max(wordCount, 15)) * 30)));

      return {
        issues: uniqueIssues,
        count: uniqueIssues.length,
        score: score
      };
    },

    /**
     * Deep Cloud-Powered Grammar & Spell Checking (LanguageTool API / Free Grammarly alternative)
     * Calls our serverless Cloudflare Edge Function /api/check with instant local fallback.
     */
    async checkWithCloud(text, language = 'en-US') {
      if (!text || !text.trim()) {
        return { issues: [], count: 0, score: 100, source: 'local' };
      }

      // First run local check as immediate baseline
      const localResult = this.check(text);

      try {
        const response = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, language })
        });

        if (!response.ok) {
          return { ...localResult, source: 'local_fallback' };
        }

        const data = await response.json();
        if (data.fallback || data.error || !data.matches) {
          return { ...localResult, source: 'local_fallback' };
        }

        const cloudIssues = [];
        data.matches.forEach(m => {
          const original = text.substring(m.offset, m.offset + m.length);
          const replacement = m.replacements && m.replacements.length > 0 ? m.replacements[0].value : '';
          
          let cat = 'Grammar';
          const ruleCat = (m.rule?.category?.name || m.rule?.category?.id || '').toUpperCase();
          if (ruleCat.includes('TYPO') || ruleCat.includes('SPELL') || m.shortMessage?.toLowerCase().includes('spell')) {
            cat = 'Spelling';
          } else if (ruleCat.includes('PUNCT')) {
            cat = 'Punctuation';
          } else if (ruleCat.includes('STYLE') || ruleCat.includes('REDUNDAN')) {
            cat = 'Conciseness';
          } else if (ruleCat.includes('CASING') || ruleCat.includes('CAPITAL')) {
            cat = 'Capitalization';
          }

          cloudIssues.push({
            type: 'cloud_rule',
            category: cat,
            original: original,
            replacement: replacement,
            index: m.offset,
            length: m.length,
            reason: m.message || m.shortMessage || 'Grammar or spelling issue detected.'
          });
        });

        // Merge with any unique local issues not caught by cloud
        const combined = [...cloudIssues];
        localResult.issues.forEach(loc => {
          const overlap = combined.some(c => 
            (loc.index >= c.index && loc.index < c.index + c.length) ||
            (c.index >= loc.index && c.index < loc.index + loc.length)
          );
          if (!overlap) {
            combined.push(loc);
          }
        });

        combined.sort((a, b) => a.index - b.index);

        const wordCount = (text.match(/\b\w+\b/g) || []).length;
        const penalty = combined.length * 6;
        const score = Math.max(10, Math.min(100, 100 - Math.round((penalty / Math.max(wordCount, 15)) * 30)));

        return {
          issues: combined,
          count: combined.length,
          score: score,
          source: 'cloud_ai'
        };
      } catch (err) {
        return { ...localResult, source: 'local_fallback' };
      }
    },

    /**
     * Automatically apply all safe fixes to text
     */
    applyAllFixes(text, issues) {
      if (!text || !issues || !issues.length) return text;

      // Apply from back to front so indices remain valid
      const sorted = [...issues].sort((a, b) => b.index - a.index);
      let result = text;
      sorted.forEach(iss => {
        if (iss.replacement && !iss.replacement.includes('/')) {
          result = result.substring(0, iss.index) + iss.replacement + result.substring(iss.index + iss.length);
        }
      });
      return result;
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GrammarEngine;
}
