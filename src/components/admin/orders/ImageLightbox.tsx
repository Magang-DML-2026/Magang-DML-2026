"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  label?: string; // e.g. "ORD-7721-B2C — John Doe"
  isOpen: boolean;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.5;

export function ImageLightbox({ src, alt, label, isOpen, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dragStart = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setLoaded(false);
    }
  }, [isOpen]);

  // Keyboard listeners
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleReset();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleZoomIn = useCallback(() => {
    setScale((s) => Math.min(s + ZOOM_STEP, MAX_SCALE));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - ZOOM_STEP, MIN_SCALE);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Wheel zoom
  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setScale((s) => {
      const next = Math.min(Math.max(s + delta, MIN_SCALE), MAX_SCALE);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  }

  // Mouse drag to pan
  function handleMouseDown(e: React.MouseEvent) {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, px: position.x, py: position.y };
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
  }

  function handleMouseUp() {
    setIsDragging(false);
    dragStart.current = null;
  }

  // Double-click to zoom in/reset
  function handleDoubleClick() {
    if (scale > 1) {
      handleReset();
    } else {
      setScale(2.5);
    }
  }

  // Download
  function handleDownload() {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt.replace(/\s+/g, "_") + ".jpg";
    link.target = "_blank";
    link.click();
  }

  if (!isOpen) return null;

  const scalePercent = Math.round(scale * 100);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top Bar */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3 bg-black/60 border-b border-white/10">
        {/* File label */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded bg-zinc-800 flex items-center justify-center shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 10h6M9 14h4"/></svg>
          </div>
          <span className="text-zinc-300 text-xs font-medium truncate">{label ?? alt}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Zoom % badge */}
          <span className="text-zinc-500 text-xs font-mono w-12 text-center tabular-nums">{scalePercent}%</span>

          <button
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            title="Zoom Out (-)"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            disabled={scale >= MAX_SCALE}
            title="Zoom In (+)"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            disabled={scale === 1 && position.x === 0 && position.y === 0}
            title="Reset (0)"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <button
            onClick={handleDownload}
            title="Download"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden flex items-center justify-center relative"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
      >
        {/* Loading shimmer */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
          </div>
        )}

        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onDoubleClick={handleDoubleClick}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            opacity: loaded ? 1 : 0,
            willChange: "transform",
            transitionProperty: isDragging ? "none" : "transform, opacity",
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Hint Bar */}
      <div className="shrink-0 flex items-center justify-center gap-6 py-2.5 bg-black/60 border-t border-white/10">
        <span className="text-zinc-600 text-[11px]">Scroll to zoom</span>
        <span className="text-zinc-700">•</span>
        <span className="text-zinc-600 text-[11px]">Double-click to zoom in / reset</span>
        <span className="text-zinc-700">•</span>
        <span className="text-zinc-600 text-[11px]">Drag to pan when zoomed</span>
        <span className="text-zinc-700">•</span>
        <span className="text-zinc-600 text-[11px]">Esc to close</span>
      </div>
    </div>
  );
}
