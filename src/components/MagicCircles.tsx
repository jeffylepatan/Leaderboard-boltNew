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
    'rgba(147, 51, 234, 0.4)', // purple
    'rgba(59, 130, 246, 0.4)', // blue
    'rgba(236, 72, 153, 0.4)', // pink
    'rgba(34, 197, 94, 0.4)',  // green
    'rgba(249, 115, 22, 0.4)', // orange
  ];

  useEffect(() => {
    const createCircle = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = 150 + Math.random() * 250; // Increased size
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

    const interval = setInterval(addCircle, 4000); // Increased interval
    addCircle(); // Initial circle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
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
          {/* Outer circle with magical symbols */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${circle.color}`,
              transform: `rotate(${circle.rotation}deg)`,
            }}
          />
          
          {/* Secondary circle */}
          <div
            className="absolute inset-[10%] rounded-full"
            style={{
              border: `1px solid ${circle.color}`,
              transform: `rotate(${-circle.rotation * 0.5}deg)`,
            }}
          />
          
          {/* Inner circle with runes */}
          <div
            className="absolute inset-[20%] rounded-full"
            style={{
              border: `1px dashed ${circle.color}`,
              transform: `rotate(${circle.rotation * 0.8}deg)`,
            }}
          />
          
          {/* Magical inscriptions */}
          <div
            className="absolute inset-[30%] rounded-full"
            style={{
              border: `1px dotted ${circle.color}`,
              transform: `rotate(${-circle.rotation * 1.2}deg)`,
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
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: circle.color,
                left: '50%',
                top: '50%',
                transform: `
                  rotate(${(idx * 30) + circle.rotation}deg)
                  translateY(-${circle.size / 2}px)
                  translate(-50%, -50%)
                `,
              }}
            />
          ))}
          
          {/* Additional magical elements based on designType */}
          {circle.designType === 0 && (
            <div
              className="absolute inset-[40%] rounded-full"
              style={{
                border: `1px solid ${circle.color}`,
                transform: `rotate(${circle.rotation * 1.5}deg)`,
              }}
            />
          )}
          
          {circle.designType === 1 && (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`triangle-${idx}`}
                className="absolute left-1/2 top-1/2 w-1 h-[40%] origin-bottom"
                style={{
                  background: circle.color,
                  transform: `rotate(${(idx * 60) + circle.rotation}deg)`,
                }}
              />
            ))
          )}
          
          {circle.designType === 2 && (
            <div
              className="absolute inset-[25%] rounded-none"
              style={{
                border: `1px solid ${circle.color}`,
                transform: `rotate(${circle.rotation * 0.7}deg)`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MagicCircles;