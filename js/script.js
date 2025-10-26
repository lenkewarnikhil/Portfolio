document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Blog System ---
    const postsContainer = document.getElementById('posts-container');
    const postView = document.getElementById('post-view');
    const blogIndex = document.getElementById('blog-index');
    const searchInput = document.getElementById('blog-search');
    const searchResultsCount = document.getElementById('search-results-count');

    if (blogIndex) {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (slug) {
            loadPost(slug);
        } else {
            loadBlogIndex();
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => loadBlogIndex(e.target.value));
        }
    }

    async function loadBlogIndex(searchTerm = '') {
        try {
            const response = await fetch('assets/posts/posts.json');
            if (!response.ok) throw new Error('Failed to load posts.json');
            const data = await response.json();
            
            const filteredPosts = data.posts.filter(post => {
                const term = searchTerm.toLowerCase();
                const titleMatch = post.title.toLowerCase().includes(term);
                const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(term));
                return titleMatch || tagMatch;
            });

            renderBlogIndex(filteredPosts);

            if (searchResultsCount) {
                const count = filteredPosts.length;
                searchResultsCount.textContent = `${count} post${count !== 1 ? 's' : ''} found.`;
            }

        } catch (error) {
            console.error('Error loading blog index:', error);
            if (postsContainer) postsContainer.innerHTML = '<p>Error loading posts. Please try again later.</p>';
        }
    }

    function renderBlogIndex(posts) {
        if (!postsContainer) return;
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        postsContainer.innerHTML = posts.map(post => `
            <article class="post-card">
                <h2><a href="?slug=${post.slug}">${post.title}</a></h2>
                <p class="post-card-meta">${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt}</p>
                <div class="chips">
                    ${post.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');
    }

    async function loadPost(slug) {
        if (!postView || !blogIndex) return;

        try {
            const response = await fetch(`assets/posts/${slug}.md`);
            if (!response.ok) throw new Error('Post not found');
            const markdown = await response.text();
            const postData = await getPostData(slug);

            const html = parseMarkdown(markdown);

            blogIndex.hidden = true;
            postView.hidden = false;
            postView.innerHTML = `
                <h1>${postData.title}</h1>
                <p class="post-view-meta">Published on ${new Date(postData.date).toLocaleDateString()}</p>
                ${html}
                <a href="blog.html">← Back to all posts</a>
            `;
        } catch (error) {
            console.error('Error loading post:', error);
            blogIndex.hidden = false;
            postView.innerHTML = '<p>Sorry, the requested post could not be found.</p>';
        }
    }

    async function getPostData(slug) {
        const response = await fetch('assets/posts/posts.json');
        const data = await response.json();
        return data.posts.find(p => p.slug === slug);
    }

    function parseMarkdown(text) {
        const toHtml = text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            .replace(/\n\* (.*)/gim, (match, p1) => `<li>${p1}</li>`)
            .replace(/(\n)?<\/li><li>/gim, '</li><li>')
            .replace(/<li>/gim, '<ul><li>')
            .replace(/<\/li>(?!<li>)/gim, '</li></ul>')
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
            .replace(/```(\w*)\n([\s\S]*?)\n```/gim, '<pre><code>$2</code></pre>')
            .replace(/\n/gim, '<br>');

        return toHtml.trim();
    }

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                if (formStatus) {
                    formStatus.textContent = 'EmailJS is not loaded. Please check your internet connection or contact me directly at lenkewarnikhil104@gmail.com';
                    formStatus.style.color = 'red';
                    setTimeout(() => { if(formStatus) formStatus.textContent = ''; }, 5000);
                }
                btn.innerHTML = originalText;
                btn.disabled = false;
                return;
            }

            // Get form data
            const formData = {
                from_name: this.querySelector('#name').value,
                from_email: this.querySelector('#email').value,
                subject: this.querySelector('#subject').value,
                message: this.querySelector('#message').value,
                to_name: 'Nikhil'
            };

            // EmailJS send function
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon😊';
                        formStatus.style.color = 'green';
                        setTimeout(() => { if(formStatus) formStatus.textContent = ''; }, 5000);
                    }
                    document.getElementById('contact-form').reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    if (formStatus) {
                        formStatus.textContent = 'Failed😥. Please try again or contact me directly at l.nikhil.codes@gmail.com';
                        formStatus.style.color = 'red';
                        setTimeout(() => { if(formStatus) formStatus.textContent = ''; }, 5000);
                    }
                })
                .finally(function() {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        });
});