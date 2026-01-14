// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const recipientEmail = 'nicole.sabin.m@gmail.com';

    // Form validation
    function validateForm() {
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('[required]');
        
        formInputs.forEach(input => {
            const errorElement = document.getElementById(input.id + '-error');
            
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                    errorElement.classList.add('show');
                }
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }

            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Please enter a valid email address';
                        errorElement.classList.add('show');
                    }
                }
            }
        });

        return isValid;
    }

    // Clear errors on input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(this.id + '-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            this.classList.remove('error');
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Get form values
        const senderName = document.getElementById('sender-name').value.trim();
        const senderEmail = document.getElementById('sender-email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Create mailto link with encoded values
        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            `From: ${senderName}\n` +
            `Email: ${senderEmail}\n\n` +
            `Message:\n${message}`
        );

        const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message (optional)
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Opening Email Client...';
        submitButton.disabled = true;

        // Reset button after a moment
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Reset form
    contactForm.addEventListener('reset', function() {
        const errorElements = contactForm.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.classList.remove('show');
        });
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    });
});
