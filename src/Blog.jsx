import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import blogData from './data/blog-posts.json';

// Configure marked: disable raw HTML input so injected tags are escaped
marked.setOptions({
  breaks: true,
  gfm: true,
});

// DOMPurify hook: only allow safe URL protocols (blocks javascript:, data:, etc.)
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.hasAttribute('href')) {
    const href = node.getAttribute('href');
    if (href && !/^(https?:\/\/|\/|#|mailto:)/i.test(href)) {
      node.removeAttribute('href');
    }
  }
  // Force external links to open safely
  if (node.tagName === 'A' && node.getAttribute('href')?.startsWith('http')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

function renderMarkdown(md) {
  const rawHtml = marked.parse(md);
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'em', 'del', 'code', 'pre',
      'a', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class'],
  });
}

export default function Blog() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const postMeta = blogData.posts.find(p => p.slug === slug);

  useEffect(() => {
    const controller = new AbortController();

    setContent('');
    setLoading(true);
    setError(false);

    fetch(`/assets/posts/${slug}.md`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => {
        setContent(renderMarkdown(text));
        setError(false);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return; // Ignore cancelled requests
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header className="site-header">
        <div className="container nav-shell">
          <a className="wordmark" href="/#home" aria-label="Nikhil Lenkewar home">
            <strong>Nikhil Lenkewar</strong>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            <a href="/#projects" onClick={closeMenu}>Projects</a>
            <a href="/#experience" onClick={closeMenu}>Experience</a>
            <a href="/#skills" onClick={closeMenu}>Skills</a>
            <a href="/#blog" className="is-active" onClick={closeMenu}>Blogs</a>
            <a href="/#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <div className="nav-actions">
            <button className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <div className="blog-reading-container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '10rem', paddingBottom: '5rem', minHeight: '80vh', paddingLeft: '1rem', paddingRight: '1rem' }}>
          {error ? (
            <>
              <div className="back-link" style={{ marginBottom: '2rem' }}>
                <a href="/#blog" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>← Back to all blogs</a>
              </div>
              <p style={{ color: 'var(--text-main)' }}>Article not found. <a href="/#blog" style={{ color: 'var(--primary-color)' }}>Return to blogs</a></p>
            </>
          ) : loading ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Loading article…</p>
          ) : (
            <>
              <div className="back-link" style={{ marginBottom: '2rem' }}>
                <a href="/#blog" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to all blogs
                </a>
              </div>

              {postMeta && (
                <div className="blog-header-meta" style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem', flexWrap: 'wrap', fontWeight: '500' }}>
                    <span>📅 {new Date(postMeta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>⏱️ {postMeta.readTime}</span>
                  </div>
                  <div className="tags">
                    {postMeta.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              <article className="blog-post-article" dangerouslySetInnerHTML={{ __html: content }} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
