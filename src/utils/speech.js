let activeSpeechTimeout = null;
let currentOnEnd = null;

export const cancelSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (activeSpeechTimeout) {
    clearTimeout(activeSpeechTimeout);
    activeSpeechTimeout = null;
  }
  if (currentOnEnd) {
    const prevOnEnd = currentOnEnd;
    currentOnEnd = null;
    try { prevOnEnd(); } catch(e) {}
  }
};

export const speakItalian = (text, onEnd) => {
  if (!text) {
    if (onEnd) onEnd();
    return;
  }
  
  cancelSpeech();
  currentOnEnd = onEnd;

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Clean the text for better pronunciation:
    let cleaned = text
      .replace(/-/g, '') // remove dashes (parl-o -> parlo)
      .replace(/\/a\b/g, ' o stata') // sono stato/a -> sono stato o stata
      .replace(/\/e\b/g, ' o state') // sono stati/e -> sono stati o state
      .replace(/\b(o\s+)?-etti\b/g, '') // remove -etti alternatives
      .replace(/\b(o\s+)?-ette\b/g, '')
      .replace(/\b(o\s+)?-ettero\b/g, '')
      .replace(/\b(o\s+)?-etto\b/g, '')
      .replace(/\s*\(.*?\)\s*/g, ' ') // remove parentheses content
      .replace(/\.{3,}/g, ', ') // replace ellipsis with a comma for a brief pause
      .replace(/_{3,}/g, ', ') // replace underscores with a comma for a brief pause
      .trim();

    // Ensure voices are loaded and find the Italian one
    const voices = window.speechSynthesis.getVoices();
    
    // Check if the user selected a voice in localStorage
    const savedVoiceName = typeof localStorage !== 'undefined' ? localStorage.getItem('selectedVoiceName') : null;
    let itVoice = null;
    if (savedVoiceName) {
      itVoice = voices.find(v => v.name === savedVoiceName);
    }
    
    if (!itVoice) {
      // Prioritize high-quality voices (Siri, Google, Alice, Premium, Enhanced)
      const itVoices = voices.filter(v => {
        const lang = v.lang.toLowerCase().replace('_', '-');
        return lang === 'it-it' || lang.startsWith('it-') || lang === 'it';
      });
      itVoice = 
        itVoices.find(v => v.name.toLowerCase().includes('siri')) ||
        itVoices.find(v => v.name.toLowerCase().includes('google')) ||
        itVoices.find(v => v.name.toLowerCase().includes('alice')) ||
        itVoices.find(v => v.name.toLowerCase().includes('premium')) ||
        itVoices.find(v => v.name.toLowerCase().includes('enhanced')) ||
        itVoices[0];
    }

    // Check if it is a list of multiple conjugations
    // We split by semicolon or exclamation mark (commas and periods are kept for natural cadence)
    const parts = cleaned.split(/[;!]+/).map(p => p.trim()).filter(Boolean);

    if (parts.length > 1) {
      let index = 0;
      const speakNext = () => {
        if (index < parts.length) {
          const utterance = new SpeechSynthesisUtterance(parts[index]);
          utterance.lang = 'it-IT';
          utterance.rate = 0.8; // Standardized rate
          if (itVoice) {
            utterance.voice = itVoice;
          }
          utterance.onend = () => {
            activeSpeechTimeout = setTimeout(speakNext, 300); // 300ms pause
          };
          utterance.onerror = () => {
            activeSpeechTimeout = null;
            if (currentOnEnd) {
              const callback = currentOnEnd;
              currentOnEnd = null;
              callback();
            }
          };
          window.speechSynthesis.speak(utterance);
          index++;
        } else {
          activeSpeechTimeout = null;
          if (currentOnEnd) {
            const callback = currentOnEnd;
            currentOnEnd = null;
            callback();
          }
        }
      };
      speakNext();
    } else {
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = 'it-IT';
      utterance.rate = 0.8; // Standardized rate
      if (itVoice) {
        utterance.voice = itVoice;
      }
      utterance.onend = () => {
        if (currentOnEnd) {
          const callback = currentOnEnd;
          currentOnEnd = null;
          callback();
        }
      };
      utterance.onerror = () => {
        if (currentOnEnd) {
          const callback = currentOnEnd;
          currentOnEnd = null;
          callback();
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  } else {
    if (onEnd) onEnd();
  }
};
