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
                    email: email,
                    language: window.selectedLanguage || 'Unknown'
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
    
    // Language Selection Handler
    const languageGrid = document.getElementById('languageGrid');
    const languageSection = document.getElementById('languageSection');
    const waitlistForm = document.querySelector('.waitlist-form');
    
    // Language data with flag emojis and counts
    const languages = [
        { name: 'Spanish', flag: '🇪🇸', count: 234 },
        { name: 'French', flag: '🇫🇷', count: 189 },
        { name: 'Chinese', flag: '🇨🇳', count: 156 },
        { name: 'Latin', flag: '🏛️', count: 142 }
    ];
    
    // Function to fetch and display languages
    async function displayLanguages() {
        try {
            const languageGrid = document.getElementById('languageGrid');
            languageGrid.innerHTML = '';
            
            // Sort by count and get max for percentage calculation
            const sortedLanguages = languages.sort((a, b) => b.count - a.count);
            const maxCount = sortedLanguages[0].count;
            
            sortedLanguages.forEach(language => {
                const percentage = (language.count / maxCount) * 100;
                
                const languageItem = document.createElement('div');
                languageItem.className = 'language-item';
                languageItem.innerHTML = `
                    <div class="language-content">
                        <div class="language-info">
                            <span class="flag">${language.flag}</span>
                            <span class="language-name">${language.name}</span>
                        </div>
                        <span class="language-count">${language.count} interested</span>
                    </div>
                    <div class="language-bar">
                        <div class="language-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                `;
                
                languageItem.addEventListener('click', () => {
                    selectLanguage(language.name);
                });
                
                languageGrid.appendChild(languageItem);
            });
            
            // Add "Other" option
            const otherItem = document.createElement('div');
            otherItem.className = 'language-item other-language';
            otherItem.innerHTML = `
                <div class="language-content">
                    <div class="language-info">
                        <span class="flag">✍️</span>
                        <span class="language-name">Other</span>
                    </div>
                    <span class="language-count">Request</span>
                </div>
                <div class="language-bar">
                    <div class="language-bar-fill other-bar" style="width: 100%"></div>
                </div>
            `;
            
            otherItem.addEventListener('click', () => {
                showLanguageRequestForm();
            });
            
            languageGrid.appendChild(otherItem);
            
        } catch (error) {
            console.error('Error loading languages:', error);
            const languageGrid = document.getElementById('languageGrid');
            languageGrid.innerHTML = '<div class="error">Error loading languages. Please refresh the page.</div>';
        }
    }
    
    // Function to handle language selection
    function selectLanguage(languageName) {
        // Hide the language section
        languageSection.style.display = 'none';
        
        // Show the waitlist form
        waitlistForm.style.display = 'block';
        
        // Update the form title to include selected language
        const formTitle = waitlistForm.querySelector('h3');
        formTitle.textContent = `Get Early Access - ${languageName}`;
        
        // Store selected language for form submission
        window.selectedLanguage = languageName;
    }
    
    // Function to show language request form
    function showLanguageRequestForm() {
        // Hide the language selection
        languageSection.style.display = 'none';
        
        // Show the language request form
        const languageRequestSection = document.getElementById('languageRequestSection');
        languageRequestSection.style.display = 'block';
    }
    
    // Handle language request form submission
    const languageRequestForm = document.getElementById('languageRequestForm');
    const languageSuccessMessage = document.getElementById('languageSuccessMessage');
    
    if (languageRequestForm) {
        languageRequestForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form value
            const language = document.getElementById('languageInput').value;
            
            try {
                // Send language request to separate Google Sheet
                const LANGUAGE_REQUEST_URL = 'https://script.google.com/macros/s/AKfycbz7rO-0vr0AH1HgBARHfQfoi5MoNnoNIk9KWsnKYQMP5II81IF_I9vdHXEod0itL7q9zg/exec';
                const response = await fetch(LANGUAGE_REQUEST_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        language: language,
                        timestamp: new Date().toISOString()
                    })
                });
                
                // Show success message
                languageSuccessMessage.classList.add('show');
                
                // Reset form
                languageRequestForm.reset();
                
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
    
    // Function to fetch and display requested languages from Google Sheet
    async function displayRequestedLanguages() {
        try {
            const LANGUAGE_REQUEST_URL = 'https://script.google.com/macros/s/AKfycbz7rO-0vr0AH1HgBARHfQfoi5MoNnoNIk9KWsnKYQMP5II81IF_I9vdHXEod0itL7q9zg/exec';
            const response = await fetch(LANGUAGE_REQUEST_URL + '?action=getLanguages');
            const requestedLanguages = await response.json();
            
            const requestedLanguageList = document.getElementById('requestedLanguageList');
            requestedLanguageList.innerHTML = '';
            
            if (requestedLanguages.length === 0) {
                requestedLanguageList.innerHTML = '<div class="no-requests">No languages requested yet. Be the first!</div>';
                return;
            }
            
            requestedLanguages.forEach(language => {
                const languageItem = document.createElement('div');
                languageItem.className = 'requested-language-item';
                languageItem.innerHTML = `
                    <div class="language-content">
                        <span class="language-name">${language.name}</span>
                        <span class="language-count">${language.count} ${language.count === 1 ? 'request' : 'requests'}</span>
                    </div>
                `;
                
                languageItem.addEventListener('click', () => {
                    selectLanguage(language.name);
                    // Also hide the requested languages section
                    document.getElementById('requestedLanguagesSection').style.display = 'none';
                });
                
                requestedLanguageList.appendChild(languageItem);
            });
            
        } catch (error) {
            console.error('Error loading requested languages:', error);
            const requestedLanguageList = document.getElementById('requestedLanguageList');
            requestedLanguageList.innerHTML = '<div class="error">Error loading requested languages.</div>';
        }
    }
    
    // Load languages on page load
    displayLanguages();
    
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