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

    // Countdown timer for flash offer
    const flashTimerElement = document.getElementById('countdown-timer');
    if (flashTimerElement) {
        let minutes = 29;
        let seconds = 59;
        
        const updateFlashTimer = () => {
            seconds--;
            
            if (seconds < 0) {
                minutes--;
                seconds = 59;
            }
            
            if (minutes < 0) {
                // Reset to 30 minutes when it reaches 0
                minutes = 29;
                seconds = 59;
            }
            
            flashTimerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Add urgency color when time is running low
            if (minutes < 5) {
                flashTimerElement.style.color = '#ff3d00';
                flashTimerElement.classList.add('urgent');
            } else {
                flashTimerElement.style.color = '';
                flashTimerElement.classList.remove('urgent');
            }
        };
        
        // Update every second
        setInterval(updateFlashTimer, 1000);
    }

    // Enhanced mystery box rewards with better prizes
    const mysteryBox = document.querySelector('.box');
    if (mysteryBox) {
        mysteryBox.addEventListener('mouseenter', () => {
            mysteryBox.classList.add('shake');
        });
        
        mysteryBox.addEventListener('mouseleave', () => {
            mysteryBox.classList.remove('shake');
        });
        
        mysteryBox.addEventListener('click', () => {
            // American-themed rewards
            const rewards = [
                '$5 Cash', 
                '$10 Cash', 
                '$25 Cash', 
                '$50 Cash', 
                '$100 Cash',
                '$500 Cash', 
                'Netflix Subscription', 
                'AirPods', 
                'Amazon Gift Card',
                'Starbucks Card',
                'PS5 Raffle Entry',
                '2x Coins Multiplier'
            ];
            
            const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
            
            mysteryBox.innerHTML = `<span class="reward-reveal">${randomReward}</span>`;
            mysteryBox.classList.add('opened');
            
            // Show a modal or notification
            setTimeout(() => {
                alert(`Congratulations! You found ${randomReward}! Sign up now to claim your reward.`);
                
                // Reset the box after a delay
                setTimeout(() => {
                    mysteryBox.innerHTML = '<span class="question-mark">?</span><div class="glow"></div><div class="box-hover"><p>Click to open! Could be $5... or $500!</p></div>';
                    mysteryBox.classList.remove('opened');
                }, 2000);
            }, 500);
        });
    }

    // Enhanced live feed with more American names and states
    const feedItems = document.querySelector('.feed-items');
    if (feedItems) {
        const states = ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI', 'VA', 'WA', 'AZ', 'CO', 'TN'];
        const names = [
            'Jennifer', 'Mike', 'Sarah', 'David', 'Emma', 'John', 'Lisa', 'Alex', 'Maria', 'James',
            'Jessica', 'Christopher', 'Ashley', 'Matthew', 'Amanda', 'Daniel', 'Stephanie', 'Kevin', 'Melissa', 'Justin'
        ];
        const rewards = [
            '$25', '$50', '$75', '$100', '$150', 
            'AirPods', 'PlayStation Plus', 'Netflix Subscription', 
            'Spotify Premium', 'Amazon Gift Card', 'Starbucks Card',
            '$10 PayPal', '$15 CashApp', '$20 Venmo', '$30 Amazon'
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
                
                // Mark "Sign Up" step as completed
                const signUpStep = document.querySelector('.progress-step:first-child');
                if (signUpStep) {
                    signUpStep.classList.add('completed');
                    
                    // Also mark the first connector as active
                    const firstConnector = document.querySelector('.progress-connector:first-child');
                    if (firstConnector) {
                        firstConnector.classList.add('active');
                    }
                    
                    // Make the "Complete Offer" step active
                    const completeOfferStep = document.querySelector('.progress-step:nth-child(3)');
                    if (completeOfferStep) {
                        completeOfferStep.classList.add('active');
                    }
                }
                
                // Change the first card game description
                const firstCardDescription = document.getElementById('first-card-description');
                if (firstCardDescription) {
                    firstCardDescription.textContent = 'Complete this exclusive offer now!';
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

    // Add animation to buttons
    const animateButtons = () => {
        const ctaButtons = document.querySelectorAll('.btn-animated');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.classList.add('hover');
            });
            
            button.addEventListener('mouseout', () => {
                button.classList.remove('hover');
            });
        });
    };
    
    animateButtons();

    // Initialize the payment modal
    initPaymentModal();
    
    // Initialize the offers requirement modal
    initOffersRequirementModal();
});

