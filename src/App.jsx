import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import profileData from './data/profile.json';
import experienceData from './data/experience.json';
import projectsData from './data/projects.json';
import blogData from './data/blog-posts.json';

const iconNames = {
  Python: 'python', LLM: 'openai', OAuth: 'oauth', GitHub: 'github', FastAPI: 'fastapi', PostgreSQL: 'postgresql', LangChain: 'code', React: 'react', Docker: 'docker', Kubernetes: 'kubernetes', Security: 'shield', Storage: 'database', Cryptography: 'code', 'Cryptography Libraries': 'code', 'IoT Protocols': 'code', HTML: 'html5', JavaScript: 'javascript', 'Node.js': 'nodejs', MongoDB: 'mongodb', Analytics: 'chart', Java: 'java', SQL: 'database', 'C++': 'cplusplus', '.NET': 'dotnet', ArgoCD: 'argo', JFrog: 'jfrog', AWS: 'amazonwebservices', Azure: 'azure', MySQL: 'mysql', 'SQL Server': 'microsoftsqlserver', Git: 'git', Postman: 'postman'
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [statusModal, setStatusModal] = useState({ visible: false, title: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const recaptchaRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Track which section is in view and highlight the corresponding nav link
  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55%' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: if the hidden field is filled, it's a bot
    if (e.target.website?.value) return;

    // Throttle check
    if (submitCooldown) {
      setStatusModal({ visible: true, title: 'Please wait', message: 'You recently sent a message. Please wait a moment before trying again.' });
      return;
    }

    // reCAPTCHA verification
    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setStatusModal({ visible: true, title: 'CAPTCHA required', message: 'Please complete the "I\'m not a robot" verification before sending.' });
      return;
    }

    const btn = e.target.querySelector('button');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      e.target.reset();
      recaptchaRef.current?.reset();
      setStatusModal({ visible: true, title: 'Message sent successfully', message: 'Your message has been delivered. I will get back to you shortly.' });

      // Throttle: prevent rapid re-submission for 10 seconds
      setSubmitCooldown(true);
      setTimeout(() => setSubmitCooldown(false), 10000);
    } catch (error) {
      console.error(error);
      recaptchaRef.current?.reset();
      setStatusModal({ visible: true, title: 'Please reach out directly', message: `The form could not deliver your message this time. Email ${import.meta.env.VITE_EMAIL} directly.` });
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;
    }
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"></div>

      <header className="site-header">
        <div className="container nav-shell">
          <a className="wordmark" href="#home" aria-label="Nikhil Lenkewar home">
            <strong>Nikhil Lenkewar</strong>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <a className={activeSection === 'projects' ? 'is-active' : ''} href="#projects" onClick={closeMenu}>Projects</a>
            <a className={activeSection === 'experience' ? 'is-active' : ''} href="#experience" onClick={closeMenu}>Experience</a>
            <a className={activeSection === 'skills' ? 'is-active' : ''} href="#skills" onClick={closeMenu}>Skills</a>
            <a className={activeSection === 'blog' ? 'is-active' : ''} href="#blog" onClick={closeMenu}>Blogs</a>
            <a className={activeSection === 'about' ? 'is-active' : ''} href="#about" onClick={closeMenu}>About</a>
            <a className={activeSection === 'contact' ? 'is-active' : ''} href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <div className="nav-actions">
            <a href="#contact" className="btn btn-primary">Hire Me</a>
            <button className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-layout">
            <div className="hero-content">
              <p className="kicker">HI, I AM {profileData.name.toUpperCase()}</p>
              <h1>Software Engineer <br />& <span className="highlight">Backend • Data • AI</span> Enthusiast</h1>
              <p className="hero-intro" id="about-copy">{profileData.bio}</p>
              <div className="hero-actions">
                <a className="btn btn-outline" href="./assets/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/assets/hero-illustration.jpg" alt="Developer Workspace Illustration" />
            </div>
          </div>
        </section>

        <section id="projects" className="section section-light">
          <div className="container">
            <div className="section-heading text-center">
              <h2>Projects Portfolio</h2>
              <p className="section-note">Some of the projects I have successfully completed</p>
            </div>
            <div className="projects-grid">
              {projectsData.projects.map(item => (
                <article key={item.id} className="project-card">
                  <div className="project-top">
                    <span>{item.status}</span>
                    <span>{item.year}</span>
                  </div>
                  <img src={`/assets/project-previews/project-${item.id}.svg`} alt={`${item.title} Preview`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1.5rem' }} />
                  <h3>{item.title}</h3>
                  <p><strong>{item.tagline}</strong><br />{item.description}</p>
                  <div className="tags">
                    {item.technologies.map(tech => (
                      <span key={tech}><i className={`devicon-${iconNames[tech] || 'code'}-plain`} aria-hidden="true"></i>{tech}</span>
                    ))}
                  </div>
                  <a className="project-link" href={item.link} target="_blank" rel="noopener noreferrer">
                    View project <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <div className="section-heading text-center">
              <p className="kicker">Building along the way</p>
              <h2>Professional Milestones</h2>
              <p className="section-note">The roles, responsibilities, and lessons that shaped how I approach engineering.</p>
            </div>
            <div className="experience-grid">
              {[...experienceData.experience].reverse().map(item => (
                <article key={item.id} className="experience-card">
                  <div className="experience-marker">
                    <img src={`/assets/company-logos/company-${item.id}.svg`} alt={`${item.company} logo`} />
                    <span className="experience-dot"></span>
                    <span className="experience-date">{item.period}</span>
                  </div>
                  <div className="experience-summary">
                    <p className="kicker">{item.type}</p>
                    <h3>{item.title}</h3>
                    <p className="company">{item.company}</p>
                    <p className="period">{item.location}</p>
                  </div>
                  <div className="experience-detail">
                    <p>{item.description}</p>
                    <ul>
                      {item.highlights.map((highlight, idx) => <li key={idx}>{highlight}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section section-light">
          <div className="container">
            <div className="section-heading text-center">
              <p className="kicker">Tools for the journey</p>
              <h2>What I build with</h2>
              <p className="section-note">A practical toolkit for moving from a rough idea to a system people can rely on.</p>
            </div>
            <div className="skills-container">
              {Object.entries(profileData.skills).map(([category, items]) => (
                <div key={category} className="skill-category">
                  <p className="kicker">Toolkit</p>
                  <h3>{category.replace(/([A-Z])/g, ' $1').replace(/^./, letter => letter.toUpperCase())}</h3>
                  <div className="skill-items">
                    {items.map(item => (
                      <span key={item} className="skill-item">
                        <i className={`devicon-${iconNames[item] || 'code'}-plain`} aria-hidden="true"></i>{item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ai" className="section">
          <div className="container">
            <div className="section-heading text-center">
              <p className="kicker">A horizon I'm exploring</p>
              <h2>Systems that can reason</h2>
              <p className="section-note">AI is most interesting to me when it is grounded in useful data, clear workflows, and responsible engineering.</p>
            </div>
            <div className="ai-notes">
              <div className="ai-card"><span>01</span><strong>RAG</strong><p>Connecting language models to information that matters.</p></div>
              <div className="ai-card"><span>02</span><strong>Agentic AI</strong><p>Exploring systems that can plan, act, and stay observable.</p></div>
              <div className="ai-card"><span>03</span><strong>LLM applications</strong><p>Building practical interfaces between intelligence and product.</p></div>
            </div>
          </div>
        </section>

        <section id="blog" className="section section-light">
          <div className="container">
            <div className="section-heading text-center">
              <p className="kicker">Blogs from the journey</p>
              <h2>Things I've learned</h2>
              <p className="section-note">Articles and insights on backend engineering, AI, cloud infrastructure, and the honest version of learning.</p>
            </div>
            <div className="blog-grid">
              {blogData.posts.map(post => (
                <article key={post.id} className="blog-card">
                  <div className="blog-meta">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a className="blog-link" href={`/blog/${post.slug}`}>Read the blog <span>→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container two-column align-center">
            <div className="about-visual">
              <div className="about-card">
                <h3>Origin</h3>
                <p>Where the journey began.</p>
              </div>
            </div>
            <div className="about-content">
              <p className="kicker">Curiosity is a useful compass.</p>
              <h2>About Me</h2>
              <p className="body-copy">My work sits at the intersection of backend engineering, data systems, and thoughtful product delivery. I work with Python, APIs, workflows, cloud infrastructure, and the questions that appear when software meets the real world.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-light">
          <div className="container contact-layout">
            <div className="contact-info">
              <p className="kicker">Get in touch</p>
              <h2>Let's build.</h2>
              <p className="lead">Open to thoughtful products, challenging systems, and useful collaborations.</p>
              <div className="direct-links">
                <a className="social-icon-link" href={`mailto:${import.meta.env.VITE_EMAIL}`} aria-label="Email Nikhil" title="Email"><svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                <a className="social-icon-link" href={import.meta.env.VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                <a className="social-icon-link" href={import.meta.env.VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                <a className="social-icon-link" href={import.meta.env.VITE_TWITTER_URL} target="_blank" rel="noopener noreferrer" aria-label="Twitter" title="Twitter"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></a>
                <a className="social-icon-link" href={import.meta.env.VITE_REDDIT_URL} target="_blank" rel="noopener noreferrer" aria-label="Reddit" title="Reddit"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.12-.8-.25-1.3-.92-1.3-1.94zm2 7.82c-.8-1.04-1.2-2.38-1.2-3.82 0-3.3 3.8-6 8.5-6s8.5 2.7 8.5 6-3.8 6-8.5 6-8.5-2.7-8.5-6zm15.4-4.7c-.38-1.22-1.2-2.27-2.3-3.12.38-.5.96-.82 1.6-.82 1.1 0 2 .9 2 2 0 1.02-.5 1.7-1.3 1.94z" /><path d="M10.15 15.5c-1.23 0-2.22-.98-2.22-2.2s.99-2.2 2.22-2.2 2.22.98 2.22 2.2-.99 2.2-2.22 2.2zm5.7 0c-1.23 0-2.22-.98-2.22-2.2s.99-2.2 2.22-2.2 2.22.98 2.22 2.2-.99 2.2-2.22 2.2zm-4.25 3.32c-1.5 0-2.83-.55-3.66-1.42l1.1-1.1c.54.55 1.33.9 2.56.9 1.23 0 2.02-.35 2.56-.9l1.1 1.1c-.83.87-2.16 1.42-3.66 1.42z" /></svg></a>
              </div>
            </div>
            <form id="contact-form" className="contact-form" onSubmit={handleContactSubmit}>
              {/* Honeypot: hidden field to trap bots */}
              <input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />

              <label htmlFor="name">Your name</label>
              <input id="name" name="name" required type="text" placeholder="Your name" maxLength={100} />

              <label htmlFor="email">Your email</label>
              <input id="email" name="email" required type="email" placeholder="you@example.com" maxLength={254} />

              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" required type="text" placeholder="How can we work together?" maxLength={200} />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows="4" placeholder="Message" maxLength={2000}></textarea>

              {import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
                <div style={{ margin: '1rem 0' }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    theme={theme}
                  />
                </div>
              )}

              <button className="btn btn-primary submit-btn" type="submit" disabled={submitCooldown}>
                {submitCooldown ? 'Please wait…' : 'Send message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-banger">
          <div className="banger-content">
            <h2 className="banger-title">Nikhil Lenkewar</h2>
            <p className="banger-subtitle" style={{ marginBottom: '1rem' }}>Build · Learn · Explore · Repeat</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <img src="/assets/software-engineer.png" alt="Software Engineer" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
              <p style={{ color: 'var(--text-muted)', margin: '0' }}>&nbsp;·&nbsp; Backend · Data · AI &nbsp;·&nbsp; Bangalore, India</p>
            </div>
          </div>
          <div className="tech-marquee-wrapper">
            <div className="tech-marquee">
              {Object.keys(iconNames).slice(0, 15).map(tech => (
                <i key={tech} className={`devicon-${iconNames[tech]}-plain`}></i>
              ))}
              {Object.keys(iconNames).slice(0, 15).map(tech => (
                <i key={tech + '2'} className={`devicon-${iconNames[tech]}-plain`}></i>
              ))}
            </div>
          </div>
        </div>
        <div className="container footer-centered" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p className="copyright">© 2026 Nikhil Lenkewar</p>
        </div>
      </footer>

      <div className={`status-modal ${statusModal.visible ? 'is-visible' : ''}`} id="status-modal" aria-hidden={!statusModal.visible}>
        <div className="status-panel" role="status">
          <button id="status-close" type="button" aria-label="Close message" onClick={() => setStatusModal({ visible: false, title: '', message: '' })}>×</button>
          <h2 id="status-title">{statusModal.title}</h2>
          <p id="status-message">{statusModal.message}</p>
        </div>
      </div>
    </>
  );
}

export default App;
