let activeSpeechTimeout = null;

export const speakItalian = (text) => {
  if (!text) return;
  
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    if (activeSpeechTimeout) {
      clearTimeout(activeSpeechTimeout);
      activeSpeechTimeout = null;
    }

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
    const itVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'it-it') || 
                    voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('it'));

    // Check if it is a list of multiple conjugations
    // We split by period, semicolon or exclamation mark
    const parts = cleaned.split(/[.;!]+/).map(p => p.trim()).filter(Boolean);

    if (parts.length > 1) {
      let index = 0;
      const speakNext = () => {
        if (index < parts.length) {
          const utterance = new SpeechSynthesisUtterance(parts[index]);
          utterance.lang = 'it-IT';
          utterance.rate = 0.8; // Set rate control to 0.8
          if (itVoice) {
            utterance.voice = itVoice;
          }
          utterance.onend = () => {
            activeSpeechTimeout = setTimeout(speakNext, 300); // 300ms pause between conjugations
          };
          utterance.onerror = () => {
            activeSpeechTimeout = null;
          };
          window.speechSynthesis.speak(utterance);
          index++;
        } else {
          activeSpeechTimeout = null;
        }
      };
      speakNext();
    } else {
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = 'it-IT';
      utterance.rate = 0.8; // Set rate control to 0.8
      if (itVoice) {
        utterance.voice = itVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  }
};