document.addEventListener('DOMContentLoaded', function() {
    // Geotargeting and State-specific content
    initGeotargeting();
    initWinnerFeed();
    initCountdowns();
    initFAQToggle();
    initTabSwitching();
    setupSmartLinks();
    
    // Handle email form submission to navigate to rewards section
    const emailForm = document.getElementById('email-capture-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save email for potential later use
            const email = emailForm.querySelector('input[type="email"]').value;
            sessionStorage.setItem('user_email', email);
            
            // Create success notification
            const formContainer = emailForm.parentElement;
            const notification = document.createElement('div');
            notification.className = 'success-notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Great! Now complete an offer below to claim your reward.</p>
            `;
            
            // Replace form with confirmation
            emailForm.style.display = 'none';
            formContainer.appendChild(notification);
            
            // Mark "Sign Up" step as completed
            const signUpStep = document.querySelector('.progress-step:first-child');
            if (signUpStep) {
                signUpStep.classList.add('completed');
                
                // Also mark the first connector as active
                const firstConnector = document.querySelector('.progress-connector:first-child');
                if (firstConnector) {
                    firstConnector.classList.add('active');
                }
            }
            
            // Change the first card game description
            const firstCardDescription = document.getElementById('first-card-description');
            if (firstCardDescription) {
                firstCardDescription.textContent = 'Complete this exclusive offer now!';
            }
            
            // Scroll to rewards section
            const rewardsSection = document.getElementById('rewards');
            if (rewardsSection) {
                setTimeout(() => {
                    rewardsSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight the first reward card
                    setTimeout(() => {
                        const firstRewardCard = document.querySelector('.reward-card');
                        if (firstRewardCard) {
                            firstRewardCard.classList.add('highlighted');
                            
                            // Remove highlight after animation
                            setTimeout(() => {
                                firstRewardCard.classList.remove('highlighted');
                            }, 3000);
                        }
                    }, 1000);
                }, 1500);
            }
        });
    }
    
    // Initialize the offers requirement modal functionality
    const claimRewardBtn = document.getElementById('claim-reward-btn');
    const offersModal = document.getElementById('offers-required-modal');
    
    // Track clicks on offer links
    const trackOfferClicks = () => {
        const offerLinks = document.querySelectorAll('.btn-secondary');
        
        offerLinks.forEach(link => {
            // No need to do anything here as links now go directly to SoFi
            console.log('Offer link initialized');
        });
    };
    
    // Initialize tracking
    trackOfferClicks();
    
    // Show modal when clicking the claim reward button
    if (claimRewardBtn && offersModal) {
        claimRewardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            offersModal.style.display = 'block';
            document.body.classList.add('modal-open');
            
            // Set initial offers progress
            updateOffersProgress(0);
        });
        
        // Close modal when clicking the X button
        const closeModalBtn = offersModal.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                offersModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            });
        }
        
        // Close modal when clicking the return button
        const returnToOffersBtn = document.getElementById('offers-return-btn');
        if (returnToOffersBtn) {
            returnToOffersBtn.addEventListener('click', function() {
                offersModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                
                // Scroll to rewards section
                const rewardsSection = document.getElementById('rewards');
                if (rewardsSection) {
                    rewardsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // Handle mini offer completion
        let completedOffers = 0;
        const miniOfferButtons = offersModal.querySelectorAll('.mini-offer .btn-secondary');
        
        miniOfferButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                // We'll still keep the navigation to SoFi, but track the click
                
                // Get the parent offer
                const miniOffer = btn.closest('.mini-offer');
                
                if (miniOffer && !miniOffer.classList.contains('completed')) {
                    // Mark the offer as completed visually
                    miniOffer.classList.add('completed');
                    
                    // Increment completed offers count
                    completedOffers++;
                    
                    // Update progress display
                    updateOffersProgress(completedOffers);
                    
                    // If all offers completed, show a success message
                    if (completedOffers >= 3) {
                        // Create a temporary success message
                        const successMsg = document.createElement('div');
                        successMsg.className = 'all-offers-completed';
                        successMsg.innerHTML = `
                            <div class="success-content">
                                <i class="fas fa-check-circle"></i>
                                <h3>All Offers Completed!</h3>
                                <p>Redirecting to complete your reward...</p>
                            </div>
                        `;
                        
                        // Add it to the modal
                        const modalBody = offersModal.querySelector('.modal-body');
                        if (modalBody) {
                            modalBody.innerHTML = '';
                            modalBody.appendChild(successMsg);
                            
                            // Set a timeout to navigate to SoFi
                            setTimeout(function() {
                                window.location.href = 'https://smrturl.co/4b97015';
                            }, 2000);
                        }
                    }
                }
            });
        });
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target === offersModal) {
                offersModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }
});

// Geotargeting and state rivalry functionality
function initGeotargeting() {
    // In a real implementation, this would use a geolocation API
    // For this demo, we'll simulate it
    const states = ['TX', 'CA', 'FL', 'NY', 'OH', 'PA', 'GA'];
    const userState = states[Math.floor(Math.random() * states.length)];
    
    // Get rival state (next in the list or first if at end)
    const currentIndex = states.indexOf(userState);
    const rivalState = states[(currentIndex + 1) % states.length];
    
    // Update all state references
    document.getElementById('visitor-state').textContent = userState;
    document.querySelectorAll('.state-name').forEach(el => {
        el.textContent = userState;
    });
    document.querySelectorAll('.your-state, .your-state-name').forEach(el => {
        el.textContent = userState;
    });
    
    // Update rival state references
    document.getElementById('rival-state').textContent = rivalState;
    document.getElementById('rival-state-2').textContent = rivalState;
    document.getElementById('rival-state-3').textContent = rivalState;
    document.getElementById('rival-state-name').textContent = rivalState;
    
    // Update state users count with a random number
    const stateUsers = 3000 + Math.floor(Math.random() * 2000);
    document.getElementById('state-users-paid').textContent = stateUsers.toLocaleString();
    
    // Randomize spots left (between 1-12)
    const spotsLeft = 1 + Math.floor(Math.random() * 12);
    document.getElementById('spots-left').textContent = spotsLeft;
    document.getElementById('countdown-spots').textContent = spotsLeft;
}

// Dynamic winner feed
function initWinnerFeed() {
    const winnerStates = ['TX', 'CA', 'FL', 'NY', 'OH', 'PA', 'GA', 'NC', 'MI', 'AZ'];
    const names = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 
                  'William', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah', 'Thomas', 'Karen', 'Charles', 'Nancy'];
    const offerNames = ['Quick Survey', 'App Install', 'Friend Invite', 'Video Watch', 'Sign Up Bonus', 'Game Trial', 'Newsletter Signup'];
    const rewards = ['$5', '$10', '$15', '$25', '$50', '$75', '$100', 'PlayStation Plus', 'AirPods', 'Amazon Gift Card'];
    const ctaTexts = ['You\'re Next!', 'Try it!', 'Your Turn!', 'Claim Yours!', 'Don\'t Miss Out!'];
    
    // Rotate winner feed every 30 seconds
    setInterval(function() {
        const winners = document.getElementById('dynamic-winner-feed');
        const newWinner = document.createElement('div');
        newWinner.className = 'feed-item';
        
        // Random data
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomState = winnerStates[Math.floor(Math.random() * winnerStates.length)];
        const randomOffer = offerNames[Math.floor(Math.random() * offerNames.length)];
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        const randomCTA = ctaTexts[Math.floor(Math.random() * ctaTexts.length)];
        
        // Determine gender for the avatar based on the name (simplified approach)
        const maleNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles'];
        const isMale = maleNames.includes(randomName);
        const genderClass = isMale ? 'male' : 'female';
        
        newWinner.innerHTML = `
            <div class="avatar-icon ${genderClass}">
                <i class="fas fa-user"></i>
            </div>
            <div class="feed-content">
                <p>⚡️ ${randomName} (<span class="winner-state">${randomState}</span>) won ${randomReward} via <span class="offer-name">${randomOffer}</span> → <span class="highlight">${randomCTA}</span></p>
                <span class="timestamp">Just now</span>
            </div>
        `;
        
        // Add new winner to the top
        winners.insertBefore(newWinner, winners.firstChild);
        
        // Remove oldest winner if there are more than 3
        if (winners.children.length > 3) {
            winners.removeChild(winners.lastChild);
        }
        
        // Update timestamps for all winners
        const timestamps = winners.querySelectorAll('.timestamp');
        timestamps[1].textContent = '2 minutes ago';
        timestamps[2].textContent = '5 minutes ago';
    }, 30000);
}

// Countdowns
function initCountdowns() {
    // Flash reward countdown
    let timerMinutes = 30;
    let timerSeconds = 0;
    
    setInterval(function() {
        if (timerSeconds === 0) {
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        
        // If countdown reaches zero, reset to 30 minutes
        if (timerMinutes < 0) {
            timerMinutes = 30;
            timerSeconds = 0;
        }
        
        // Update timer display
        const display = document.getElementById('countdown-timer');
        if (display) {
            display.textContent = `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
        }
        
        // Next payout countdown
        const nextPayoutMin = Math.floor(Math.random() * 12) + 1;
        const nextPayoutSec = Math.floor(Math.random() * 60);
        const countdownEl = document.querySelector('.countdown');
        if (countdownEl) {
            countdownEl.textContent = `${nextPayoutMin}:${nextPayoutSec.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// FAQ accordion
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            
            // Toggle the active class
            this.classList.toggle('active');
            
            // Toggle the display of the answer
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Tab switching for rewards
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.reward-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the corresponding content
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Show post-offer flow after form submission or smart link click
function showPostOfferFlow() {
    // Hide the join section
    document.getElementById('join-now').style.display = 'none';
    
    // Show the post-offer flow
    document.getElementById('post-offer-flow').style.display = 'block';
    
    // Scroll to post-offer flow
    document.getElementById('post-offer-flow').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Set random queue position (10-50)
    const queuePosition = 10 + Math.floor(Math.random() * 40);
    document.getElementById('queue-position').textContent = queuePosition;
}

// Smart Link integration
function setupSmartLinks() {
    // In a real integration, these would be actual AdBluemedia tracking links
    // For this demo, we'll just use the showPostOfferFlow function
    document.querySelectorAll('a[href="{smart_link}"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPostOfferFlow();
        });
    });
}

// Social sharing functions
function shareToTikTok() {
    // In a real implementation, this would open TikTok with pre-filled content
    alert('TikTok sharing would open here with pre-filled content');
}

function shareToInstagram() {
    // In a real implementation, this would open Instagram with pre-filled content
    alert('Instagram sharing would open here with pre-filled content');
}

function shareToTwitter() {
    // In a real implementation, this would open Twitter with pre-filled content
    const baseText = "I thought this was a scam but I just got $15 sent to my PayPal in 5 minutes?! 😳 [STATE] people check this out before spots fill up! #CashQuest #FreeMoney";
    const url = "https://cashquest.example.com/?ref=twitter";
    
    // Replace [STATE] with user's state
    const userState = document.getElementById('visitor-state').textContent;
    const tweetText = baseText.replace('[STATE]', userState);
    
    // Encode for URL
    const encodedText = encodeURIComponent(tweetText);
    const encodedUrl = encodeURIComponent(url);
    
    // Open Twitter intent URL
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
}

// PayPal Email Collection Modal Functionality
function initPaymentModal() {
    const modal = document.getElementById('paypal-modal');
    const openModalBtn = document.getElementById('open-payment-modal');
    const paymentButtons = document.querySelectorAll('a[href="https://smrturl.co/4b97015"]');
    const offerButtons = document.querySelectorAll('.complete-offer');
    const closeModalBtn = document.querySelector('.close-modal');
    const paymentForm = document.getElementById('payment-form');
    
    let currentOfferDetails = {
        title: '',
        reward: '',
        image: ''
    };

    // Also handle the dedicated payment modal button
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        });
    }

    // Keep the close modal handlers
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    // Keep form submission handler
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('paypal-email').value;
            const paymentMethod = document.getElementById('payment-method').value;

            // Show success message
            const formContent = paymentForm.innerHTML;
            paymentForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle success-icon"></i>
                    <h3>Offer Completed Successfully!</h3>
                    <p>We'll send your ${currentOfferDetails.title || 'reward'} to ${email} via ${paymentMethod} within 24 hours.</p>
                    <p class="small">Reference #: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
            `;

            // Close modal after a delay
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                
                // Show completion notification
                showCompletionNotification(currentOfferDetails.title || 'Offer');
                
                // Reset form for future use
                setTimeout(() => {
                    paymentForm.innerHTML = formContent;
                }, 1000);
            }, 3000);
        });
    }
}

