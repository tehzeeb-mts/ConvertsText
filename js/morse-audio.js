/**
 * Morse Code Audio Player using Web Audio API
 */
const MorseAudio = (() => {
  let audioCtx = null;
  let isPlaying = false;
  let stopRequested = false;
  let currentOscillator = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, durationMs) {
    return new Promise(resolve => {
      if (stopRequested) {
        resolve();
        return;
      }
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        currentOscillator = osc;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Smooth attack and release to avoid audio clicks
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.008);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + (durationMs / 1000) - 0.008);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (durationMs / 1000));

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
          currentOscillator = null;
          resolve();
        }, durationMs);
      } catch (e) {
        resolve();
      }
    });
  }

  function wait(ms) {
    return new Promise(resolve => {
      if (stopRequested) {
        resolve();
        return;
      }
      setTimeout(resolve, ms);
    });
  }

  return {
    async play(morseString, options = {}) {
      if (isPlaying) {
        this.stop();
        await wait(100);
      }

      const wpm = options.wpm || 20;
      const freq = options.frequency || 650;
      const dotTime = 1200 / wpm; // Standard PARIS formula
      const dashTime = dotTime * 3;
      const symbolGap = dotTime;
      const letterGap = dotTime * 3;
      const wordGap = dotTime * 7;

      isPlaying = true;
      stopRequested = false;

      if (options.onStart) options.onStart();

      const symbols = morseString.trim().split('');
      for (let i = 0; i < symbols.length; i++) {
        if (stopRequested) break;
        const s = symbols[i];

        if (s === '.') {
          await playTone(freq, dotTime);
          await wait(symbolGap);
        } else if (s === '-') {
          await playTone(freq, dashTime);
          await wait(symbolGap);
        } else if (s === ' ') {
          await wait(letterGap - symbolGap);
        } else if (s === '/' || s === '\n') {
          await wait(wordGap - symbolGap);
        }
      }

      isPlaying = false;
      stopRequested = false;
      if (options.onEnd) options.onEnd();
    },

    stop() {
      stopRequested = true;
      isPlaying = false;
      if (currentOscillator) {
        try {
          currentOscillator.stop();
          currentOscillator.disconnect();
        } catch (e) {}
        currentOscillator = null;
      }
    },

    isPlaying() {
      return isPlaying;
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MorseAudio;
} else {
  window.MorseAudio = MorseAudio;
}
