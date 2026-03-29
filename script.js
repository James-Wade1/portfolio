async function loadComponent(placeholderId, filePath, callback) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const content = await response.text();
        const placeholder = document.getElementById(placeholderId);
        placeholder.innerHTML = content;

        if (callback) callback();
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// After loading header, attach burger menu listener + scroll effect
loadComponent('header-placeholder', '/header.html', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // Select both desktop and mobile menu links
    const navLinks = document.querySelectorAll('.navigation a, #mobile-menu a');
    navLinks.forEach(link => {
        var href = link.getAttribute('href') || '';
        const normalizedHref = href.replace(/^\/+/, '');
        const normalizedPage = currentPage.replace(/^\/+/, '');
        if (normalizedHref === normalizedPage) {
            link.parentElement.classList.add('navigation__item--active');
        }
    });

    // Setup burger menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Header scroll shadow
    const headerEl = document.querySelector('#header-content header');
    if (headerEl) {
        const onScroll = () => headerEl.classList.toggle('header-scrolled', window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
});

loadComponent('footer-placeholder', '/footer.html');

// Scroll reveal — runs after DOM is parsed
document.addEventListener('DOMContentLoaded', () => {
    // Apply reveal to top-level sections and individual publication entries
    document.querySelectorAll('main > section, main section').forEach(el => {
        el.classList.add('reveal');
    });
    document.querySelectorAll('.publication-entry').forEach(el => {
        el.classList.add('reveal');
    });

    // Stagger publication entries within their containers
    document.querySelectorAll('.space-y-8, .space-y-10').forEach(container => {
        container.querySelectorAll('.publication-entry').forEach((entry, i) => {
            entry.style.transitionDelay = `${i * 0.09}s`;
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
