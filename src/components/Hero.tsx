import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, Download, MessageCircle, Github, Linkedin, Mail, Atom, Zap, Sparkles, Braces } from "lucide-react";
import { profile } from "../data/profile";
import { Magnetic } from "./ui/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const pillColours = ["pill--blue", "pill--violet", "pill--pink", "pill--amber", "pill--green", "pill--cyan"];

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <motion.div className="hero__text" variants={container} initial="hidden" animate="show">
          <motion.p className="status-pill" variants={item}>
            <span className="status-pill__dot" aria-hidden />
            {profile.status}
          </motion.p>

          <motion.p className="hero__hello" variants={item}>
            Hey there! I'm
          </motion.p>

          <h1 id="hero-title" className="hero__name">
            <span className="sr-only">{profile.name}</span>
            <AnimatedWord text={profile.firstName} delay={0.45} />
            <AnimatedWord text={profile.lastName} delay={0.75} gradient />
          </h1>

          <motion.p className="hero__typed" variants={item}>
            <span className="sr-only">{profile.role}</span>
            <span aria-hidden>
              I'm a <Typewriter words={profile.typedRoles} />
            </span>
          </motion.p>

          <motion.p className="hero__intro" variants={item}>
            {profile.intro}
          </motion.p>

          <motion.ul className="hero__pills" variants={container} aria-label="Core technologies">
            {profile.heroTech.map((t, i) => (
              <motion.li
                key={t}
                className={`pill ${pillColours[i % pillColours.length]}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.4, y: 10 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 18 } },
                }}
                whileHover={{ y: -4, scale: 1.06 }}
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="hero__actions" variants={item}>
            <Magnetic>
              <a href="#work" className="btn btn--gradient">
                View my work <ArrowDown size={18} aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resumeFile} download className="btn btn--glass">
                <Download size={18} aria-hidden /> Download CV
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn--ghost">
                Let's talk <MessageCircle size={18} aria-hidden />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero__social" variants={item}>
            <span>Find me on</span>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social">
              <Github size={18} aria-hidden />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social">
              <Linkedin size={18} aria-hidden />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="social">
              <Mail size={18} aria-hidden />
            </a>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="scroll-cue__mouse" aria-hidden>
          <span className="scroll-cue__wheel" />
        </span>
      </motion.a>
    </section>
  );
}

/* Each letter flips up into place. */
function AnimatedWord({ text, delay, gradient = false }: { text: string; delay: number; gradient?: boolean }) {
  return (
    <span className={`hero__word ${gradient ? "gradient-text gradient-text--shine" : ""}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="hero__letter"
          initial={{ opacity: 0, y: "0.6em", rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* Types each phrase, pauses, deletes it, and moves to the next. */
function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index % words.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 300;

    const t = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words, reduce]);

  return (
    <span className="typewriter">
      <span className="gradient-text">{reduce ? words[0] : text}</span>
      <span className="typewriter__caret" />
    </span>
  );
}

const codeLines = [
  [["kw", "const "], ["var", "tejal"], ["p", " = {"]],
  [["key", "  role"], ["p", ": "], ["str", '"Senior Frontend Engineer"'], ["p", ","]],
  [["key", "  stack"], ["p", ": ["], ["str", '"React"'], ["p", ", "], ["str", '"TypeScript"'], ["p", "],"]],
  [["key", "  realTime"], ["p", ": "], ["bool", "true"], ["p", ","]],
  [["key", "  basedIn"], ["p", ": "], ["str", '"Pune, India"'], ["p", ","]],
  [["p", "};"]],
] as const;

/* The right-hand side: glowing photo ring, a code card that types itself, and floating stats. */
function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const near = { x: useTransform(sx, (v) => v * 22), y: useTransform(sy, (v) => v * 22) };
  const far = { x: useTransform(sx, (v) => v * -14), y: useTransform(sy, (v) => v * -14) };
  const [lines, setLines] = useState(reduce ? codeLines.length : 0);

  useEffect(() => {
    if (reduce) return;
    if (lines >= codeLines.length) return;
    const t = window.setTimeout(() => setLines((n) => n + 1), lines === 0 ? 1300 : 380);
    return () => window.clearTimeout(t);
  }, [lines, reduce]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <motion.div
      className="hero__visual"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.div className="orb" style={near}>
        <div className="orb__glow" />
        <div className="orb__ring" />
        <div className="orb__ring orb__ring--dashed" />
        <img src={profile.photo} alt="" className="orb__photo" width={320} height={320} />

        <div className="orbit">
          <span className="orbit__chip orbit__chip--1"><Atom size={20} /></span>
          <span className="orbit__chip orbit__chip--2"><Braces size={18} /></span>
          <span className="orbit__chip orbit__chip--3"><Zap size={18} /></span>
          <span className="orbit__chip orbit__chip--4"><Sparkles size={18} /></span>
        </div>
      </motion.div>

      <motion.div className="code-card-wrap" style={far}>
       <div className="code-card glass">
        <div className="code-card__dots">
          <i /> <i /> <i />
          <span>tejal.ts</span>
        </div>
        <pre>
          {codeLines.slice(0, lines).map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
              {line.map(([cls, txt], j) => (
                <span key={j} className={`c-${cls}`}>
                  {txt}
                </span>
              ))}
              {i === lines - 1 && <span className="code-card__caret" />}
            </motion.div>
          ))}
        </pre>
       </div>
      </motion.div>

      <motion.div className="float-stat-wrap float-stat--years" style={far}>
        <div className="float-stat glass">
          <strong className="gradient-text">9+</strong>
          <span>Years</span>
        </div>
      </motion.div>
      <motion.div className="float-stat-wrap float-stat--speed" style={near}>
        <div className="float-stat glass">
          <strong className="gradient-text">30%</strong>
          <span>Faster dev</span>
        </div>
      </motion.div>
      <motion.div className="float-stat-wrap float-stat--tests" style={far}>
        <div className="float-stat glass">
          <strong className="gradient-text">80%+</strong>
          <span>Test coverage</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
