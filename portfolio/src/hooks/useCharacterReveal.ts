import { useEffect, useState } from 'react';

interface UseCharacterRevealOptions {
  text: string;
  delay?: number;
  startDelay?: number;
}

export function useCharacterReveal(options: UseCharacterRevealOptions) {
  const { text, delay = 50, startDelay = 0 } = options;
  const [revealedChars, setRevealedChars] = useState(0);

  useEffect(() => {
    // Start delay before beginning character reveal
    const startTimeout = setTimeout(() => {
      let currentChar = 0;

      const revealInterval = setInterval(() => {
        currentChar++;
        setRevealedChars(currentChar);

        if (currentChar >= text.length) {
          clearInterval(revealInterval);
        }
      }, delay);

      return () => {
        clearInterval(revealInterval);
      };
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, delay, startDelay]);

  const getCharacterClass = (index: number) => {
    if (index < revealedChars) {
      return 'opacity-100 animate-charReveal';
    }
    return 'opacity-0';
  };

  return { revealedChars, getCharacterClass };
}
