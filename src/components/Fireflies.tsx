import React, { useEffect, useState } from 'react';

const Fireflies: React.FC = () => {
  const [fireflies, setFireflies] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const createFirefly = () => {
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      const delay = Math.random() * 5;

      return {
        id: Math.random(),
        style: {
          left: `${startX}px`,
          top: `${startY}px`,
          transform: `rotate(${angle}rad)`,
          animationDuration: `${speed}s`,
          animationDelay: `${delay}s`
        }
      };
    };

    const firefliesArray = Array.from({ length: 20 }, createFirefly);
    setFireflies(firefliesArray);

    const interval = setInterval(() => {
      setFireflies(prev => [...prev.slice(-15), createFirefly()]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {fireflies.map(firefly => (
        <div key={firefly.id} className="firefly" style={firefly.style} />
      ))}
    </>
  );
};

export default Fireflies;