export const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
    .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
    .trim();
};

// Helper for Levenshtein distance
const levenshtein = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

export const isMatch = (spoken, target) => {
  const normSpoken = normalizeText(spoken);
  const normTarget = normalizeText(target);
  
  if (!normSpoken || !normTarget) return false;
  
  // Exact match after normalization
  if (normSpoken === normTarget) return true;

  // Use Levenshtein distance for fuzzy matching
  const distance = levenshtein(normSpoken, normTarget);
  
  // Allow a 15% error margin (to account for minor speech recognition errors)
  const threshold = Math.max(2, Math.floor(normTarget.length * 0.15));
  
  return distance <= threshold;
};
