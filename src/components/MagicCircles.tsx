import React, { useEffect, useState } from 'react';

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  designType: number;
}

const MagicCircles: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const colors = [
    'rgba(147, 51, 234, 0.3)', // purple
    'rgba(59, 130, 246, 0.3)', // blue
    'rgba(236, 72, 153, 0.3)', // pink
    'rgba(34, 197, 94, 0.3)',  // green
    'rgba(249, 115, 22, 0.3)', // orange
  ];

  useEffect(() => {
    const createCircle = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = 100 + Math.random() * 200;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.random() * 360;
      const designType = Math.floor(Math.random() * 3);

      return {
        id: Math.random(),
        x,
        y,
        size,
        color,
        rotation,
        designType
      };
    };

    const addCircle = () => {
      const newCircle = createCircle();
      setCircles(prev => [...prev, newCircle]);

      setTimeout(() => {
        setCircles(prev => prev.filter(circle => circle.id !== newCircle.id));
      }, 3000);
    };

    const interval = setInterval(addCircle, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {circles.map(circle => (
        <div
          key={circle.id}
          className="absolute magic-circle"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
        >
          {/* Main circle */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${circle.color}`,
              transform: `rotate(${circle.rotation}deg)`,
            }}
          />
          
          {/* Inner design elements */}
          <div
            className="absolute inset-[15%] rounded-full"
            style={{
              border: `1px solid ${circle.color}`,
              transform: `rotate(${-circle.rotation}deg)`,
            }}
          />
          
          {/* Magical runes and symbols */}
          <div
            className="absolute inset-[30%] rounded-full"
            style={{
              border: `1px dashed ${circle.color}`,
              transform: `rotate(${circle.rotation * 2}deg)`,
            }}
          />
          
          {/* Cross lines */}
          {[0, 45, 90, 135].map((angle, idx) => (
            <div
              key={idx}
              className="absolute left-0 top-1/2 w-full h-[1px]"
              style={{
                background: circle.color,
                transform: `rotate(${angle + circle.rotation}deg)`,
              }}
            />
          ))}
          
          {/* Decorative dots */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: circle.color,
                left: '50%',
                top: '50%',
                transform: `
                  rotate(${(idx * 45) + circle.rotation}deg)
                  translateY(-${circle.size / 2}px)
                  translate(-50%, -50%)
                `,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MagicCircles;