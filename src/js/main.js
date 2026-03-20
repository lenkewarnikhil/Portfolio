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
    this.setupEventListeners();
    this.loadContent();
    this.setupScrollAnimations();
    this.setupScrollState();
    this.setupContactForm();
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
      const socialLinksHTML = Object.entries(profile.socials)
        .map(([key, url]) => `<a href="${url}" class="social-link" title="${key}" target="_blank" rel="noopener">
          <span class="social-icon icon-${key}">${Icons[key] || ''}</span>
        </a>`)
        .join('');

      heroContent.innerHTML = `
        <div class="glass-card hero-main" data-animate>
          <div class="window-chrome">
            <span class="window-dot window-dot-red"></span>
            <span class="window-dot window-dot-yellow"></span>
            <span class="window-dot window-dot-green"></span>
          </div>
          <div class="hero-badge">Open to ambitious backend work</div>
          <h1 id="hero-name" class="hero-title-gradient">${profile.name}</h1>
          <p class="hero-subtitle">${profile.title}</p>
          <p class="hero-description">${profile.bio}</p>
          <div class="hero-chip-row">
            <div class="hero-chip"><strong>Location</strong> ${profile.location}</div>
            <div class="hero-chip"><strong>Email</strong> ${profile.email}</div>
            <div class="hero-chip"><strong>Focus</strong> Software Engineering, data science and AI Platforms</div>
          </div>
          <div class="cta-buttons">
            <a href="#projects" class="btn btn-primary">View My Work</a>
            <a href="#contact" class="btn btn-secondary">Get in Touch</a>
          </div>
          <div class="social-links">
            ${socialLinksHTML}
          </div>
        </div>
        <div class="hero-side" data-animate>
          <div class="glass-card">
            <div class="hero-panel-title">Role Snapshot</div>
            <div class="hero-stack">
              <div class="hero-stack-item">
                <span class="hero-stack-label">Current Role</span>
                <span class="hero-stack-value">Backend Lead</span>
              </div>
              <div class="hero-stack-item">
                <span class="hero-stack-label">Primary Stack</span>
                <span class="hero-stack-value">Python, FastAPI, PostgreSQL</span>
              </div>
              <div class="hero-stack-item">
                <span class="hero-stack-label">Location</span>
                <span class="hero-stack-value">${profile.location}</span>
              </div>
            </div>
          </div>
          <div class="glass-card">
            <div class="hero-panel-title">Portfolio Signals</div>
            <div class="hero-metrics">
              <div class="metric-card">
                <strong>${skillCategories}</strong>
                <span>Skill groups</span>
              </div>
              <div class="metric-card">
                <strong>${totalSkills}</strong>
                <span>Core tools</span>
              </div>
              <div class="metric-card">
                <strong>AI</strong>
                <span>Integrated products</span>
              </div>
              <div class="metric-card">
                <strong>Cloud</strong>
                <span>Delivery mindset</span>
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
              <div>
                <h3 class="experience-title">${exp.title}</h3>
                <p class="experience-company">${exp.company}</p>
              </div>
              <span class="experience-period">${exp.period}</span>
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
          <div class="project-header">
            <div class="project-topline">
              <span class="project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</span>
              <span class="project-year">${project.year}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-tagline">${project.tagline}</p>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="tech-stack">
            ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
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
            <div>
              <div class="blog-meta">
                <span class="blog-date">${new Date(featuredPost.date).toLocaleDateString()}</span>
                <span class="blog-read-time">${featuredPost.readTime}</span>
              </div>
              <h3 class="blog-title">${featuredPost.title}</h3>
              <p class="blog-excerpt">${featuredPost.excerpt}</p>
              <div class="blog-tags">
                ${featuredPost.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
              </div>
              <a href="./blog.html#blog/${featuredPost.slug}" class="read-more">Read Full Article</a>
            </div>
            <div class="blog-featured-media">
              <span class="blog-featured-label">Featured Story</span>
              <div class="blog-featured-copy">Backend engineering, systems thinking, and product building.</div>
            </div>
          </div>
        `;
      }

      html += otherPosts.map((post, idx) => `
        <div class="glass-card blog-card" style="animation-delay: ${(idx + 1) * 0.1}s" data-animate>
          <div class="blog-meta">
            <span class="blog-date">${new Date(post.date).toLocaleDateString()}</span>
            <span class="blog-read-time">${post.readTime}</span>
          </div>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div class="blog-tags">
            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
          <a href="./blog.html#blog/${post.slug}" class="read-more">Read Full Article</a>
        </div>
      `).join('');

      blogGrid.innerHTML = html;
    }
  },

  setupScrollAnimations() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('fade-in');
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
};

function initializePortfolio() {
  Portfolio.init();
}


