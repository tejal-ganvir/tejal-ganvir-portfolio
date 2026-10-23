import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";

/* Fades and lifts its children into view once, as they scroll in. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Counts up from 0 to the value when it first scrolls into view. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {shown}
        {suffix}
      </span>
    </span>
  );
}

/* A card that tilts towards the pointer and shows a soft spotlight where the pointer is. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce) {
      ry.set((px - 0.5) * 10);
      rx.set(-(py - 0.5) * 10);
    }
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

/* Pulls its child slightly towards the pointer, like a magnet. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* Section title with a gradient sweep and a short supporting line. */
export function SectionHeading({ title, lead, id }: { title: string; lead?: string; id: string }) {
  return (
    <Reveal className="section-heading">
      <h2 id={id} className="section-title">
        <span className="gradient-text">{title}</span>
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}
