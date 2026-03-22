// ============================================
// MODERN PORTFOLIO JAVASCRIPT
// Glassmorphism Effects & Smooth Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initializePortfolio();
});

// Toast Notification System
const Toast = {
  show(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const title = this.getTitle(type);
    toast.innerHTML = `
      <div class="toast-glow"></div>
      <div class="toast-content">
        <span class="toast-icon">${this.getIcon(type)}</span>
        <div class="toast-copy">
          <div class="toast-title">${title}</div>
          <div class="toast-message">${message}</div>
        </div>
      </div>
      <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  getIcon(type) {
    const icons = {
      success: '✓',
      error: '!',
      info: 'i',
      warning: '!'
    };
    return icons[type] || icons.info;
  },

  getTitle(type) {
    const titles = {
      success: 'Message Sent',
      error: 'Delivery Failed',
      info: 'Heads Up',
      warning: 'Warning'
    };
    return titles[type] || titles.info;
  },

  success(message, duration) {
    this.show(message, 'success', duration);
  },

  error(message, duration) {
    this.show(message, 'error', duration);
  },

  info(message, duration) {
    this.show(message, 'info', duration);
  }
};

// Confetti Effect
const Icons = {
  linkedin: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.94 8.5V19H3.56V8.5h3.38Zm.24-3.25c0 1.02-.77 1.75-1.93 1.75-1.1 0-1.88-.73-1.88-1.75 0-1.03.8-1.76 1.92-1.76 1.13 0 1.86.73 1.89 1.76ZM20.44 12.58V19h-3.37v-6.03c0-1.52-.54-2.56-1.9-2.56-1.04 0-1.66.7-1.93 1.38-.1.24-.12.58-.12.92V19h-3.37s.04-9.4 0-10.5h3.37v1.49c.45-.69 1.26-1.67 3.06-1.67 2.24 0 3.92 1.46 3.92 4.6Z"/>
    </svg>
  `,
  github: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.6 2 12.28c0 4.55 2.87 8.4 6.84 9.77.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.86-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05A9.28 9.28 0 0 1 12 6.89c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.56 1.41.21 2.46.11 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.35 4.81-4.6 5.06.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .28.18.61.69.5A10.3 10.3 0 0 0 22 12.28C22 6.6 17.52 2 12 2Z"/>
    </svg>
  `,
  twitter: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.26l-4.9-7.41L5.56 22H2.45l7.24-8.28L2 2h6.42l4.43 6.9L18.9 2Zm-1.1 18h1.73L7.47 3.9H5.62L17.8 20Z"/>
    </svg>
  `
};

const Portfolio = {
  // Configuration
  config: {
    smoothScroll: false,
    animateOnScroll: false,
    parallaxEnabled: false,
    theme: 'dark',
  },

  // Initialize portfolio
  init() {
    this.setupTheme();
    this.setupLaunchSequence();
    this.setupEventListeners();
    this.loadContent().finally(() => {
      this.setupScrollAnimations();
    });
    this.setupScrollState();
    this.setupContactForm();
    this.setupPlayground();
    this.setupArgoPanel();
  },

  // Setup theme
  setupTheme() {
    document.documentElement.removeAttribute('data-theme');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', '#081120');
    }
  },

  // Setup event listeners
  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }
      });
    });
  },

  // Setup contact form with EmailJS
  setupContactForm() {
    const EMAILJS_SCRIPT_SOURCES = [
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js',
      'https://unpkg.com/@emailjs/browser@3/dist/email.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/emailjs-com/3.2.0/email.min.js'
    ];

    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('contact-status');
    if (!form) {
      return;
    }

    const loadEnvConfig = async () => {
      if (window.__ENV) {
        return {
          serviceId: window.__ENV.EMAILJS_SERVICE_ID || '',
          templateId: window.__ENV.EMAILJS_TEMPLATE_ID || '',
          publicKey: window.__ENV.EMAILJS_PUBLIC_KEY || ''
        };
      }

      try {
        const response = await fetch('./.env', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to load .env (${response.status})`);
        }

        const text = await response.text();
        const env = {};

        text.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;

          const eqIndex = trimmed.indexOf('=');
          if (eqIndex === -1) return;

          const key = trimmed.slice(0, eqIndex).trim();
          const rawValue = trimmed.slice(eqIndex + 1).trim();
          env[key] = rawValue.replace(/^['"]|['"]$/g, '');
        });

        return {
          serviceId: env.EMAILJS_SERVICE_ID || '',
          templateId: env.EMAILJS_TEMPLATE_ID || '',
          publicKey: env.EMAILJS_PUBLIC_KEY || ''
        };
      } catch (error) {
        console.warn('Env config load error:', error);
        return {
          serviceId: '',
          templateId: '',
          publicKey: ''
        };
      }
    };

    const loadScript = (src) => new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[data-emailjs-src="${src}"]`);
      if (existingScript) {
        if (window.emailjs?.init && window.emailjs?.send) {
          resolve(window.emailjs);
          return;
        }

        existingScript.addEventListener('load', () => resolve(window.emailjs), { once: true });
        existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.emailjsSrc = src;
      script.onload = () => resolve(window.emailjs);
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

    const initEmailClient = async () => {
      const emailConfig = await loadEnvConfig();

      if (!emailConfig.publicKey || !emailConfig.serviceId || !emailConfig.templateId) {
        return { emailClient: null, emailConfig };
      }

      if (window.emailjs?.init && window.emailjs?.send) {
        try {
          window.emailjs.init(emailConfig.publicKey);
          return { emailClient: window.emailjs, emailConfig };
        } catch (error) {
          console.error('EmailJS init error:', error);
        }
      }

      for (const src of EMAILJS_SCRIPT_SOURCES) {
        try {
          await loadScript(src);
          if (window.emailjs?.init && window.emailjs?.send) {
            window.emailjs.init(emailConfig.publicKey);
            return { emailClient: window.emailjs, emailConfig };
          }
        } catch (error) {
          console.warn('EmailJS script load error:', error);
        }
      }

      return { emailClient: null, emailConfig };
    };

    const emailClientPromise = initEmailClient();

    const setStatus = (message, color = '') => {
      if (!formStatus) {
        return;
      }

      formStatus.textContent = message;
      formStatus.style.color = color || '';
      window.clearTimeout(setStatus.timeoutId);
      setStatus.timeoutId = window.setTimeout(() => {
        formStatus.textContent = '';
      }, 6000);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.submit-btn') || form.querySelector('button[type="submit"]');
      if (!submitBtn) {
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      const templateParams = {
        from_name: document.getElementById('name')?.value?.trim() || '',
        from_email: document.getElementById('email')?.value?.trim() || '',
        subject: document.getElementById('subject')?.value?.trim() || '',
        message: document.getElementById('message')?.value?.trim() || '',
        to_name: 'Nikhil'
      };

      try {
        const { emailClient, emailConfig } = await emailClientPromise;
        if (!emailClient) {
          throw new Error('EmailJS is not loaded or failed to initialize.');
        }

        if (!emailConfig.serviceId || !emailConfig.templateId) {
          throw new Error('EmailJS config is missing from .env.');
        }

        await emailClient.send(emailConfig.serviceId, emailConfig.templateId, templateParams);
        setStatus('Message sent successfully. I will get back to you shortly.', '#10b981');
        Toast.success('Message sent successfully. I will get back to you shortly.');
        form.reset();
      } catch (error) {
        console.error('EmailJS error:', error);
        const emailJsMessage = error?.text || error?.message || 'Unknown EmailJS error';
        const statusCode = error?.status ? ` (${error.status})` : '';
        setStatus(`EmailJS failed${statusCode}: ${emailJsMessage}`, '#ef4444');
        Toast.error(`EmailJS failed${statusCode}: ${emailJsMessage}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  },

  // Load content dynamically
  async loadContent() {
    try {
      // Load profile
      const profileRes = await fetch('./src/data/profile.json');
      const profile = await profileRes.json();
      this.renderProfile(profile);

      // Load experience
      const experienceRes = await fetch('./src/data/experience.json');
      const experience = await experienceRes.json();
      this.renderExperience(experience.experience);

      // Load projects
      const projectsRes = await fetch('./src/data/projects.json');
      const projects = await projectsRes.json();
      this.renderProjects(projects.projects);

      // Load blog posts
      const blogsRes = await fetch('./src/data/blog-posts.json');
      const blogs = await blogsRes.json();
      this.renderBlog(blogs.posts);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  },

  // Render profile information
  renderProfile(profile) {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const skillCategories = Object.keys(profile.skills || {}).length;
      const totalSkills = Object.values(profile.skills || {})
        .reduce((count, items) => count + (Array.isArray(items) ? items.length : 1), 0);
      const valueStatement = profile.bio.split('. ')[0]?.trim() || profile.bio;
      const socialLinksHTML = Object.entries(profile.socials)
        .map(([key, url]) => `<a href="${url}" class="social-link" title="${key}" target="_blank" rel="noopener">
          <span class="social-icon icon-${key}">${Icons[key] || ''}</span>
        </a>`)
        .join('');

      heroContent.innerHTML = `
        <div class="hero-grid">
          <div class="glass-card hero-main" data-animate>
            <p class="eyebrow">Portfolio</p>
            <h1 id="hero-name" class="hero-title">${profile.name}</h1>
            <p class="hero-subtitle">${profile.title}</p>
            <p class="hero-value">${valueStatement}${valueStatement.endsWith('.') ? '' : '.'}</p>
            <p class="hero-description">${profile.bio}</p>
            <div class="hero-chip-row">
              <div class="hero-chip"><strong>Location</strong><span>${profile.location}</span></div>
              <div class="hero-chip"><strong>Email</strong><span>${profile.email}</span></div>
              <div class="hero-chip"><strong>Phone</strong><span>${profile.phone}</span></div>
            </div>
            <div class="cta-buttons">
              <a href="#projects" class="btn btn-primary">View Projects</a>
              <a href="#blog" class="btn btn-secondary">Read Blog</a>
              <a href="#contact" class="btn btn-secondary">Contact</a>
            </div>
            <div class="social-links">
              ${socialLinksHTML}
            </div>
          </div>
          <div class="hero-side">
            <div class="glass-card about-card" data-animate>
              <p class="eyebrow">About</p>
              <h2 class="hero-panel-title">What I build</h2>
              <p class="about-copy">${profile.bio}</p>
            </div>
            <div class="glass-card snapshot-card" data-animate>
              <p class="eyebrow">Snapshot</p>
              <div class="snapshot-header">
                <h2 class="hero-panel-title">Quick profile</h2>
                <p class="snapshot-copy">A compact view of scope, tools, and presence across the portfolio.</p>
              </div>
              <div class="hero-metrics">
                <div class="metric-card metric-card-skills">
                  <span class="metric-icon" aria-hidden="true"></span>
                  <span class="metric-label">Capabilities</span>
                  <strong class="metric-value">${skillCategories}</strong>
                  <span class="metric-note">Skill groups</span>
                </div>
                <div class="metric-card metric-card-tools">
                  <span class="metric-icon" aria-hidden="true"></span>
                  <span class="metric-label">Toolbox</span>
                  <strong class="metric-value">${totalSkills}</strong>
                  <span class="metric-note">Tools listed</span>
                </div>
                <div class="metric-card metric-card-location">
                  <span class="metric-icon" aria-hidden="true"></span>
                  <span class="metric-label">Base</span>
                  <strong class="metric-value metric-value-text">${profile.location.split(',')[0]}</strong>
                  <span class="metric-note">Based in</span>
                </div>
                <div class="metric-card metric-card-social">
                  <span class="metric-icon" aria-hidden="true"></span>
                  <span class="metric-label">Reach</span>
                  <strong class="metric-value">${Object.keys(profile.socials || {}).length}</strong>
                  <span class="metric-note">Social links</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      // Render skills
      this.renderSkills(profile.skills);
    }
  },

  // Render skills section
  renderSkills(skills) {
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
      const skillsHTML = Object.entries(skills)
        .map(([category, items]) => {
          const categoryName = category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          
          return `
            <div class="glass-card skill-category" data-animate>
              <p class="eyebrow">Skill Set</p>
              <h3 class="skill-category-title">${categoryName}</h3>
              <div class="skill-items">
                ${Array.isArray(items) ? items.map(item => `<span class="skill-item">${item}</span>`).join('') : `<span class="skill-item">${items}</span>`}
              </div>
            </div>
          `;
        })
        .join('');
      
      skillsContainer.innerHTML = skillsHTML;
    }
  },

  // Render experience section
  renderExperience(experiences) {
    const experienceGrid = document.querySelector('.experience-grid');
    if (experienceGrid) {
      experienceGrid.innerHTML = experiences.map((exp, idx) => `
        <div class="experience-item" style="animation-delay: ${idx * 0.1}s" data-animate>
          <div class="glass-card experience-card">
            <div class="experience-header">
              <div class="experience-title-group">
                <div class="experience-logo-wrap">
                  <img src="./assets/company-logos/company-${exp.id}.svg" alt="${exp.company} logo" class="experience-logo">
                </div>
                <div>
                <p class="eyebrow">Experience</p>
                <h3 class="experience-title">${exp.title}</h3>
                <p class="experience-company">${exp.company}</p>
                </div>
              </div>
              <span class="experience-period">${(exp.period || '').replace(/â€“/g, '–')}</span>
            </div>
            <div class="experience-meta">
              <span class="experience-pill">${exp.type}</span>
              <span class="experience-pill">${exp.location}</span>
            </div>
            <p class="experience-description">${exp.description}</p>
            <ul class="highlights">
              ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }
  },

  // Render projects section
  renderProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      projectsGrid.innerHTML = projects.map((project, idx) => `
        <div class="glass-card project-card" style="animation-delay: ${idx * 0.1}s" data-animate>
          <div class="project-preview">
            <img src="./assets/project-previews/project-${project.id}.svg" alt="${project.title} preview" class="project-preview-image">
          </div>
          <div class="project-header">
            <div class="project-topline">
              <span class="project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</span>
              <span class="project-year">${project.year}</span>
            </div>
            <p class="eyebrow">Project</p>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-tagline">${project.tagline}</p>
          </div>
          <p class="project-description">${project.description}</p>
          <p class="project-long-description">${project.longDescription}</p>
          <div class="tech-stack">
            ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
          <div class="project-tech-list">
            ${project.technologies.map(tech => `<span class="project-tech-pill">${tech}</span>`).join('')}
          </div>
          <ul class="project-highlights">
            ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
          </ul>
          <div class="project-links">
            ${project.link !== '#' ? `<a href="${project.link}" target="_blank" rel="noopener">View Project</a>` : '<span class="project-link-fallback">Coming Soon</span>'}
          </div>
        </div>
      `).join('');
    }
  },

  // Render blog section
  renderBlog(posts) {
    const blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
      const featuredPost = posts.find(p => p.featured);
      const otherPosts = posts.filter(p => !p.featured);

      let html = '';

      if (featuredPost) {
        html += `
          <div class="glass-card blog-card blog-featured" data-animate>
            <div class="blog-card-orb" aria-hidden="true"></div>
            <div class="blog-preview blog-preview-featured">
              <img src="./assets/blog-previews/${featuredPost.slug}.svg" alt="${featuredPost.title} preview" class="blog-preview-image">
            </div>
            <div class="blog-featured-content">
              <div class="blog-copy">
                <p class="eyebrow">Featured Article</p>
                <div class="blog-meta">
                  <span class="blog-date">${new Date(featuredPost.date).toLocaleDateString()}</span>
                  <span class="blog-read-time">${featuredPost.readTime}</span>
                </div>
                <h3 class="blog-title">${featuredPost.title}</h3>
                <p class="blog-excerpt">${featuredPost.excerpt}</p>
              </div>
              <div class="blog-card-footer">
                <div class="blog-tags">
                  ${featuredPost.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="./blog.html#blog/${featuredPost.slug}" class="read-more">Read Full Article</a>
              </div>
            </div>
          </div>
        `;
      }

      html += otherPosts.map((post, idx) => `
        <div class="glass-card blog-card" style="animation-delay: ${(idx + 1) * 0.1}s" data-animate>
          <div class="blog-card-orb" aria-hidden="true"></div>
          <div class="blog-preview">
            <img src="./assets/blog-previews/${post.slug}.svg" alt="${post.title} preview" class="blog-preview-image">
          </div>
          <div class="blog-copy">
            <p class="eyebrow">Article</p>
            <div class="blog-meta">
              <span class="blog-date">${new Date(post.date).toLocaleDateString()}</span>
              <span class="blog-read-time">${post.readTime}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
          </div>
          <div class="blog-card-footer">
            <div class="blog-tags">
              ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <a href="./blog.html#blog/${post.slug}" class="read-more">Read Full Article</a>
          </div>
        </div>
      `).join('');

      blogGrid.innerHTML = html;
    }
  },

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  },

  setupScrollState() {
    const progressBar = document.querySelector('.scroll-progress');
    const header = document.querySelector('header');
    let ticking = false;

    const updateScrollUi = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }

      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollUi);
        ticking = true;
      }
    }, { passive: true });

    updateScrollUi();
  },

  setupPlayground() {
    const stage = document.getElementById('playground-stage');
    const runner = document.getElementById('playground-runner');
    const obstaclesHost = document.getElementById('playground-obstacles');
    const overlay = document.getElementById('playground-overlay');
    const scoreNode = document.getElementById('playground-score');
    const bestNode = document.getElementById('playground-best');
    const resetButton = document.getElementById('playground-reset');

    if (!stage || !runner || !obstaclesHost || !overlay || !scoreNode || !bestNode || !resetButton) {
      return;
    }

    const state = {
      score: 0,
      best: Number(window.localStorage?.getItem('portfolio_cosmo_best') || 0),
      running: false,
      gameOver: false,
      velocityY: 0,
      runnerY: 0,
      gravity: 0.68,
      jumpForce: -11.8,
      speed: 5.8,
      spawnTimer: 0,
      frameId: 0,
      lastTime: 0,
      obstacles: []
    };

    const GROUND_OFFSET = 18;

    const setOverlay = (title, subtitle) => {
      overlay.innerHTML = `
        <div class="playground-overlay-copy">
          <strong>${title}</strong>
          <span>${subtitle}</span>
        </div>
      `;
    };

    const persistBest = () => {
      if (state.score > state.best) {
        state.best = state.score;
        window.localStorage?.setItem('portfolio_cosmo_best', String(state.best));
      }
      bestNode.textContent = String(state.best);
    };

    const resetRunner = () => {
      state.velocityY = 0;
      state.runnerY = 0;
      runner.style.bottom = `${GROUND_OFFSET}px`;
      runner.classList.remove('runner-jump', 'runner-fall');
    };

    const clearObstacles = () => {
      state.obstacles.forEach((item) => item.node.remove());
      state.obstacles = [];
      obstaclesHost.innerHTML = '';
    };

    const resetGame = () => {
      state.score = 0;
      state.speed = 5.8;
      state.spawnTimer = 0;
      state.lastTime = 0;
      state.gameOver = false;
      scoreNode.textContent = '0';
      persistBest();
      clearObstacles();
      resetRunner();
      setOverlay('Tap, click, or press Space to start', 'Jump with tap, click, Space, Arrow Up, or W.');
      overlay.hidden = false;
      stage.dataset.state = 'ready';
    };

    const spawnObstacle = () => {
      const node = document.createElement('span');
      const tall = Math.random() > 0.6;
      node.className = `playground-obstacle ${tall ? 'obstacle-tall' : 'obstacle-short'}`;
      const width = tall ? 28 : 42;
      const height = tall ? 54 : 34;
      const x = stage.clientWidth + 24;
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      node.style.left = `${x}px`;
      node.style.bottom = `${GROUND_OFFSET}px`;
      obstaclesHost.appendChild(node);
      state.obstacles.push({ node, x, width, height });
    };

    const startGame = () => {
      if (state.running) {
        return;
      }

      if (state.gameOver) {
        clearObstacles();
        state.score = 0;
        scoreNode.textContent = '0';
        resetRunner();
      }

      state.running = true;
      state.gameOver = false;
      state.spawnTimer = 320;
      state.lastTime = 0;
      overlay.hidden = true;
      stage.dataset.state = 'running';
      stage.focus();
      state.frameId = window.requestAnimationFrame(gameLoop);
    };

    const jump = () => {
      if (!state.running) {
        startGame();
        return;
      }

      if (state.runnerY > 1) {
        return;
      }

      state.velocityY = state.jumpForce;
      runner.classList.add('runner-jump');
      runner.classList.remove('runner-fall');
    };

    const getRunnerRect = () => {
      const width = runner.offsetWidth;
      const height = runner.offsetHeight;
      const left = 36;
      const bottom = GROUND_OFFSET + state.runnerY;
      return {
        left: left + 4,
        right: left + width - 6,
        top: stage.clientHeight - bottom - height + 8,
        bottom: stage.clientHeight - bottom - 2
      };
    };

    const checkCollision = () => {
      const player = getRunnerRect();
      return state.obstacles.some((item) => {
        const left = item.x;
        const right = item.x + item.width;
        const top = stage.clientHeight - GROUND_OFFSET - item.height;
        const bottom = stage.clientHeight - GROUND_OFFSET;
        return !(
          player.right < left + 4 ||
          player.left > right - 4 ||
          player.bottom < top + 4 ||
          player.top > bottom - 4
        );
      });
    };

    const endGame = () => {
      state.running = false;
      state.gameOver = true;
      stage.dataset.state = 'over';
      runner.classList.remove('runner-jump');
      runner.classList.add('runner-fall');
      persistBest();
      setOverlay(`Crash at ${state.score}`, 'Tap, click, or press Space to run again.');
      overlay.hidden = false;
      window.cancelAnimationFrame(state.frameId);
    };

    const updateRunner = () => {
      state.velocityY += state.gravity;
      state.runnerY = Math.max(0, state.runnerY - state.velocityY);

      if (state.runnerY === 0) {
        state.velocityY = 0;
        runner.classList.remove('runner-jump', 'runner-fall');
      } else if (state.velocityY > 1) {
        runner.classList.add('runner-fall');
      }

      runner.style.bottom = `${GROUND_OFFSET + state.runnerY}px`;
    };

    const updateObstacles = () => {
      state.obstacles = state.obstacles.filter((item) => {
        item.x -= state.speed;
        item.node.style.left = `${item.x}px`;
        if (item.x + item.width < -20) {
          item.node.remove();
          state.score += 1;
          scoreNode.textContent = String(state.score);
          if (state.score % 6 === 0) {
            state.speed += 0.45;
          }
          return false;
        }
        return true;
      });
    };

    const gameLoop = (time) => {
      if (!state.running) {
        return;
      }

      if (!state.lastTime) {
        state.lastTime = time;
      }

      const delta = Math.min(32, time - state.lastTime);
      state.lastTime = time;
      state.spawnTimer += delta;

      if (state.spawnTimer > Math.max(760, 1380 - state.speed * 70)) {
        spawnObstacle();
        state.spawnTimer = 0;
      }

      updateRunner();
      updateObstacles();

      if (checkCollision()) {
        endGame();
        return;
      }

      state.frameId = window.requestAnimationFrame(gameLoop);
    };

    const handleAction = (event) => {
      if (event) {
        event.preventDefault();
      }
      jump();
    };

    const handleKey = (event) => {
      const key = event.key.toLowerCase();
      if ([' ', 'arrowup', 'w'].includes(key)) {
        handleAction(event);
      }
    };

    const pointerStart = (event) => {
      if (event.pointerType === 'mouse') {
        stage.focus();
      }
      handleAction(event);
    };

    stage.addEventListener('keydown', handleKey);
    stage.addEventListener('pointerdown', pointerStart);
    overlay.addEventListener('pointerdown', pointerStart);

    resetButton.addEventListener('click', () => {
      window.cancelAnimationFrame(state.frameId);
      resetGame();
      stage.focus();
    });

    bestNode.textContent = String(state.best);
    resetGame();
  },

  setupArgoPanel() {
    const consoleHost = document.getElementById('argocd-console');
    const tabs = document.querySelectorAll('.argocd-tab');
    const stripHost = document.getElementById('argocd-strip');
    const mapNodes = document.querySelectorAll('.argocd-node[data-node]');
    const headerState = document.querySelector('.argocd-app div span');
    if (!consoleHost || !tabs.length || !stripHost || !mapNodes.length) {
      return;
    }

    const panels = {
      logs: [
        '[12:02:14] api-server | request validated for /reviews/sync',
        '[12:02:16] temporal-worker | activity batch_audit completed',
        '[12:02:18] evaluator | scorecard generated for pharma-run-22'
      ],
      events: [
        'Deployment synced from Git revision `7c9f4a1`',
        'New replica available for `validation-job`',
        'Health probe passed for `api-server-7f4d9`'
      ],
      resources: [
        'Pods: 03 healthy / 00 degraded',
        'Services: `api`, `worker`, `scheduler` exposed',
        'Crons: `nightly-audit` next run in 02h 14m'
      ]
    };

    const stripSets = [
      [
        ['Healthy', 'Ingress synced'],
        ['Synced', 'Service endpoints ready'],
        ['Running', '2 pods available']
      ],
      [
        ['Healthy', 'Ingress active'],
        ['Progressing', 'New rollout observed'],
        ['Running', 'Worker consuming queue']
      ],
      [
        ['Healthy', 'Ingress steady'],
        ['Degraded', 'Worker restarted once'],
        ['Running', 'Validation job recovering']
      ]
    ];

    let active = 'logs';
    let stripPointer = 0;
    let activeNode = 'service';

    const renderConsole = () => {
      consoleHost.innerHTML = panels[active]
        .map((line) => `<div class="argocd-line">${line}</div>`)
        .join('');
    };

    const renderStrip = () => {
      const current = stripSets[stripPointer % stripSets.length];
      stripHost.innerHTML = current.map(([label, value]) => `
        <div class="argocd-strip-item">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `).join('');
      stripPointer += 1;
      if (headerState) {
        headerState.textContent = current[1][0] === 'Degraded' ? 'Synced · Degraded' : 'Synced · Healthy';
      }
    };

    const setActiveNode = (nodeKey) => {
      activeNode = nodeKey;
      mapNodes.forEach((node) => node.classList.toggle('is-selected', node.dataset.node === nodeKey));
      if (nodeKey === 'pod-job') {
        active = 'events';
      } else if (nodeKey === 'pod-worker') {
        active = 'resources';
      } else {
        active = 'logs';
      }
      tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.panel === active));
      renderConsole();
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        active = tab.dataset.panel;
        tabs.forEach((item) => item.classList.toggle('is-active', item === tab));
        renderConsole();
      });
    });

    mapNodes.forEach((node) => {
      node.addEventListener('click', () => {
        setActiveNode(node.dataset.node);
      });
    });

    setActiveNode(activeNode);
    renderConsole();
    renderStrip();
    window.setInterval(renderStrip, 3200);
  },

  setupLaunchSequence() {
    const overlay = document.getElementById('launch-overlay');
    if (!overlay) {
      return;
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('launch-complete');
      overlay.remove();
      return;
    }

    const seen = window.sessionStorage?.getItem('portfolio_launch_seen') === '1';
    if (seen) {
      document.body.classList.add('launch-complete');
      overlay.remove();
      return;
    }

    document.body.classList.add('launch-active');

    window.setTimeout(() => {
      overlay.classList.add('launch-ignite');
    }, 360);

    window.setTimeout(() => {
      overlay.classList.add('launch-break');
    }, 1600);

    window.setTimeout(() => {
      overlay.classList.add('launch-liftoff');
    }, 2550);

    window.setTimeout(() => {
      document.body.classList.add('launch-complete');
      window.sessionStorage?.setItem('portfolio_launch_seen', '1');
    }, 4300);

    window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove('launch-active');
    }, 5200);
  }
};

function initializePortfolio() {
  Portfolio.init();
}


