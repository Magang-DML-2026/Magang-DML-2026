"use client";

import { useRef, useEffect, ReactNode } from "react";

export default function HorizontalScrollContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If the user is already scrolling horizontally (e.g., trackpad) or holding Shift, don't intercept
      if (e.deltaX !== 0 || e.shiftKey) return;

      // Calculate edges
      const isAtLeftEdge = container.scrollLeft === 0;
      const isAtRightEdge = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth;

      // If they are scrolling up (deltaY < 0) and at the left edge, let the page scroll vertically
      if (e.deltaY < 0 && isAtLeftEdge) return;
      
      // If they are scrolling down (deltaY > 0) and at the right edge, let the page scroll vertically
      if (e.deltaY > 0 && isAtRightEdge) return;

      // Otherwise, prevent default vertical scroll and translate to horizontal scroll
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    // { passive: false } is required to allow e.preventDefault()
    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
