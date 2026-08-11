"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Radius of the area the cursor clears, in pixels. */
const SPOTLIGHT_RADIUS = 280;

/**
 * Photo background for the first viewport of the home page.
 * Sits behind the page content but above the global animated <Background />.
 *
 * The darkening layers are masked out around the cursor, so moving the pointer
 * reveals the photo underneath while the rest of the hero stays dim.
 */
const HeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    // Skip the effect for pointers that cannot hover (touch) and for users who
    // asked for reduced motion — they just get the plain dimmed photo.
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      // Coalesce to one update per frame so fast movement stays cheap.
      if (frameRef.current !== null) return;
      const { clientX, clientY } = event;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({ x: clientX - rect.left, y: clientY - rect.top });
      });
    };

    const handleLeave = () => setSpotlight(null);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Mask alpha drives how much of the dimming survives: near-transparent at the
  // cursor (photo shows through), fully opaque further out (hero stays dark).
  const mask = spotlight
    ? `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotlight.x}px ${spotlight.y}px, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,1) 100%)`
    : undefined;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 top-0 h-screen z-[-1] overflow-hidden"
    >
      <Image
        alt=""
        src="/bg_0183.jpg"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Darkening layers keep the hero text readable and blend into the site background */}
      <div
        className="absolute inset-0"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <div className="absolute inset-0 bg-gray-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/50 to-gray-950" />
      </div>
    </div>
  );
};

export default HeroBackground;