// Show a notification after offer completion
function showCompletionNotification(offerTitle) {
    console.log('Offer completed: ' + offerTitle);
    // This is a minimal implementation for the function
    // The actual notification feature was removed to enable direct links
}

// Update the progress tracker to show completed offer
function updateProgressTracker() {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressConnectors = document.querySelectorAll('.progress-connector');
    
    if (progressSteps.length >= 3 && progressConnectors.length >= 2) {
        // Complete step 2
        progressSteps[1].classList.remove('active');
        progressSteps[1].classList.add('completed');
        
        // Activate step 3
        progressSteps[2].classList.add('active');
        
        // Connect steps 2 and 3
        progressConnectors[1].classList.add('active');
        
        // Scroll to reward progress to show the user their progress
        const rewardProgress = document.querySelector('.reward-progress');
        if (rewardProgress) {
            rewardProgress.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show congratulations message
            setTimeout(() => {
                showCongratulationsMessage();
            }, 1000);
        }
    }
}

// Show congratulations message after completing an offer
function showCongratulationsMessage() {
    // Check if congratulations message already exists
    if (document.querySelector('.congrats-message')) {
        return;
    }
    
    // Create congratulations message
    const congratsMessage = document.createElement('div');
    congratsMessage.className = 'congrats-message';
    congratsMessage.innerHTML = `
        <div class="congrats-content">
            <i class="fas fa-check-circle"></i>
            <h3>Congratulations!</h3>
            <p>You've completed your offer successfully. Your reward is being processed.</p>
            <p class="payment-info">Your payment will be sent to your provided details within 24 hours.</p>
            <div class="next-steps">
                <p>While you wait, why not:</p>
                <ul>
                    <li>Complete another offer to earn more rewards</li>
                    <li>Invite friends to earn referral bonuses</li>
                    <li>Check your email for confirmation details</li>
                </ul>
            </div>
        </div>
    `;
    
    // Insert after reward progress
    const rewardProgress = document.querySelector('.reward-progress');
    if (rewardProgress && rewardProgress.parentNode) {
        rewardProgress.parentNode.insertBefore(congratsMessage, rewardProgress.nextSibling);
        
        // Animate in
        setTimeout(() => {
            congratsMessage.classList.add('show');
        }, 100);
    }
}

