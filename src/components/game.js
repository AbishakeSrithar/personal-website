'use client';

import { useEffect, useRef } from 'react';

export default function ResponsivePacmanGame() {
  const canvasRef = useRef(null);
  const position = useRef({ x: 50, y: 50 });

  // Resize canvas to fill viewport
  const resizeCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw the green square at current position
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'lime';
      ctx.fillRect(position.current.x, position.current.y, 30, 30);
    };

    // Handle WASD keypresses to move the square
    const handleKeyDown = (e) => {
      const step = 15;
      let moved = false;

      if (e.key === 'd' || e.key === 'ArrowRight') {
        position.current.x += step;
        moved = true;
      }
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        position.current.x -= step;
        moved = true;
      }
      if (e.key === 'w' || e.key === 'ArrowUp') {
        position.current.y -= step;
        moved = true;
      }
      if (e.key === 's' || e.key === 'ArrowDown') {
        position.current.y += step;
        moved = true;
      }

      if (moved) {
        // Keep position inside canvas bounds
        position.current.x = Math.max(0, Math.min(position.current.x, canvas.width - 30));
        position.current.y = Math.max(0, Math.min(position.current.y, canvas.height - 30));

        draw();
      }
    };

    // Initial resize and draw
    resizeCanvas(canvas);
    draw();

    // Add event listeners
    window.addEventListener('resize', () => {
      resizeCanvas(canvas);
      draw();
    });
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', () => {
        resizeCanvas(canvas);
        draw();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ display: 'block', zIndex: -10 }}
    />
  );
}
