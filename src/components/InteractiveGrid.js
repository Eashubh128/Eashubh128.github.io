'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Grid settings
    const CELL_SIZE = 50; 
    const GLOW_COLOR = '168, 85, 247'; // Neon purple RGB
    const DECAY_RATE = 0.015; // How fast the glow fades
    
    // State
    let animationFrameId;
    let width = 0;
    let height = 0;
    const activeCells = new Map(); // key: "x,y", value: opacity (0 to 1)

    // Device detection
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // Snake state for mobile
    let snakeHead = { x: 0, y: 0 };
    let lastSnakeMoveTime = 0;
    const SNAKE_SPEED_MS = 100; // Move every 100ms

    const resize = () => {
      // Use parent container dimensions
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      // High DPI scaling for crisp canvas
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Initialize snake in middle
      if (isMobile && (snakeHead.x === 0 && snakeHead.y === 0)) {
         snakeHead.x = Math.floor((width / CELL_SIZE) / 2);
         snakeHead.y = Math.floor((height / CELL_SIZE) / 2);
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const activateCell = (col, row, opacity = 1.0) => {
      const key = `${col},${row}`;
      activeCells.set(key, opacity);
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const col = Math.floor(x / CELL_SIZE);
      const row = Math.floor(y / CELL_SIZE);
      
      activateCell(col, row);
      // Optionally activate neighbors slightly for a softer brush effect
      activateCell(col + 1, row, 0.4);
      activateCell(col - 1, row, 0.4);
      activateCell(col, row + 1, 0.4);
      activateCell(col, row - 1, 0.4);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateSnake = (timestamp) => {
       if (!isMobile) return;
       
       if (timestamp - lastSnakeMoveTime > SNAKE_SPEED_MS) {
         lastSnakeMoveTime = timestamp;
         
         // Randomly pick a direction: 0: up, 1: right, 2: down, 3: left
         const dir = Math.floor(Math.random() * 4);
         if (dir === 0) snakeHead.y -= 1;
         else if (dir === 1) snakeHead.x += 1;
         else if (dir === 2) snakeHead.y += 1;
         else if (dir === 3) snakeHead.x -= 1;
         
         // Wrap around screen
         const maxCols = Math.ceil(width / CELL_SIZE);
         const maxRows = Math.ceil(height / CELL_SIZE);
         
         if (snakeHead.x < 0) snakeHead.x = maxCols - 1;
         if (snakeHead.x >= maxCols) snakeHead.x = 0;
         if (snakeHead.y < 0) snakeHead.y = maxRows - 1;
         if (snakeHead.y >= maxRows) snakeHead.y = 0;
         
         activateCell(snakeHead.x, snakeHead.y, 1.0);
       }
    };

    const render = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      updateSnake(timestamp);

      // We don't draw the static grid here. 
      // The CSS .grid-bg handles the static faint lines.
      // The canvas only draws the glowing interactive pixels.

      for (const [key, opacity] of activeCells.entries()) {
        const [col, row] = key.split(',').map(Number);
        
        // Draw the glowing cell
        ctx.fillStyle = `rgba(${GLOW_COLOR}, ${opacity * 0.15})`; // Fill with low opacity
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        // Decay opacity
        const newOpacity = opacity - DECAY_RATE;
        if (newOpacity <= 0) {
          activeCells.delete(key);
        } else {
          activeCells.set(key, newOpacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0" 
    />
  );
}
