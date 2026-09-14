async function loadComponent(placeholderId, filePath, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        placeholder.innerHTML = await response.text();
        if (callback) callback();
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

function initializePortfolio() {
    loadComponent('header-placeholder', '/header.html', () => {
        const path = window.location.pathname;
        const currentPage = path.startsWith('/projects/') ? '/technical_projects.html'
            : path.startsWith('/misc/') ? '/publications.html'
            : path === '/' ? '/index.html' : path;
        document.querySelectorAll('.navigation a, #mobile-menu a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            }
        });
        const toggle = document.getElementById('menu-toggle');
        const menu = document.getElementById('mobile-menu');
        const setMenuOpen = open => {
            menu.hidden = !open;
            toggle.setAttribute('aria-expanded', String(open));
        };
        toggle.addEventListener('click', () => setMenuOpen(menu.hidden));
        menu.addEventListener('click', event => {
            if (event.target.closest('a')) setMenuOpen(false);
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !menu.hidden) {
                setMenuOpen(false);
                toggle.focus();
            }
        });
        document.addEventListener('click', event => {
            if (!event.target.closest('.site-header')) setMenuOpen(false);
        });
        window.matchMedia('(min-width: 800px)').addEventListener('change', event => {
            if (event.matches) setMenuOpen(false);
        });
        const header = document.querySelector('.site-header');
        const onScroll = () => header.classList.toggle('header-scrolled', window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    });
    loadComponent('footer-placeholder', '/footer.html');

    // Reuse existing headings to make long pages easier to browse.
    const main = document.querySelector('main');
    if (main && !document.body.classList.contains('home-page')) {
        const headings = [...main.querySelectorAll('h2')];
        if (headings.length > 1) {
            const nav = document.createElement('nav');
            nav.className = 'section-navigation';
            nav.setAttribute('aria-label', 'On this page');
            headings.forEach((heading, index) => {
                if (!heading.id) heading.id = `section-${index + 1}`;
                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                nav.append(link);
            });
            main.prepend(nav);
        }
    }
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('main img:not(.profile-photo)').forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
    // Content is visible by default; motion is a progressive enhancement.
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.04 });
        document.querySelectorAll('#selected-work .grid > a, #interests').forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
    initializePortfolio();
}
