import { useEffect, useRef } from "react";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

const techItems = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#60A5FA" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#E5E7EB" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#93C5FD" },
  { name: "Docker", Icon: SiDocker, color: "#7DD3FC" },
];

const RADIUS_X = 390;
const RADIUS_Y = 160;
const SPEED = 0.00016; // radians per ms — one full orbit ≈ 11 minutes

export function TechOrbit() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const animate = (time) => {
      // Performance optimization: skip DOM updates if the component is out of view
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
      }

      const n = techItems.length;

      techItems.forEach((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return;

        const angle = time * SPEED + (i / n) * Math.PI * 2;
        const x = RADIUS_X * Math.cos(angle);
        const y = RADIUS_Y * Math.sin(angle);

        // sin(angle): -1 = top/back, +1 = bottom/front
        // depth 0 = back (far), depth 1 = front (near)
        const depth = (Math.sin(angle) + 1) / 2;
        const scale = 0.78 + depth * 0.28; // 0.78 → 1.06
        const opacity = 0.28 + depth * 0.38; // 0.28 → 0.66

        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        el.style.opacity = String(opacity.toFixed(3));
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {/* Orbit ellipse ring — purely decorative guide line */}
      <div
        className="absolute"
        style={{
          top: "42%",
          left: "50%",
          width: RADIUS_X * 2,
          height: RADIUS_Y * 2,
          marginLeft: -RADIUS_X,
          marginTop: -RADIUS_Y,
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.07)",
        }}
      />

      {/* Orbit items */}
      <div className="absolute" style={{ top: "42%", left: "50%" }}>
        {techItems.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-[6px]"
            style={{
              borderColor: `${item.color}22`,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%)",
              boxShadow: `0 0 14px ${item.color}14, inset 0 1px 0 rgba(255,255,255,0.07)`,
              opacity: 0,
              willChange: "transform, opacity",
              whiteSpace: "nowrap",
            }}
          >
            <item.Icon
              style={{ color: item.color }}
              className="w-3.5 h-3.5 shrink-0"
            />

            <span
              className="text-[11px] font-semibold tracking-wide"
              style={{ color: item.color, opacity: 0.85 }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
