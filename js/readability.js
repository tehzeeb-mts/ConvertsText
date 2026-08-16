/**
 * ConvertsText - Comprehensive Text Readability & Linguistic Analyzer Engine
 * Implements 5 Standard Academic Readability Formulas:
 * 1. Flesch Reading Ease
 * 2. Flesch-Kincaid Grade Level
 * 3. Gunning Fog Index
 * 4. Coleman-Liau Index
 * 5. Automated Readability Index (ARI)
 */

const ReadabilityEngine = (() => {
  // Count syllables in an English word
  function countWordSyllables(word) {
    if (!word) return 0;
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!clean) return 0;
    if (clean.length <= 3) return 1;

    // Remove endings that usually don't add syllables
    let w = clean
      .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
      .replace(/^y/, '');

    const matches = w.match(/[aeiouy]{1,2}/g);
    return matches ? Math.max(1, matches.length) : 1;
  }

  // Check if a word is complex (3 or more syllables, excluding common suffixes)
  function isComplexWord(word) {
    if (!word || word.length < 5) return false;
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    // Ignore common jargon or compound endings
    const base = clean.replace(/(?:ing|ed|es|ly)$/, '');
    return countWordSyllables(base) >= 3;
  }

  // Calculate sentiment score estimation based on basic lexicon
  function estimateSentiment(words) {
    const positiveWords = new Set([
      'good', 'great', 'excellent', 'amazing', 'positive', 'wonderful', 'fantastic', 'superb',
      'outstanding', 'terrific', 'awesome', 'brilliant', 'exceptional', 'love', 'perfect',
      'best', 'delightful', 'happy', 'pleasure', 'success', 'successful', 'beautiful', 'effective',
      'efficient', 'valuable', 'fabulous', 'smart', 'helpful', 'fast', 'secure', 'easy', 'reliable'
    ]);
    const negativeWords = new Set([
      'bad', 'terrible', 'horrible', 'poor', 'negative', 'awful', 'dreadful', 'unfortunate',
      'disappointing', 'worst', 'hate', 'problem', 'failure', 'fail', 'flaw', 'broken', 'error',
      'ugly', 'slow', 'difficult', 'painful', 'annoying', 'useless', 'harmful', 'risky', 'confusing',
      'danger', 'dangerous', 'vulnerable', 'wrong', 'severe', 'hard'
    ]);

    let pos = 0;
    let neg = 0;
    words.forEach(w => {
      const lower = w.toLowerCase().replace(/[^a-z]/g, '');
      if (positiveWords.has(lower)) pos++;
      if (negativeWords.has(lower)) neg++;
    });

    const diff = pos - neg;
    if (diff > 1) return { score: diff, label: 'Positive', emoji: '😊', color: 'var(--accent-emerald)' };
    if (diff < -1) return { score: diff, label: 'Negative', emoji: '😟', color: 'var(--accent-rose)' };
    return { score: 0, label: 'Neutral', emoji: '😐', color: 'var(--accent-cyan)' };
  }

  return {
    analyze(text) {
      if (!text || !text.trim()) {
        return {
          fleschReadingEase: { score: 0, label: 'N/A', grade: 'N/A', badge: 'neutral' },
          fleschKincaidGrade: 0,
          gunningFog: 0,
          colemanLiau: 0,
          ari: 0,
          words: 0,
          uniqueWords: 0,
          lexicalDiversity: 0,
          sentences: 0,
          paragraphs: 0,
          characters: 0,
          charactersNoSpaces: 0,
          syllables: 0,
          complexWordsCount: 0,
          complexWordsPercentage: 0,
          avgWordLength: 0,
          avgSentenceLength: 0,
          sentenceDistribution: { short: 0, medium: 0, long: 0 },
          longestWords: [],
          sentiment: { score: 0, label: 'Neutral', emoji: '😐', color: 'var(--accent-cyan)' }
        };
      }

      const rawWords = text.trim().match(/\b[a-zA-Z0-9'-]+\b/g) || [];
      const wordsCount = rawWords.length || 1;
      
      const uniqueWordsSet = new Set(rawWords.map(w => w.toLowerCase()));
      const uniqueWords = uniqueWordsSet.size;
      const lexicalDiversity = ((uniqueWords / wordsCount) * 100).toFixed(1);

      const sentencesMatch = text.match(/[^.!?\n]+[.!?\n]+/g) || (text.trim() ? [text] : []);
      const sentencesCount = Math.max(1, sentencesMatch.length);

      const paragraphsArr = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      const paragraphsCount = Math.max(1, paragraphsArr.length);

      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;

      // Syllable calculations
      let totalSyllables = 0;
      let complexWordsCount = 0;
      const wordLengths = [];

      rawWords.forEach(w => {
        const syl = countWordSyllables(w);
        totalSyllables += syl;
        if (isComplexWord(w)) complexWordsCount++;
        wordLengths.push(w.length);
      });

      const complexWordsPercentage = ((complexWordsCount / wordsCount) * 100).toFixed(1);
      const avgWordLength = (charactersNoSpaces / wordsCount).toFixed(1);
      const avgSentenceLength = (wordsCount / sentencesCount).toFixed(1);

      // 1. Flesch Reading Ease Formula
      // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
      let fleschScore = 206.835 - (1.015 * (wordsCount / sentencesCount)) - (84.6 * (totalSyllables / wordsCount));
      fleschScore = Math.max(0, Math.min(100, Math.round(fleschScore * 10) / 10));

      let fleschLabel = 'Standard';
      let fleschGrade = '8th & 9th Grade';
      let fleschBadge = 'standard';

      if (fleschScore >= 90) {
        fleschLabel = 'Very Easy';
        fleschGrade = '5th Grade (10-11 yrs old)';
        fleschBadge = 'easy';
      } else if (fleschScore >= 80) {
        fleschLabel = 'Easy';
        fleschGrade = '6th Grade (11-12 yrs old)';
        fleschBadge = 'easy';
      } else if (fleschScore >= 70) {
        fleschLabel = 'Fairly Easy';
        fleschGrade = '7th Grade (12-13 yrs old)';
        fleschBadge = 'easy';
      } else if (fleschScore >= 60) {
        fleschLabel = 'Plain English / Standard';
        fleschGrade = '8th & 9th Grade (13-15 yrs old)';
        fleschBadge = 'standard';
      } else if (fleschScore >= 50) {
        fleschLabel = 'Fairly Difficult';
        fleschGrade = '10th to 12th Grade (High School)';
        fleschBadge = 'hard';
      } else if (fleschScore >= 30) {
        fleschLabel = 'Difficult';
        fleschGrade = 'College Level (18-22 yrs old)';
        fleschBadge = 'hard';
      } else {
        fleschLabel = 'Very Confusing / Academic';
        fleschGrade = 'College Graduate & Professional';
        fleschBadge = 'academic';
      }

      // 2. Flesch-Kincaid Grade Level
      // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
      let fkGrade = (0.39 * (wordsCount / sentencesCount)) + (11.8 * (totalSyllables / wordsCount)) - 15.59;
      fkGrade = Math.max(1, Math.round(fkGrade * 10) / 10);

      // 3. Gunning Fog Index
      // 0.4 * ((words / sentences) + 100 * (complex words / words))
      let gunningFog = 0.4 * ((wordsCount / sentencesCount) + (100 * (complexWordsCount / wordsCount)));
      gunningFog = Math.max(1, Math.round(gunningFog * 10) / 10);

      // 4. Coleman-Liau Index
      // 0.0588 * L - 0.296 * S - 15.8
      // L = average number of letters per 100 words
      // S = average number of sentences per 100 words
      const L = (charactersNoSpaces / wordsCount) * 100;
      const S = (sentencesCount / wordsCount) * 100;
      let colemanLiau = (0.0588 * L) - (0.296 * S) - 15.8;
      colemanLiau = Math.max(1, Math.round(colemanLiau * 10) / 10);

      // 5. Automated Readability Index (ARI)
      // 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43
      let ari = (4.71 * (charactersNoSpaces / wordsCount)) + (0.5 * (wordsCount / sentencesCount)) - 21.43;
      ari = Math.max(1, Math.round(ari * 10) / 10);

      // Sentence Variety Distribution
      let shortSentences = 0;
      let mediumSentences = 0;
      let longSentences = 0;

      sentencesMatch.forEach(s => {
        const wCount = (s.trim().match(/\b\w+\b/g) || []).length;
        if (wCount < 10) shortSentences++;
        else if (wCount <= 22) mediumSentences++;
        else longSentences++;
      });

      // Longest Words
      const uniqueWordsArr = Array.from(uniqueWordsSet);
      const longestWords = uniqueWordsArr
        .sort((a, b) => b.length - a.length)
        .slice(0, 6)
        .map(w => ({ word: w, length: w.length, syllables: countWordSyllables(w) }));

      // Sentiment estimation
      const sentiment = estimateSentiment(rawWords);

      return {
        fleschReadingEase: {
          score: fleschScore,
          label: fleschLabel,
          grade: fleschGrade,
          badge: fleschBadge
        },
        fleschKincaidGrade: fkGrade,
        gunningFog: gunningFog,
        colemanLiau: colemanLiau,
        ari: ari,
        words: wordsCount,
        uniqueWords: uniqueWords,
        lexicalDiversity: lexicalDiversity,
        sentences: sentencesCount,
        paragraphs: paragraphsCount,
        characters: characters,
        charactersNoSpaces: charactersNoSpaces,
        syllables: totalSyllables,
        complexWordsCount: complexWordsCount,
        complexWordsPercentage: complexWordsPercentage,
        avgWordLength: avgWordLength,
        avgSentenceLength: avgSentenceLength,
        sentenceDistribution: {
          short: shortSentences,
          medium: mediumSentences,
          long: longSentences
        },
        longestWords: longestWords,
        sentiment: sentiment
      };
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ReadabilityEngine;
} else {
  window.ReadabilityEngine = ReadabilityEngine;
}
