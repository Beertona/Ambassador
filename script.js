// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle for new header
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function() {
            headerNav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-link, .nav-cta').forEach(item => {
            item.addEventListener('click', function() {
                headerNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Add active class to current nav link
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        const sections = document.querySelectorAll('section, .hero');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.usa-header').offsetHeight;
            
            if (window.scrollY >= sectionTop - headerHeight - 50) {
                currentSection = section.getAttribute('id') || (section.classList.contains('hero') ? 'home' : '');
            }
        });
        
        navLinks.forEach(link => {
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
                    const navbarHeight = document.querySelector('.usa-header').offsetHeight;
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
                const navbarHeight = document.querySelector('.usa-header').offsetHeight;
                
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
    
    // Offer filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const offers = document.querySelectorAll('.offer');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.dataset.filter;
            
            // Show/hide offers based on filter
            offers.forEach(offer => {
                if (filterValue === 'all' || offer.dataset.category === filterValue) {
                    offer.style.display = 'block';
                    // Add fade-in animation
                    offer.classList.remove('fade-in');
                    void offer.offsetWidth; // Trigger reflow
                    offer.classList.add('fade-in');
                } else {
                    offer.style.display = 'none';
                }
            });
        });
    });
    
    // Animation for elements as they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .offer, .testimonial, .faq-item, .leaderboard-row');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Call on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Call on initial load
    
    // Add active class to nav links based on scroll position
    const highlightNavOnScroll = function() {
        const sections = document.querySelectorAll('section, header.hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.usa-header').offsetHeight;
            
            // Get the corresponding nav link
            let navLink = null;
            if (section.id) {
                navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            } else if (section.classList.contains('hero')) {
                navLink = document.querySelector(`.nav-link[href="#"]`);
            }
            
            // Check if we're in the section
            if (window.scrollY >= sectionTop - headerHeight - 100 && 
                window.scrollY < sectionTop + sectionHeight - headerHeight) {
                // Add active class to nav link
                if (navLink) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    };
    
    // Call on scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Call on initial load
    
    // Countdown timer for urgency
    function startCountdown() {
        const countdownElement = document.querySelector('.countdown');
        if (!countdownElement) return;
        
        // Set countdown for 3 days from now
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3);
        
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "Challenge Started!";
            }
        }, 1000);
    }
    
    // Create star elements in USA stars containers
    function createStars() {
        const starsContainers = document.querySelectorAll('.usa-stars');
        
        starsContainers.forEach(container => {
            // Create 20 stars in each container
            for (let i = 0; i < 20; i++) {
                const star = document.createElement('span');
                star.className = 'usa-star';
                star.textContent = '★';
                star.style.position = 'absolute';
                star.style.opacity = Math.random() * 0.3 + 0.1;
                star.style.fontSize = Math.random() * 15 + 10 + 'px';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 215, 0, 0.3)';
                
                container.appendChild(star);
            }
        });
    }
    
    // Call function to create stars
    createStars();
    
    // Initialize countdown timer
    startCountdown();
    
    // Add CSS class to style tooltip
    const style = document.createElement('style');
    style.textContent = `
        .offer-tooltip {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: var(--success-color);
            color: white;
            padding: 8px 16px;
            border-radius: 30px;
            font-size: 0.9rem;
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 10;
        }
        
        .offer-tooltip.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        .offer-tooltip i {
            margin-right: 5px;
        }
        
        .success-badge {
            background: rgba(67, 97, 238, 0.05);
            padding: 1rem;
            border-radius: var(--border-radius);
            margin-bottom: 1.5rem;
        }
        
        .menu-toggle.active i:before {
            content: "\\f00d";
        }
    `;
    document.head.appendChild(style);
}); 