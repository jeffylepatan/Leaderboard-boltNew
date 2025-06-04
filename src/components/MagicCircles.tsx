import React, { useEffect, useState } from 'react';

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

const MagicCircles: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const colors = [
    'rgba(147, 51, 234, 0.15)', // purple
    'rgba(59, 130, 246, 0.15)', // blue
    'rgba(236, 72, 153, 0.15)', // pink
    'rgba(34, 197, 94, 0.15)',  // green
    'rgba(249, 115, 22, 0.15)', // orange
  ];

  useEffect(() => {
    const createCircle = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = 50 + Math.random() * 200;
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: Math.random(),
        x,
        y,
        size,
        color,
        opacity: 0
      };
    };

    const addCircle = () => {
      const newCircle = createCircle(); // Moved outside setState to be in scope for setTimeout
      setCircles(prev => [...prev, newCircle]);

      setTimeout(() => {
        setCircles(prev => prev.filter(circle => circle.id !== newCircle.id));
      }, 3000);
    };

    const interval = setInterval(addCircle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {circles.map(circle => (
        <div
          key={circle.id}
          className="absolute rounded-full magic-circle"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
            border: `2px solid ${circle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default MagicCircles;