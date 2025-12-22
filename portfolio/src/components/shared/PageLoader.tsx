import { useEffect, useState } from 'react';

export function PageLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger load animation after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background transition-opacity duration-500 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    />
  );
}
