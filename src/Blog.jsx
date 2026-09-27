import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function parseMarkdown(md) {
  let html = md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  return html.split('\n\n')
    .map(para => para.trim())
    .filter(para => para.length > 0)
    .map(para => para.startsWith('<') ? para : `<p>${para}</p>`)
    .join('\n')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export default function Blog() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/assets/posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => {
        setContent(parseMarkdown(text));
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
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
