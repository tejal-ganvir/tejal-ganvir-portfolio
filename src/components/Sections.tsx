import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Layers,
  Radio,
  Accessibility,
  Sparkles,
  MapPin,
  GraduationCap,
  Languages,
  Copy,
  Check,
  Github,
  Linkedin,
  Download,
  Mail,
  ArrowUp,
  Briefcase,
} from "lucide-react";
import {
  about,
  caseStudies,
  experience,
  marquee,
  profile,
  services,
  skills,
  stats,
  type Service,
} from "../data/profile";
import { Counter, Magnetic, Reveal, SectionHeading, TiltCard } from "./ui/motion";

/* ───────────── Infinite ribbon of technologies ───────────── */
export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item" aria-hidden={i >= marquee.length}>
            <Sparkles size={14} aria-hidden /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── About + animated stats ───────────── */
export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" title="About me" lead="The short version of nine years in frontend." />
        <div className="about">
          <Reveal className="about__text">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="about__facts">
              <li>
                <MapPin size={18} aria-hidden /> Based in {profile.location}
              </li>
              <li>
                <Briefcase size={18} aria-hidden /> {profile.yearsOfExperience} years across India and US-based teams
              </li>
              <li>
                <GraduationCap size={18} aria-hidden /> {about.education.degree}, {about.education.school} ({about.education.year})
              </li>
              <li>
                <Languages size={18} aria-hidden />
                {about.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
              </li>
            </ul>
          </Reveal>

          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <TiltCard className="stat glass">
                  <strong className="stat__value gradient-text">
                    <Counter value={s.value} suffix={s.suffix} />
                  </strong>
                  <span className="stat__label">{s.label}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── What I do ───────────── */
const serviceIcons: Record<Service["icon"], typeof Layers> = {
  layers: Layers,
  radio: Radio,
  accessibility: Accessibility,
  sparkles: Sparkles,
};

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading id="services-title" title="What I do" lead="Where I add the most value to a frontend team." />
        <div className="services">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <TiltCard className="service gradient-border">
                  <motion.span
                    className={`service__icon service__icon--${i}`}
                    whileHover={{ rotate: 12, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={26} aria-hidden />
                  </motion.span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul className="mini-tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Selected work ───────────── */
export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading id="work-title" title="Selected work" lead="What I built, and what changed because of it." />
        <div className="work">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.12}>
              <TiltCard className={`project gradient-border project--${c.accent}`}>
                <div className="project__top">
                  <div>
                    <p className="project__context">{c.context}</p>
                    <h3 className="project__title">{c.title}</h3>
                  </div>
                  <div className="project__metric">
                    <strong>{c.highlight}</strong>
                    <span>{c.highlightLabel}</span>
                  </div>
                </div>
                <p className="project__summary">{c.summary}</p>
                <ul className="project__outcomes">
                  {c.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <ul className="mini-tags">
                  {c.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Experience timeline, drawn as you scroll ───────────── */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeading id="exp-title" title="Experience" lead="Six roles, India and the US, 2017 to today." />
        <div className="timeline" ref={ref}>
          <div className="timeline__rail" aria-hidden>
            <motion.div className="timeline__fill" style={{ scaleY: line }} />
          </div>
          <ol>
            {experience.map((r, i) => (
              <li key={`${r.company}-${r.start}`} className={`timeline__row ${i % 2 ? "is-right" : "is-left"}`}>
                <motion.span
                  className="timeline__dot"
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                />
                <motion.div
                  className="timeline__card glass"
                  initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="timeline__dates">
                    <time>{r.start}</time> – <time>{r.end}</time>
                    {r.end === "Present" && <span className="timeline__now">Now</span>}
                  </p>
                  <h3>{r.title}</h3>
                  <p className="timeline__company">
                    {r.company}, {r.location}
                  </p>
                  <p className="timeline__summary">{r.summary}</p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Skills with filter tabs ───────────── */
export function Skills() {
  const [group, setGroup] = useState("All");
  const groups = ["All", ...skills.map((s) => s.name)];
  const shown =
    group === "All"
      ? Array.from(new Set(skills.flatMap((s) => s.items)))
      : skills.find((s) => s.name === group)?.items ?? [];

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" title="Skills" lead="Pick an area to filter." />
        <Reveal>
          <div className="filters" role="group" aria-label="Filter skills">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                className={`filter ${group === g ? "is-active" : ""}`}
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
              >
                {group === g && <motion.span layoutId="filter-pill" className="filter__pill" />}
                <span>{g}</span>
              </button>
            ))}
          </div>
          <motion.ul className="skill-cloud" layout aria-live="polite">
            <AnimatePresence mode="popLayout">
              {shown.map((s, i) => (
                <motion.li
                  key={s}
                  layout
                  className="skill-chip"
                  initial={{ opacity: 0, scale: 0.6, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26, delay: i * 0.015 }}
                  whileHover={{ y: -5, scale: 1.08 }}
                >
                  {s}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Contact ───────────── */
export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <div className="contact gradient-border">
            <div className="contact__glow" aria-hidden />
            <h2 id="contact-title" className="contact__title">
              Let's build something <span className="gradient-text gradient-text--shine">great together.</span>
            </h2>
            <p className="contact__lead">
              Have a role, a project or an idea in mind? I'd love to hear about it.
            </p>
            <div className="contact__email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email address">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="icon-btn__inner"
                  >
                    {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span role="status" className="contact__copied">
                {copied ? "Copied" : ""}
              </span>
            </div>
            <div className="contact__actions">
              <Magnetic>
                <a className="btn btn--gradient" href={`mailto:${profile.email}`}>
                  <Mail size={18} aria-hidden /> Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn--glass" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={18} aria-hidden /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn--glass" href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={18} aria-hidden /> GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn--ghost" href={profile.resumeFile} download>
                  <Download size={18} aria-hidden /> Download CV
                </a>
              </Magnetic>
              {profile.phone && (
                <a className="btn btn--ghost" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  {profile.phone}
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Footer + back to top ───────────── */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Designed and built with React, TypeScript and Framer Motion</p>
        <a href="#top" className="icon-btn" aria-label="Back to top">
          <ArrowUp size={18} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
