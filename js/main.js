// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const offCanvasMenu = document.getElementById('off-canvas-menu');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            offCanvasMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuToggle.setAttribute('aria-expanded', 'true');
        });
    }

    // Close menu
    function closeOffCanvasMenu() {
        offCanvasMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeOffCanvasMenu);
    }

    // Close menu when clicking overlay
    overlay.addEventListener('click', closeOffCanvasMenu);

    // Close menu when clicking a link
    const offCanvasLinks = document.querySelectorAll('.off-canvas-nav a');
    offCanvasLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation
            setTimeout(closeOffCanvasMenu, 100);
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && offCanvasMenu.classList.contains('active')) {
            closeOffCanvasMenu();
        }
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Highlight active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .off-canvas-nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