// Handle the offers requirement modal
function initOffersRequirementModal() {
    const modal = document.getElementById('offers-required-modal');
    const claimRewardBtn = document.getElementById('claim-reward-btn');
    const closeModalBtn = modal ? modal.querySelector('.close-modal') : null;
    const returnToOffersBtn = document.getElementById('offers-return-btn');
    
    // Track completed offers count
    let completedOffers = 0;
    
    // Open modal when clicking the claim reward button
    if (claimRewardBtn && modal) {
        claimRewardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            
            // Update the offers progress display
            updateOffersProgress();
        });
    }
    
    // Close modal when clicking the X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    }
    
    // Close modal when clicking the return button
    if (returnToOffersBtn) {
        returnToOffersBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            
            // Scroll to rewards section
            const rewardsSection = document.getElementById('rewards');
            if (rewardsSection) {
                rewardsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
    
    // Handle offer completion from the mini offers in the modal
    const miniOfferButtons = modal ? modal.querySelectorAll('.mini-offer .complete-offer') : [];
    miniOfferButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the parent offer
            const miniOffer = btn.closest('.mini-offer');
            
            if (miniOffer) {
                // Disable the button
                btn.disabled = true;
                btn.textContent = 'COMPLETED';
                btn.classList.add('completed');
                
                // Mark the offer as completed
                miniOffer.classList.add('completed');
                
                // Increment completed offers count
                completedOffers++;
                
                // Update progress display
                updateOffersProgress();
                
                // If all offers completed, close this modal and open payment modal
                if (completedOffers >= 3) {
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.classList.remove('modal-open');
                        
                        // Show payment modal
                        const paypalModal = document.getElementById('paypal-modal');
                        if (paypalModal) {
                            paypalModal.style.display = 'block';
                            document.body.classList.add('modal-open');
                            
                            // Update modal header
                            const modalHeader = paypalModal.querySelector('.modal-header');
                            if (modalHeader) {
                                modalHeader.innerHTML = `
                                    <h2>🎉 All Offers Completed!</h2>
                                    <p>Enter your payment details to receive your reward</p>
                                `;
                            }
                        }
                    }, 1000);
                }
            }
        });
    });
    
    // Update the offers progress display
    function updateOffersProgress() {
        const completedOffersElement = document.getElementById('completed-offers');
        const progressBar = modal ? modal.querySelector('.offers-progress-bar') : null;
        
        if (completedOffersElement) {
            completedOffersElement.textContent = completedOffers;
        }
        
        if (progressBar) {
            const progressPercentage = (completedOffers / 3) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }
}

// Function to update the offers progress display
function updateOffersProgress(completedCount) {
    const completedOffersElement = document.getElementById('completed-offers');
    const progressBar = document.querySelector('.offers-progress-bar');
    
    if (completedOffersElement) {
        completedOffersElement.textContent = completedCount;
    }
    
    if (progressBar) {
        const progressPercentage = (completedCount / 3) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
} 