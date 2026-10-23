import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";

type Theme = "light" | "dark";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "What I do" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) || "dark",
  );
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section currently on screen.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden />
      <motion.header
        className={`nav ${scrolled ? "is-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container nav__inner">
          <a href="#top" className="brand" aria-label={`${profile.name}, back to top`}>
            <span className="brand__mark">TG</span>
            <span className="brand__text">
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </span>
          </a>

          <nav aria-label="Main" className="nav__links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? "is-active" : ""}>
                {active === l.href && (
                  <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme(next)}
              aria-label={`Switch to ${next} theme`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="icon-btn__inner"
                >
                  {theme === "dark" ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href="#contact" className="btn btn--gradient btn--sm nav__hire">
              Hire me <ArrowUpRight size={16} aria-hidden />
            </a>
            <button
              type="button"
              className="icon-btn nav__burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="icon-btn mobile-menu__close" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} aria-hidden />
            </button>
            <nav aria-label="Mobile">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
