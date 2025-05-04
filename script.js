// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Reward tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const rewardContents = document.querySelectorAll('.reward-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Hide all content sections
            rewardContents.forEach(content => content.classList.remove('active'));
            
            // Show relevant content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            parent.classList.toggle('active');
            
            // Toggle icon
            const icon = question.querySelector('i');
            if (icon) {
                if (parent.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });

    // Live countdown timer for "next payout"
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        let minutes = 12;
        let seconds = 34;

        const updateCountdown = () => {
            seconds--;
            
            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }
            
            if (minutes < 0) {
                // Reset the timer when it reaches 0
                minutes = Math.floor(Math.random() * 10) + 5;
                seconds = Math.floor(Math.random() * 60);
            }
            
            countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };
        
        // Update every second
        setInterval(updateCountdown, 1000);
    }

    // Mystery box animation
    const mysteryBox = document.querySelector('.box');
    if (mysteryBox) {
        mysteryBox.addEventListener('mouseenter', () => {
            mysteryBox.classList.add('shake');
        });
        
        mysteryBox.addEventListener('mouseleave', () => {
            mysteryBox.classList.remove('shake');
        });
        
        mysteryBox.addEventListener('click', () => {
            const rewards = ['$5', '$10', '$25', '$50', '$100', '$500', 'Netflix Subscription', 'AirPods', 'Gift Card'];
            const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
            
            mysteryBox.innerHTML = `<span class="reward-reveal">${randomReward}</span>`;
            mysteryBox.classList.add('opened');
            
            // Show a modal or notification
            setTimeout(() => {
                alert(`Congratulations! You found ${randomReward}! Sign up now to claim your reward.`);
                
                // Reset the box after a delay
                setTimeout(() => {
                    mysteryBox.innerHTML = '<span class="question-mark">?</span><div class="box-hover"><p>Click to open! Could be $5... or $500!</p></div>';
                    mysteryBox.classList.remove('opened');
                }, 2000);
            }, 500);
        });
    }

    // Create fake live feed updates
    const feedItems = document.querySelector('.feed-items');
    if (feedItems) {
        const states = ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
        const names = ['Jennifer', 'Mike', 'Sarah', 'David', 'Emma', 'John', 'Lisa', 'Alex', 'Maria', 'James'];
        const rewards = [
            '$25', '$50', '$75', '$100', '$150', 
            'AirPods', 'PlayStation Plus', 'Netflix Subscription', 
            'Spotify Premium', 'Amazon Gift Card', 'Starbucks Card'
        ];
        
        const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
        
        // Add a new feed item every few seconds
        setInterval(() => {
            const newItem = document.createElement('div');
            newItem.classList.add('feed-item', 'new-item');
            
            const randomName = getRandomElement(names);
            const randomState = getRandomElement(states);
            const randomReward = getRandomElement(rewards);
            
            // Random emoji based on reward
            let emoji = '💰';
            if (randomReward.includes('AirPods')) emoji = '🎧';
            else if (randomReward.includes('PlayStation')) emoji = '🎮';
            else if (randomReward.includes('Netflix')) emoji = '📺';
            else if (randomReward.includes('Spotify')) emoji = '🎵';
            else if (randomReward.includes('Gift Card')) emoji = '🎁';
            else if (randomReward.includes('Starbucks')) emoji = '☕';
            
            newItem.innerHTML = `
                <img src="https://via.placeholder.com/40x40" alt="User Avatar">
                <div class="feed-content">
                    <p>${emoji} ${randomName} (${randomState}) just claimed ${randomReward}!</p>
                    <span class="timestamp">Just now</span>
                </div>
            `;
            
            // Insert at the top
            feedItems.insertBefore(newItem, feedItems.firstChild);
            
            // Update timestamps
            const timestamps = feedItems.querySelectorAll('.timestamp');
            timestamps.forEach((timestamp, index) => {
                if (index === 0) {
                    timestamp.textContent = 'Just now';
                } else if (index === 1) {
                    timestamp.textContent = '1 minute ago';
                } else if (index > 1) {
                    timestamp.textContent = `${index} minutes ago`;
                }
            });
            
            // Remove excess items
            if (feedItems.children.length > 6) {
                feedItems.removeChild(feedItems.lastChild);
            }
            
            // Highlight the new item
            setTimeout(() => {
                newItem.classList.remove('new-item');
            }, 2000);
        }, 8000); // Add a new winner every 8 seconds
    }

    // Form submission event listener
    const joinForm = document.querySelector('.join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = joinForm.querySelector('input[type="text"]');
            const emailInput = joinForm.querySelector('input[type="email"]');
            const stateInput = joinForm.querySelectorAll('input[type="text"]')[1];
            
            // Basic validation
            if (nameInput.value && emailInput.value && stateInput.value) {
                alert(`Welcome to The Cash Quest, ${nameInput.value}! Your adventure begins now. Check your email (${emailInput.value}) for your first reward!`);
                
                // Show a success message or redirect
                const joinContent = document.querySelector('.join-content');
                if (joinContent) {
                    joinContent.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h2>Congratulations, ${nameInput.value}!</h2>
                            <p>Your Cash Quest adventure has begun. Check your email for instructions on claiming your first reward!</p>
                            <p class="bonus-alert">🎁 BONUS: We've added 5 Coins to your account for signing up today!</p>
                        </div>
                    `;
                }
                
                // Decrease spots left count
                const spotsLeft = document.querySelector('.spots-left p span');
                if (spotsLeft) {
                    const currentSpots = parseInt(spotsLeft.textContent) - 1;
                    spotsLeft.textContent = `${currentSpots} spots left`;
                    
                    if (currentSpots <= 1) {
                        document.querySelector('.spots-left p').innerHTML = `<span class="highlight urgent">LAST SPOT</span> in your state. Hurry!`;
                    }
                }
            }
        });
    }

    // Simulating spots left countdown
    const spotsLeftElement = document.querySelector('.spots-left span');
    if (spotsLeftElement) {
        const initialSpots = 3;
        let currentSpots = initialSpots;
        
        // Randomly decrease spots every so often
        const spotInterval = setInterval(() => {
            if (Math.random() > 0.7 && currentSpots > 1) {
                currentSpots--;
                spotsLeftElement.textContent = `${currentSpots} spots left`;
                
                if (currentSpots === 1) {
                    document.querySelector('.spots-left p').innerHTML = `<span class="highlight urgent">LAST SPOT</span> in your state. Hurry!`;
                    clearInterval(spotInterval);
                }
            }
        }, 25000); // Every 25 seconds, 30% chance
    }

    // Initialize progress bars animation when they come into view
    const progressBars = document.querySelectorAll('.progress');
    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            if (isInViewport(bar)) {
                const width = bar.parentElement.getAttribute('data-width') || bar.style.width || '40%';
                bar.style.width = '0%';
                
                // Trigger animation after a small delay for better visual effect
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    };
    
    // Set initial progress bar widths for the leaderboard
    const initializeLeaderboard = () => {
        const leaderboardBars = document.querySelectorAll('.leaderboard-item .progress');
        
        leaderboardBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    };
    
    // Listen for scroll to animate progress bars
    window.addEventListener('scroll', animateProgressBars);
    
    // Initialize on page load
    animateProgressBars();
    initializeLeaderboard();

    // Add notification badges to attract more attention
    const createNotificationBadge = () => {
        const badge = document.createElement('div');
        badge.classList.add('notification-badge');
        
        const randomReward = ['$25', '$50', 'AirPods', 'Netflix Subscription'][Math.floor(Math.random() * 4)];
        
        badge.innerHTML = `
            <div class="notification-content">
                <p>Someone just claimed ${randomReward}!</p>
                <span class="notification-close">×</span>
            </div>
        `;
        
        document.body.appendChild(badge);
        
        setTimeout(() => {
            badge.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            badge.classList.remove('show');
            setTimeout(() => {
                badge.remove();
            }, 500);
        }, 4000);
        
        // Close button functionality
        const closeBtn = badge.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            badge.classList.remove('show');
            setTimeout(() => {
                badge.remove();
            }, 500);
        });
    };
    
    // Show notification every 45-90 seconds
    const notificationInterval = setInterval(() => {
        createNotificationBadge();
    }, Math.random() * (90000 - 45000) + 45000);
    
    // Show first notification after 20 seconds
    setTimeout(createNotificationBadge, 20000);
}); 