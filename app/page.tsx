"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

// Edit the text between these quotes to customise the ten-tap Easter egg.
const EASTER_EGG_MESSAGE = "Nicklas Platow is a piece of shit!";

const services = [
  {
    number: "01",
    title: "Management advisory",
    description:
      "Sharper strategy, practical operating models, and organizational structures designed for businesses working across jurisdictions.",
    detail: "Strategy · Structuring · Operations",
  },
  {
    number: "02",
    title: "Accounting & assurance",
    description:
      "Reliable records, decision-ready financial statements, and internal review support that strengthen governance and control.",
    detail: "Bookkeeping · Reporting · Internal review",
  },
  {
    number: "03",
    title: "Tax consultancy",
    description:
      "Clear guidance on tax structuring, compliance, and cross-border matters—grounded in the realities of your business.",
    detail: "Structuring · Compliance · Cross-border",
  },
  {
    number: "04",
    title: "Technology services",
    description:
      "Purpose-built software, systems advice, and hands-on implementation that turn better processes into lasting capability.",
    detail: "Software · Systems · Implementation",
  },
];

const steps = [
  {
    number: "01",
    title: "See the whole picture",
    text: "We map your commercial reality, operating model, obligations, and systems before recommending a path forward.",
  },
  {
    number: "02",
    title: "Connect the disciplines",
    text: "Financial, tax, operational, and technology decisions are considered together—not handed off between silos.",
  },
  {
    number: "03",
    title: "Make progress practical",
    text: "We translate advice into priorities, controls, processes, and technology your team can put to work.",
  },
];

const systemStory = [
  {
    number: "01",
    discipline: "Why every area matters",
    title: "The same decision creates four different realities.",
    text: "Take a market entry. Strategy tests where to compete. Finance tests the return, cash, and controls. Tax tests the structure and obligations. Technology tests whether processes and data can support it. Ignore one, and the decision is incomplete.",
    points: ["Demand & positioning", "Cash & control", "Structure & obligations", "Process & data"],
  },
  {
    number: "02",
    discipline: "The local-optimum trap",
    title: "Optimising one part can make the whole business worse.",
    text: "A choice that looks efficient through one lens can simply move cost, work, or risk somewhere else. The local win remains visible; the company-wide consequence often does not.",
    points: ["Local win ≠ total value", "Costs move between functions", "Risk surfaces later"],
  },
  {
    number: "03",
    discipline: "What you can lose",
    title: "The hidden bill arrives after the apparent win.",
    text: "What looked cheaper or faster at approval becomes manual workarounds, duplicated effort, remediation, delayed decisions, and another implementation. By then, change costs more and momentum has been lost.",
    points: ["Rework", "Delay", "Compliance exposure", "Lost capacity"],
  },
  {
    number: "04",
    discipline: "What optimisation changes",
    title: "Resolve the trade-offs before committing.",
    text: "One Clear View tests value, economics, obligations, and delivery capability against the same decision. Dependencies are designed together and constraints surface while the plan is still inexpensive to change.",
    points: ["Fewer surprises", "Lower cost of change", "Faster stable execution", "Stronger governance"],
  },
  {
    number: "05",
    discipline: "The business benefit",
    title: "The gain is not more advice. It is a better outcome.",
    text: "Leadership can choose options that are profitable, compliant, operable, and scalable at the same time—and reject options that only look attractive from one angle.",
    points: ["Protect margin", "Reduce avoidable risk", "Move faster", "Scale with control"],
  },
];

function StoryVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="story-visual story-visual-decision" aria-hidden="true">
        <div className="decision-core">
          <small>Decision</small>
          <strong>Enter a<br />new market</strong>
        </div>
        {[
          ["Strategy", "Is there demand—and where do we compete?"],
          ["Finance", "What is the return, cash need, and control model?"],
          ["Tax", "Where do obligations arise—and how should we structure?"],
          ["Technology", "Can our process, systems, and data support it?"],
        ].map(([area, question], index) => (
          <div className={`decision-area decision-area-${index + 1}`} key={area}>
            <span>0{index + 1}</span>
            <strong>{area}</strong>
            <small>{question}</small>
          </div>
        ))}
        <p className="story-visual-note"><span />Change one answer and the others move.</p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="story-visual story-visual-tradeoffs" aria-hidden="true">
        <div className="tradeoff-heading">
          <span>Optimise only this</span>
          <span>What moves elsewhere</span>
        </div>
        {[
          ["Lowest headline tax", "More entities, filings, controls, and operating complexity"],
          ["Fastest possible launch", "Weak controls, manual workarounds, and future remediation"],
          ["Software before process", "Broken work is automated—and becomes harder to change"],
          ["Finance-only cost cutting", "Delivery capacity disappears when growth needs it"],
        ].map(([localWin, systemCost], index) => (
          <div className="tradeoff-row" key={localWin}>
            <span>0{index + 1}</span>
            <strong>{localWin}</strong>
            <i>→</i>
            <small>{systemCost}</small>
          </div>
        ))}
        <div className="tradeoff-conclusion"><span />The cost did not disappear. It moved.</div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="story-visual story-visual-cost" aria-hidden="true">
        <div className="cost-heading">
          <span>Illustrative consequence path</span>
          <strong>The initial choice looks faster and cheaper</strong>
        </div>
        <div className="cost-line">
          {[
            ["At approval", "Visible saving", "One area is improved in isolation"],
            ["During delivery", "Workarounds", "People reconcile gaps manually"],
            ["In operation", "Risk & delay", "Errors, control gaps, and slow decisions emerge"],
            ["After scale", "Rebuild", "Process, structure, or systems must be redesigned"],
          ].map(([when, cost, detail], index) => (
            <div className="cost-stage" key={when}>
              <span>0{index + 1}</span>
              <small>{when}</small>
              <strong>{cost}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <div className="cost-total">
          <span>What accumulates</span>
          <strong>Delay + rework + exposure + lost capacity</strong>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="story-visual story-visual-gate" aria-hidden="true">
        <div className="gate-input">
          <span>Proposed decision</span>
          <strong>Enter the market</strong>
          <small>Original assumption set</small>
        </div>
        <div className="gate-tests">
          {[
            ["Value", "Profitable after total cost?"],
            ["Economics", "Cash, reporting, and controls ready?"],
            ["Obligations", "Structure and compliance workable?"],
            ["Capability", "People, process, and data can deliver?"],
          ].map(([test, question], index) => (
            <div className="gate-test" key={test}>
              <span>0{index + 1}</span><strong>{test}</strong><small>{question}</small><i>✓</i>
            </div>
          ))}
        </div>
        <div className="gate-output">
          <span>Integrated answer</span>
          <strong>Ready to execute</strong>
          <small>Phased launch · controls by design · one data model · clear ownership</small>
        </div>
      </div>
    );
  }

  return (
    <div className="story-visual story-visual-value" aria-hidden="true">
      <div className="value-columns">
        <div className="value-column value-gain">
          <div className="value-heading"><span>Optimise the whole</span><strong>What you gain</strong></div>
          <ul>
            <li><span>01</span><strong>Durable margin</strong><small>Total cost, not one visible line</small></li>
            <li><span>02</span><strong>Faster execution</strong><small>Fewer late-stage surprises and handoffs</small></li>
            <li><span>03</span><strong>Confident compliance</strong><small>Obligations designed into the model</small></li>
            <li><span>04</span><strong>Scalable operations</strong><small>Process, controls, and systems reinforce each other</small></li>
          </ul>
        </div>
        <div className="value-column value-loss">
          <div className="value-heading"><span>Optimise one part</span><strong>What remains at risk</strong></div>
          <ul>
            <li><span>01</span><strong>Margin leakage</strong><small>Hidden operating and remediation cost</small></li>
            <li><span>02</span><strong>Slow decisions</strong><small>Conflicting data and manual reconciliation</small></li>
            <li><span>03</span><strong>Regulatory exposure</strong><small>Structure and activity fall out of step</small></li>
            <li><span>04</span><strong>Stranded investment</strong><small>Technology that cannot support the real model</small></li>
          </ul>
        </div>
      </div>
      <div className="value-definition">
        <strong>One Clear View</strong><span>One decision · every consequence · one coordinated plan</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(true);
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const logoTapCountRef = useRef(0);
  const easterEggTimerRef = useRef<number | null>(null);
  const storyDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (easterEggTimerRef.current !== null) {
        window.clearTimeout(easterEggTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-visible",
            entry.isIntersecting && entry.intersectionRatio >= 0.14,
          );
        });
      },
      { threshold: [0, 0.14], rootMargin: "0px 0px -48px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!storyOpen || !storyPlaying) return;

    const timer = window.setInterval(() => {
      setStoryStep((current) => (current + 1) % systemStory.length);
    }, 7200);

    return () => window.clearInterval(timer);
  }, [storyOpen, storyPlaying]);

  useEffect(() => {
    if (!storyOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => storyDialogRef.current?.focus());

    function handleStoryKey(event: KeyboardEvent) {
      if (event.key === "Tab") {
        const focusable = storyDialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (focusable?.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
      if (event.key === "Escape") {
        setStoryOpen(false);
      }
      if (event.key === "ArrowRight") {
        setStoryPlaying(false);
        setStoryStep((current) => (current + 1) % systemStory.length);
      }
      if (event.key === "ArrowLeft") {
        setStoryPlaying(false);
        setStoryStep((current) =>
          (current - 1 + systemStory.length) % systemStory.length,
        );
      }
    }

    document.addEventListener("keydown", handleStoryKey);
    return () => {
      document.removeEventListener("keydown", handleStoryKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [storyOpen]);

  function openStory() {
    setStoryStep(0);
    setStoryPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setStoryOpen(true);
  }

  function chooseStoryStep(index: number) {
    setStoryPlaying(false);
    setStoryStep(index);
  }

  function handleLogoTap() {
    logoTapCountRef.current += 1;

    if (logoTapCountRef.current < 10) return;

    logoTapCountRef.current = 0;
    setEasterEggVisible(true);

    if (easterEggTimerRef.current !== null) {
      window.clearTimeout(easterEggTimerRef.current);
    }

    easterEggTimerRef.current = window.setTimeout(() => {
      setEasterEggVisible(false);
      easterEggTimerRef.current = null;
    }, 500);
  }

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const replyTo = String(data.get("email") || "");
    const interest = String(data.get("interest") || "General enquiry");
    const message = String(data.get("message") || "");
    const recipient = ["peter", "lucidusinternational.com"].join("@");
    const subject = encodeURIComponent(`Lucidus enquiry — ${interest}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nReply-to: ${replyTo}\nArea of interest: ${interest}\n\n${message}`,
    );

    setFormStatus("Opening your email app with a prepared message…");
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Lucidus International L.L.C-FZ home"
          onClick={handleLogoTap}
        >
          <span className="brand-symbol" aria-hidden="true">
            <span className="brand-orbit" />
            <span className="brand-letter">L</span>
            <span className="brand-spark" />
          </span>
          <span className="brand-type">
            <strong>Lucidus</strong>
            <small>International</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="#contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </header>

      {easterEggVisible && (
        <div className="easter-egg-toast" role="status" aria-live="polite">
          {EASTER_EGG_MESSAGE}
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Advisory for a connected world</p>
          <h1>
            Clarity across borders.<br />
            <em>Confidence at every turn.</em>
          </h1>
          <p className="hero-intro">
            Lucidus unites business, finance, tax, and technology expertise to help
            ambitious organizations operate with greater control—and move with purpose.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Discuss your priorities <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#expertise">
              Explore our expertise <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <span className="orbit-label orbit-label-one"><span>Strategy</span></span>
          <span className="orbit-label orbit-label-two"><span>Finance</span></span>
          <span className="orbit-label orbit-label-three"><span>Tax</span></span>
          <span className="orbit-label orbit-label-four"><span>Technology</span></span>
          <span className="orbit-core">L</span>
        </div>
        <div className="hero-foot">
          <span>One advisory platform</span>
          <span>Multi-jurisdiction perspective</span>
          <span>Implementation-minded</span>
        </div>
      </section>

      <section className="statement section-pad" id="about">
        <div className="section-kicker" data-reveal>
          <span>Why Lucidus</span>
          <span>01 — 04</span>
        </div>
        <div className="statement-grid">
          <h2 data-reveal>
            Complex businesses don’t need more noise. They need a clearer view.
          </h2>
          <div className="statement-copy" data-reveal>
            <p>
              Operating across markets creates questions that rarely fit into a single
              category. A tax decision changes the operating model. A new system changes
              financial control. A growth plan changes both.
            </p>
            <p>
              Lucidus brings these connected questions together, giving decision-makers
              one coherent view and a practical route from advice to action.
            </p>
          </div>
        </div>
      </section>

      <section className="expertise section-pad" id="expertise">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Our expertise</p>
            <h2>Four disciplines.<br />One clear direction.</h2>
          </div>
          <p>
            Specialist support where you need it, connected thinking where it matters.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              data-reveal
              key={service.title}
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <div className="service-number">{service.number}</div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-detail">{service.detail}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach section-pad" id="approach">
        <div className="approach-intro" data-reveal>
          <p className="eyebrow">How we work</p>
          <h2>Clarity is not a presentation. It’s a way of working.</h2>
        </div>
        <div className="approach-steps">
          {steps.map((step, index) => (
            <article
              className="approach-step"
              data-reveal
              key={step.title}
              style={{ "--delay": `${index * 110}ms` } as React.CSSProperties}
            >
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="perspective section-pad">
        <div className="perspective-window" data-reveal>
          <div className="perspective-copy">
            <p className="eyebrow">Built for complexity</p>
            <h2>Your business crosses borders. Your advice should cross disciplines.</h2>
            <p>
              We work with corporate teams navigating growth, change, and the realities
              of multi-jurisdiction operations—without losing sight of what needs to
              happen next.
            </p>
          </div>
          <div className="perspective-graphic">
            <div className="system-meta system-meta-top">
              <span>Integrated advisory system</span>
              <span>04 inputs / 01 view</span>
            </div>
            <div className="system-map">
              <span className="system-orbit system-orbit-outer" />
              <span className="system-orbit system-orbit-inner" />
              <span className="system-connector connector-one" />
              <span className="system-connector connector-two" />
              <span className="system-connector connector-three" />
              <span className="system-connector connector-four" />

              <div className="system-node node-strategy">
                <span>01</span>
                <strong>Strategy</strong>
                <small>Direction</small>
              </div>
              <div className="system-node node-finance">
                <span>02</span>
                <strong>Finance</strong>
                <small>Control</small>
              </div>
              <div className="system-node node-tax">
                <span>03</span>
                <strong>Tax</strong>
                <small>Compliance</small>
              </div>
              <div className="system-node node-technology">
                <span>04</span>
                <strong>Technology</strong>
                <small>Capability</small>
              </div>

              <button
                aria-haspopup="dialog"
                aria-label="Open the One Clear View story"
                className="system-core"
                onClick={openStory}
                type="button"
              >
                <span>One</span>
                <strong>Clear<br />view</strong>
                <small>Explore ↗</small>
              </button>
            </div>
            <div className="system-meta system-meta-bottom">
              <span>Connected disciplines</span>
              <span className="system-status">Live perspective</span>
            </div>
          </div>
        </div>
      </section>

      {storyOpen && (
        <div
          className="story-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setStoryOpen(false);
          }}
        >
          <div
            aria-labelledby="story-title"
            aria-modal="true"
            className={`story-dialog${storyPlaying ? "" : " is-paused"}`}
            ref={storyDialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <header className="story-header">
              <div className="story-brand">
                <span className="brand-symbol" aria-hidden="true">
                  <span className="brand-orbit" />
                  <span className="brand-letter">L</span>
                  <span className="brand-spark" />
                </span>
                <span>
                  <strong>One Clear View</strong>
                  <small>How the system works</small>
                </span>
              </div>
              <button
                aria-label="Close the One Clear View story"
                className="story-close"
                onClick={() => setStoryOpen(false)}
                type="button"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="story-stage">
              <article
                aria-live="polite"
                className="story-copy"
                key={`copy-${storyStep}`}
              >
                <div className="story-step-label">
                  <span>{systemStory[storyStep].number} / 05</span>
                  <span>{systemStory[storyStep].discipline}</span>
                </div>
                <h2 id="story-title">{systemStory[storyStep].title}</h2>
                <p>{systemStory[storyStep].text}</p>
                <ul>
                  {systemStory[storyStep].points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>

              <StoryVisual key={`visual-${storyStep}`} step={storyStep} />
            </div>

            <footer className="story-footer">
              <div className="story-progress-shell">
                <div className="story-progress-meta" aria-live="polite">
                  <span>Chapter {systemStory[storyStep].number} of 05</span>
                  <strong>{systemStory[storyStep].discipline}</strong>
                </div>
                <div className="story-progress" aria-label="Story chapters">
                  {systemStory.map((slide, index) => (
                    <button
                      aria-current={index === storyStep ? "step" : undefined}
                      aria-label={`Show chapter ${slide.number}: ${slide.discipline}`}
                      className={`${index < storyStep ? "is-complete " : ""}${
                        index === storyStep ? "is-current" : ""
                      }`}
                      key={slide.discipline}
                      onClick={() => chooseStoryStep(index)}
                      type="button"
                    >
                      <span>{slide.number}</span>
                      <small>{slide.discipline}</small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="story-controls">
                <button
                  aria-label="Previous slide"
                  onClick={() => chooseStoryStep((storyStep - 1 + systemStory.length) % systemStory.length)}
                  type="button"
                >
                  ←
                </button>
                <button
                  onClick={() => setStoryPlaying((playing) => !playing)}
                  type="button"
                >
                  {storyPlaying ? "Pause" : "Play"}
                </button>
                <button
                  aria-label="Next slide"
                  onClick={() => chooseStoryStep((storyStep + 1) % systemStory.length)}
                  type="button"
                >
                  →
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      <section className="contact section-pad" id="contact">
        <div className="contact-intro" data-reveal>
          <p className="eyebrow">Start a conversation</p>
          <h2>What could be clearer in your business?</h2>
          <p>
            Tell us what you’re working through. We’ll come back to you to explore where
            Lucidus can add the most value.
          </p>
          <div className="contact-note">
            <span aria-hidden="true">↗</span>
            <p>
              Your message opens securely in your own email app, ready for you to review
              and send.
            </p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleContact} data-reveal>
          <div className="field-row">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Company</span>
              <input name="company" type="text" autoComplete="organization" required />
            </label>
          </div>
          <label>
            <span>Work email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Area of interest</span>
            <select name="interest" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Management advisory</option>
              <option>Accounting & assurance</option>
              <option>Tax consultancy</option>
              <option>Technology services</option>
              <option>Integrated advisory</option>
            </select>
          </label>
          <label>
            <span>How can we help?</span>
            <textarea name="message" rows={4} required />
          </label>
          <button className="button button-accent" type="submit">
            Prepare my message <span aria-hidden="true">↗</span>
          </button>
          <p className="form-status" aria-live="polite">
            {formStatus}
          </p>
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Lucidus International L.L.C-FZ home">
          <span className="brand-symbol" aria-hidden="true">
            <span className="brand-orbit" />
            <span className="brand-letter">L</span>
            <span className="brand-spark" />
          </span>
          <span className="brand-type">
            <strong>Lucidus</strong>
            <small>International</small>
          </span>
        </a>
        <p>Professional advisory & technology services</p>
        <div className="footer-meta">
          <span>Lucidus International L.L.C-FZ · © {new Date().getFullYear()}</span>
          <span>Registered in Meydan Free Zone, Dubai, UAE</span>
        </div>
      </footer>
    </main>
  );
}
