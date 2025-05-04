// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle for new header
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-link, .join-now-btn').forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Add active class to current nav link
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        const sections = document.querySelectorAll('section, .hero');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.top-header').offsetHeight;
            
            if (window.scrollY >= sectionTop - headerHeight - 50) {
                currentSection = section.getAttribute('id') || (section.classList.contains('hero') ? 'home' : '');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if ((href === '#' && currentSection === 'home') || 
                (href === `#${currentSection}` && currentSection !== 'home')) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set active link on page load
    
    // Modal functionality
    const modal = document.getElementById('signupModal');
    const openModalBtn = document.getElementById('openSignupModal');
    const closeModal = document.querySelector('.close-modal');
    const signupForm = document.getElementById('signupForm');
    
    // Open modal
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling of background
        });
    }
    
    // Close modal on X click
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal on outside click
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }
    
    // Form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(signupForm);
            const userData = {};
            
            for (const [key, value] of formData.entries()) {
                userData[key] = value;
            }
            
            // Here you would typically send this data to your server or API
            console.log('User signed up:', userData);
            
            // Show success message
            signupForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                    <h3>Congratulations!</h3>
                    <p>You've successfully joined the CPA Ambassadors Challenge. Check your email for the next steps!</p>
                    <div class="success-badge">
                        <i class="fas fa-medal" style="font-size: 2rem; color: var(--bronze-color); margin: 1rem 0;"></i>
                        <p>You're on your way to becoming a Bronze Ambassador!</p>
                    </div>
                    <button class="cta-button full-width shine-effect" id="closeSuccessModal">Let's Go! <i class="fas fa-arrow-right"></i></button>
                </div>
            `;
            
            // Close modal on button click
            document.getElementById('closeSuccessModal').addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                
                // Scroll to offers section
                const offersSection = document.getElementById('offers');
                if (offersSection) {
                    const navbarHeight = document.querySelector('.top-header').offsetHeight;
                    window.scrollTo({
                        top: offersSection.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (for home link)
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed navbar height
                const navbarHeight = document.querySelector('.top-header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update offer links dynamically (replace with your actual CPALead affiliate links)
    const offerButtons = document.querySelectorAll('.offer-button');
    offerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Replace with your actual CPALead affiliate link or tracking system
            const affiliateBaseUrl = 'https://cpalead.com/your-affiliate-id/';
            const offerName = this.closest('.offer').querySelector('h3').innerText;
            const encodedOfferName = encodeURIComponent(offerName);
            
            // Show loading animation on button
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.style.pointerEvents = 'none';
            
            // Simulate loading time (remove in production)
            setTimeout(() => {
                // Open offer in new tab
                window.open(`${affiliateBaseUrl}?offer=${encodedOfferName}`, '_blank');
                
                // Reset button
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
                
                // Show confirmation tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'offer-tooltip';
                tooltip.innerHTML = '<i class="fas fa-check-circle"></i> Offer opened in new tab!';
                this.closest('.offer').appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    tooltip.classList.remove('show');
                    setTimeout(() => {
                        tooltip.remove();
                    }, 300);
                }, 3000);
            }, 800);
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .offer, .testimonial, .faq-item, .hero-content, .hero-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on page load
    
    // Dynamic countdown timer starting from 6d 23h 57m 58s
    function startCountdown() {
        const countdownElement = document.querySelector('.countdown');
        
        if (countdownElement) {
            // Start with initial values
            let days = 6;
            let hours = 23;
            let minutes = 57;
            let seconds = 58;
            
            // Update the countdown every 1 second
            const updateCountdown = function() {
                // Decrease seconds
                seconds--;
                
                // Handle time rollover
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        
                        if (hours < 0) {
                            hours = 23;
                            days--;
                            
                            if (days < 0) {
                                // Timer reached zero
                                clearInterval(countdownInterval);
                                countdownElement.innerHTML = "CHALLENGE ENDED!";
                                return;
                            }
                        }
                    }
                }
                
                // Display the result
                countdownElement.innerHTML = `<span class="time-unit">${days}d</span> <span class="time-unit">${hours}h</span> <span class="time-unit">${minutes}m</span> <span class="time-unit">${seconds}s</span>`;
            };
            
            // Call initially without delay
            updateCountdown();
            
            // Set up the interval for future updates
            const countdownInterval = setInterval(updateCountdown, 1000);
        }
    }
    
    startCountdown();
    
    // Create particle effects in hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        
        if (hero) {
            hero.appendChild(particlesContainer);
            
            // Create 50 particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 2px and 6px
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random opacity
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                // Random animation delay
                particle.style.animationDelay = `${Math.random() * 15}s`;
                
                // Floating animation
                particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
                
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    createParticles();
    
    // Enhance offer filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const offerItems = document.querySelectorAll('.offer');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter offers
            offerItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) rotateX(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) rotateX(10deg)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add parallax scroll effect
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .hero-image, .usa-stars');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('hero-content') ? 0.5 : 
                         element.classList.contains('hero-image') ? -0.2 : 0.3;
            
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxScroll);
    
    // Add tilt effect to cards
    const tiltElements = document.querySelectorAll('.offer, .step');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateY = (xPercent - 0.5) * 10;
            const rotateX = (0.5 - yPercent) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add floating animation to FAQ questions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        
        // Toggle FAQ answers
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'all 0.3s ease';
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.maxHeight !== '0px';
                
                // Close all answers
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer && otherItem !== item) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current answer
                if (isOpen) {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    item.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Show header background on scroll
    function headerScroll() {
        const header = document.querySelector('.top-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', headerScroll);
    headerScroll(); // Check on page load
}); 