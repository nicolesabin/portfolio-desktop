// Resume Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all content is visible by default (fallback)
    const allContent = document.querySelectorAll('.resume-section-content, .education-item, .work-item, .work-year-label');
    allContent.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.visibility = 'visible';
    });
    
    // Collapsible Sections
    const sectionToggles = document.querySelectorAll('.section-toggle');
    
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const sectionTitle = this.closest('.resume-section-title');
            const section = sectionTitle.getAttribute('data-section');
            const content = document.getElementById(section + '-content');
            const icon = this.querySelector('.toggle-icon');
            
            if (content) {
                content.classList.toggle('collapsed');
                sectionTitle.classList.toggle('collapsed');
                
                // Rotate icon
                if (content.classList.contains('collapsed')) {
                    icon.style.transform = 'rotate(-90deg)';
                    icon.setAttribute('aria-expanded', 'false');
                } else {
                    icon.style.transform = 'rotate(0deg)';
                    icon.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });

    // Download Resume Button - moved to later in code to avoid duplication

    // Smooth scroll to sections
    const sectionTitles = document.querySelectorAll('.resume-section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            // Only scroll if clicking on the title itself, not the toggle button
            if (e.target === this || e.target.tagName === 'SPAN') {
                const section = this.getAttribute('data-section');
                const content = document.getElementById(section + '-content');
                if (content) {
                    content.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });

    // Enhanced scroll-to-reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe education items (work items are handled separately below with stagger)
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(item);
        }, index * 150);
    });

    // Add scroll-reveal class to elements for animation
    const contactInfo = document.querySelector('.resume-contact');
    if (contactInfo) {
        contactInfo.classList.add('scroll-reveal');
        observer.observe(contactInfo);
    }

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.resume-section-title');
    sectionTitles.forEach((title, index) => {
        title.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(title);
        }, index * 100);
    });

    // Animate skills categories with stagger
    const skillCategoriesForAnimation = document.querySelectorAll('.skill-category');
    skillCategoriesForAnimation.forEach((skill, index) => {
        skill.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(skill);
        }, index * 50);
    });

    // Animate work bullets
    const workBullets = document.querySelectorAll('.work-bullets li');
    workBullets.forEach((bullet, index) => {
        bullet.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(bullet);
        }, index * 30);
    });

    // Animate education details
    const educationDetails = document.querySelectorAll('.education-details, .education-meta, .education-involvement');
    educationDetails.forEach((detail, index) => {
        detail.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(detail);
        }, index * 50);
    });

    // Animate work descriptions
    const workDescriptions = document.querySelectorAll('.work-description, .work-position, .work-company');
    workDescriptions.forEach((desc, index) => {
        desc.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(desc);
        }, index * 40);
    });

    // Skills hover effect - removed inline transform as it's handled by CSS

    // Copy email to clipboard on double-click
    const emailLink = document.querySelector('.contact-email a');
    if (emailLink) {
        let clickCount = 0;
        emailLink.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const email = 'nicole.sabin.m@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                // Show feedback
                const originalText = this.textContent;
                this.textContent = '✓ Copied to clipboard!';
                this.style.color = '#2e7d32';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
        
        emailLink.addEventListener('click', function(e) {
            clickCount++;
            setTimeout(() => {
                if (clickCount === 1) {
                    // Single click - allow normal mailto
                }
                clickCount = 0;
            }, 300);
        });
    }

    // Track LinkedIn clicks
    const linkedinLink = document.querySelector('.contact-linkedin a');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', function() {
            console.log('LinkedIn profile opened');
        });
    }

    // Enhanced print functionality
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Expand all sections before printing
            const allSections = document.querySelectorAll('.resume-section-content.collapsed');
            allSections.forEach(section => {
                section.classList.remove('collapsed');
                const sectionTitle = section.closest('.resume-section').querySelector('.resume-section-title');
                if (sectionTitle) {
                    sectionTitle.classList.remove('collapsed');
                    const icon = sectionTitle.querySelector('.toggle-icon');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Wait a moment for sections to expand, then print
            setTimeout(() => {
                window.print();
            }, 300);
        });
    }

    // Skills hover effect and tooltip functionality
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const title = this.querySelector('.skill-category-title').textContent;
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = `Click to learn more about ${title}`;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);
        });
        
        skill.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }
        });
    });

    // Add progress indicator for work experience timeline (data attributes)
    const workItemsForData = document.querySelectorAll('.work-item');
    if (workItemsForData.length > 0) {
        workItemsForData.forEach((item, index) => {
            item.setAttribute('data-index', index);
        });
    }

    // Smooth reveal animation for year labels
    const yearLabels = document.querySelectorAll('.work-year-label');
    yearLabels.forEach((label, index) => {
        label.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(label);
        }, index * 100);
    });

    // Animate work items with stagger
    const workItemsForAnimation = document.querySelectorAll('.work-item');
    workItemsForAnimation.forEach((item, index) => {
        item.classList.add('scroll-reveal');
        setTimeout(() => {
            observer.observe(item);
        }, index * 150);
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Allow Enter/Space to toggle sections
        if (e.target.classList.contains('resume-section-title') || e.target.closest('.resume-section-title')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const toggle = e.target.closest('.resume-section-title').querySelector('.section-toggle');
                if (toggle) {
                    toggle.click();
                }
            }
        }
    });

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
});

