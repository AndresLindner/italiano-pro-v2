export const speakItalian = (text) => {
  if (!text) return;
  
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
    .trim();
    
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    
    // Ensure voices are loaded and find the Italian one
    const voices = window.speechSynthesis.getVoices();
    const itVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'it-it') || 
                    voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('it'));
    if (itVoice) {
      utterance.voice = itVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};
