"use client";

import { FormEvent, useEffect, useState } from "react";

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

export default function Home() {
  const [formStatus, setFormStatus] = useState("");

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
        <a className="brand" href="#top" aria-label="Lucidus International L.L.C-FZ home">
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
          <div className="perspective-graphic" aria-hidden="true">
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

              <div className="system-core">
                <span>One</span>
                <strong>Clear<br />view</strong>
                <i />
              </div>
            </div>
            <div className="system-meta system-meta-bottom">
              <span>Connected disciplines</span>
              <span className="system-status">Live perspective</span>
            </div>
          </div>
        </div>
      </section>

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
