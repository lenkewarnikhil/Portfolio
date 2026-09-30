import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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
      <header className="site-header">
        <div className="container nav-shell">
          <a className="wordmark" href="/#home" aria-label="Nikhil Lenkewar home">
            <strong>Nikhil Lenkewar</strong>
          </a>
          <nav className="nav-links">
            <a href="/#projects">Projects</a>
            <a href="/#experience">Experience</a>
            <a href="/#skills">Skills</a>
            <a href="/#blog" className="is-active">Blogs</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main>
        <div className="blog-reading-container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '10rem', paddingBottom: '5rem', minHeight: '80vh' }}>
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
              <div className="back-link" style={{ marginBottom: '3rem' }}>
                <a href="/#blog" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to all blogs
                </a>
              </div>
              <article className="blog-post-article" dangerouslySetInnerHTML={{ __html: content }} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
