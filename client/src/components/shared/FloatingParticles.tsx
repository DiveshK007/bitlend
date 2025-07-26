import React from 'react';

export function FloatingParticles() {
  return (
    <div className="floating-particles">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}

export function GeometricShapes() {
  return (
    <div className="geometric-shapes">
      <div className="shape shape-1" />
      <div className="shape shape-2" />
      <div className="shape shape-3" />
    </div>
  );
}