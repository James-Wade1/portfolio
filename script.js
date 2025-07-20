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

// After loading header, attach burger menu listener
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
});

loadComponent('footer-placeholder', '/footer.html');