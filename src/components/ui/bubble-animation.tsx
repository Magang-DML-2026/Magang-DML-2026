"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export function BubbleAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate random bubbles only on client side to avoid hydration mismatch
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 60 + 20, // 20px to 80px
        x: Math.random() * 100, // 0% to 100%
        y: Math.random() * 100 + 20, // Start slightly below
        duration: Math.random() * 20 + 15, // 15s to 35s
        delay: Math.random() * -20, // Start at different times
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: "100%",
            background: "radial-gradient(circle at 30% 30%, rgba(240, 92, 53, 0.15), rgba(240, 92, 53, 0.02))",
            border: "1px solid rgba(240, 92, 53, 0.1)",
            backdropFilter: "blur(2px)",
          }}
          animate={{
            y: [0, -1000],
            x: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1, 1.2, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            delay: bubble.delay,
            times: [0, 0.2, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
}
