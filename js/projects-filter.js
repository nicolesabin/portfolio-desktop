// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-filtered');

    if (filterButtons.length === 0 || projectCards.length === 0) {
        return; // Exit if elements don't exist (not on projects page)
    }

    // Function to apply filter
    function applyFilter(filterValue) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to matching button
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            }
        });

        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });

        // Smooth scroll to projects section if needed
        const projectsSection = document.querySelector('.projects-grid-filtered');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Check for URL parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
        applyFilter(filterParam);
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            applyFilter(filterValue);
            
            // Update URL without reloading page
            const newUrl = filterValue === 'all' 
                ? window.location.pathname 
                : window.location.pathname + '?filter=' + filterValue;
            window.history.pushState({}, '', newUrl);
        });
    });
});

