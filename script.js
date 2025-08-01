document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('successMessage');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl73h1v6kwKHKwp6Y2hnFxQLX1dbka2TFmBjZSs14x-Q_mUv9y_7IwMgrSF_v5saGVHg/exec';
    
    // Fetch and display waitlist count
    async function updateWaitlistCount() {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL + '?action=count');
            const data = await response.json();
            const countElement = document.getElementById('waitlistCount');
            if (countElement && data.count !== undefined) {
                countElement.textContent = data.count;
            }
        } catch (error) {
            console.error('Error fetching waitlist count:', error);
            const countElement = document.getElementById('waitlistCount');
            if (countElement) {
                countElement.textContent = '100+'; // Fallback
            }
        }
    }
    
    // Update count on page load
    updateWaitlistCount();
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const timestamp = new Date().toISOString();
        
        // Google Apps Script URL for your Google Sheet
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl73h1v6kwKHKwp6Y2hnFxQLX1dbka2TFmBjZSs14x-Q_mUv9y_7IwMgrSF_v5saGVHg/exec';
        
        try {
            // Send data directly to your Google Sheet
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            });
            
            // With no-cors mode, we can't read the response, so just assume success
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            // Update count after submission
            setTimeout(updateWaitlistCount, 1000);
            
        } catch (error) {
            console.error('Error submitting to waitlist:', error);
            alert('There was an error joining the waitlist. Please try again.');
        }
    });
    
    // Add input animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add a simple animation on page load
    const features = document.querySelectorAll('.feature');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    features.forEach(feature => {
        observer.observe(feature);
    });
    
    // Language Request Form Handler
    const languageForm = document.getElementById('languageRequestForm');
    const languageSuccessMessage = document.getElementById('languageSuccessMessage');
    
    if (languageForm) {
        languageForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form value
            const language = document.getElementById('language').value;
            
            
            try {
                // Send language request to Google Sheet
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'language_request',
                        language: language
                    })
                });
                
                // Show success message
                languageSuccessMessage.classList.add('show');
                
                // Reset form
                languageForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    languageSuccessMessage.classList.remove('show');
                }, 5000);
                
            } catch (error) {
                console.error('Error submitting language request:', error);
                alert('There was an error submitting your request. Please try again.');
            }
        });
    }
    
    // Add animation to textarea too
    const allInputs = document.querySelectorAll('input, textarea');
    allInputs.forEach(input => {
        if (!input.hasAttribute('data-animated')) {
            input.setAttribute('data-animated', 'true');
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        }
    });
});