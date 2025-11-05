document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeBubbles();
    initializeNavigation();
    initializeAnimations();
    initializeChartObserver();
    initializeCarousels();
    initializeCharts();
    initializeLogin();
    initializeTimeline();
    initializeSkillProgress();
    initializeAnalogClock();
    initializeAudioPlayer();
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    initializeRegularToggles();
    initializeLoginToggle();
    initializeAltToggle();
}

function initializeRegularToggles() {
    const themeToggles = document.querySelectorAll('.theme-toggle input');
    themeToggles.forEach(toggle => {
        toggle.checked = document.body.classList.contains('dark-mode');
        toggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            setTheme(newTheme);
        });
    });
}

function initializeLoginToggle() {
    const loginToggle = document.querySelector('.login-theme-toggle input');
    if (loginToggle) {
        loginToggle.checked = document.body.classList.contains('dark-mode');
        loginToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

function initializeAltToggle() {
    const altToggles = document.querySelectorAll('.theme-toggle-alt');
    altToggles.forEach(toggle => {
        const thumb = toggle.querySelector('.toggle-thumb');
        if (thumb) {
            thumb.style.left = document.body.classList.contains('dark-mode') ? '28px' : '2px';
        }
        toggle.addEventListener('click', toggleTheme);
    });
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    const themeCheckboxes = document.querySelectorAll('.theme-toggle input');
    themeCheckboxes.forEach(checkbox => {
        checkbox.checked = theme === 'dark';
    });
    
    const altToggles = document.querySelectorAll('.theme-toggle-alt');
    altToggles.forEach(toggle => {
        const thumb = toggle.querySelector('.toggle-thumb');
        if (thumb) {
            thumb.style.left = theme === 'dark' ? '28px' : '2px';
        }
    });
    
    localStorage.setItem('theme', theme);
    setTimeout(refreshBubbles, 300);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
}

function initializeBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    if (!bubblesContainer) {
        const newBubblesContainer = document.createElement('div');
        newBubblesContainer.className = 'bubbles';
        newBubblesContainer.id = 'bubbles';
        document.body.appendChild(newBubblesContainer);
        createBubbles(newBubblesContainer);
    } else {
        createBubbles(bubblesContainer);
    }
}

function createBubbles(container) {
    container.innerHTML = '';
    const bubbleCount = 25;
    
    for (let i = 0; i < bubbleCount; i++) {
        createBubble(container, i);
    }
}

function createBubble(container, index) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const sizes = ['bubble-tiny', 'bubble-small', 'bubble-medium', 'bubble-large', 'bubble-xlarge'];
    const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
    bubble.classList.add(sizeClass);
    
    const positions = [
        'bubble-top-left', 'bubble-top-center', 'bubble-top-right',
        'bubble-middle-left', 'bubble-middle-right',
        'bubble-bottom-left', 'bubble-bottom-center', 'bubble-bottom-right',
        'bubble-pos-1', 'bubble-pos-2', 'bubble-pos-3', 'bubble-pos-4',
        'bubble-pos-5', 'bubble-pos-6', 'bubble-pos-7', 'bubble-pos-8'
    ];
    const positionClass = positions[Math.floor(Math.random() * positions.length)];
    bubble.classList.add(positionClass);
    
    const delays = [
        'bubble-delay-0', 'bubble-delay-1', 'bubble-delay-2', 'bubble-delay-3',
        'bubble-delay-4', 'bubble-delay-5', 'bubble-delay-6', 'bubble-delay-7'
    ];
    const delayClass = delays[Math.floor(Math.random() * delays.length)];
    bubble.classList.add(delayClass);
    
    const speeds = ['bubble-slow', 'bubble-medium', 'bubble-fast'];
    const speedClass = speeds[Math.floor(Math.random() * speeds.length)];
    bubble.classList.add(speedClass);
    
    const opacities = ['bubble-opacity-low', 'bubble-opacity-medium', 'bubble-opacity-high'];
    const opacityClass = opacities[Math.floor(Math.random() * opacities.length)];
    bubble.classList.add(opacityClass);
    
    const colors = ['bubble-color-1', 'bubble-color-2', 'bubble-color-3'];
    const colorClass = colors[Math.floor(Math.random() * colors.length)];
    bubble.classList.add(colorClass);
    
    const verticalOffset = Math.random() * 30 - 15;
    const horizontalOffset = Math.random() * 30 - 15;
    
    bubble.style.marginTop = `${verticalOffset}px`;
    bubble.style.marginLeft = `${horizontalOffset}px`;
    
    container.appendChild(bubble);
}

function refreshBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    if (bubblesContainer) {
        createBubbles(bubblesContainer);
    }
}

function initializeNavigation() {
    setActiveNavLink();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.career-card, .timeline-item, .project-card, .stat-card, .link-card, .announcement-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillElements = document.querySelectorAll('.skill-level');
    skillElements.forEach(el => {
        skillObserver.observe(el);
    });
}

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const carouselInner = carousel.querySelector('.carousel');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        if (!carouselInner || items.length === 0) return;
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        let autoAdvance = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
        
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoAdvance);
        });
        
        carousel.addEventListener('mouseleave', function() {
            autoAdvance = setInterval(function() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 5000);
        });
    });
}

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (usernameInput) {
            usernameInput.addEventListener('input', validateUsername);
            usernameInput.addEventListener('blur', validateUsername);
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', validateEmail);
            emailInput.addEventListener('blur', validateEmail);
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('input', validatePassword);
            passwordInput.addEventListener('blur', validatePassword);
        }
        
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

function validateUsername() {
    const usernameInput = document.getElementById('username');
    const errorElement = document.getElementById('usernameError');
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError(usernameInput, errorElement, 'Username is required');
        return false;
    }
    
    if (username.length < 4) {
        showError(usernameInput, errorElement, 'Username must be at least 4 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showError(usernameInput, errorElement, 'Username can only contain letters, numbers, and underscores');
        return false;
    }
    
    clearError(usernameInput, errorElement);
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const errorElement = document.getElementById('emailError');
    const email = emailInput.value.trim();
    
    if (!email) {
        showError(emailInput, errorElement, 'Email address is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailInput, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailInput, errorElement);
    return true;
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const errorElement = document.getElementById('passwordError');
    const password = passwordInput.value;
    
    if (!password) {
        showError(passwordInput, errorElement, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError(passwordInput, errorElement, 'Password must be at least 6 characters long');
        return false;
    }
    
    clearError(passwordInput, errorElement);
    return true;
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isUsernameValid && isEmailValid && isPasswordValid) {
        performLogin();
    } else {
        showMessage('Please fix the errors above before submitting', 'error');
    }
}

function performLogin() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('remember').checked;
    
    const username = usernameInput ? usernameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    
    const submitButton = document.querySelector('.login-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing In...';
    submitButton.disabled = true;
    
    showMessage('Logging in...', 'info');
    
    setTimeout(() => {
        showMessage('Login successful! Redirecting...', 'success');
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('username', username || email.split('@')[0]);
        }
        
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', username || email);
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
        
    }, 1000);
}

function showError(inputElement, errorElement, message) {
    inputElement.style.borderColor = 'var(--error-color)';
    inputElement.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = 'var(--error-color)';
    }
    
    inputElement.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        inputElement.style.animation = '';
    }, 500);
}

function clearError(inputElement, errorElement) {
    inputElement.style.borderColor = 'var(--border-color)';
    inputElement.style.boxShadow = 'none';
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.login-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageEl = document.createElement('div');
    messageEl.classList.add('login-message');
    messageEl.textContent = message;
    
    switch(type) {
        case 'error':
            messageEl.style.cssText = `
                color: var(--error-color);
                background: rgba(231, 76, 60, 0.1);
                border: 1px solid rgba(231, 76, 60, 0.3);
                padding: 1rem;
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
                text-align: center;
                animation: slideDown 0.3s ease-out;
            `;
            break;
        case 'success':
            messageEl.style.cssText = `
                color: var(--success-color);
                background: rgba(39, 174, 96, 0.1);
                border: 1px solid rgba(39, 174, 96, 0.3);
                padding: 1rem;
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
                text-align: center;
                animation: slideDown 0.3s ease-out;
            `;
            break;
        case 'info':
            messageEl.style.cssText = `
                color: var(--primary-purple);
                background: rgba(106, 13, 173, 0.1);
                border: 1px solid rgba(106, 13, 173, 0.3);
                padding: 1rem;
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
                text-align: center;
                animation: slideDown 0.3s ease-out;
            `;
            break;
    }
    
    const loginCard = document.querySelector('.login-card');
    const form = document.querySelector('.login-form');
    if (loginCard && form) {
        loginCard.insertBefore(messageEl, form);
        
        if (type !== 'error') {
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
    }
}

function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        timelineObserver.observe(item);
    });
}

function initializeSkillProgress() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const progressBar = level.querySelector('.skill-progress');
        if (progressBar) {
            const width = progressBar.style.width;
            progressBar.setAttribute('data-width', width);
            progressBar.style.width = '0';
        }
    });
}

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    const dateTimeString = now.toLocaleDateString('en-US', options);
    
    const datetimeElements = document.querySelectorAll('.datetime');
    datetimeElements.forEach(el => {
        el.textContent = dateTimeString;
    });
    
    updateTimeElements(now);
}

function updateTimeElements(now) {
    const timeOnlyElements = document.querySelectorAll('.time-only');
    timeOnlyElements.forEach(el => {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        el.textContent = now.toLocaleTimeString('en-US', timeOptions);
    });
    
    const dateOnlyElements = document.querySelectorAll('.date-only');
    dateOnlyElements.forEach(el => {
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        el.textContent = now.toLocaleDateString('en-US', dateOptions);
    });
}

function initializeClock() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function createAnimatedClock() {
    const clockElements = document.querySelectorAll('.datetime');
    
    clockElements.forEach(clock => {
        clock.style.transition = 'opacity 0.3s ease';
        
        setInterval(() => {
            clock.style.opacity = '0.8';
            setTimeout(() => {
                clock.style.opacity = '1';
            }, 300);
        }, 60000);
    });
}

function animateChartBars(container) {
    const bars = container.querySelectorAll('.chart-bar');
    
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const valueSpan = bar.querySelector('.chart-value');
            let targetHeight = '50%';
            
            if (valueSpan) {
                const percentage = valueSpan.textContent.replace('%', '');
                targetHeight = percentage + '%';
            }
            
            bar.classList.add('chart-bar-animated');
            bar.style.height = targetHeight;
            bar.style.transition = `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
            
        }, index * 150);
    });
}

function initializeChartObserver() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChartBars(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    chartContainers.forEach(container => {
        const bars = container.querySelectorAll('.chart-bar');
        const isAnimated = Array.from(bars).some(bar => bar.classList.contains('chart-bar-animated'));
        
        if (!isAnimated) {
            observer.observe(container);
        }
    });
}

function initializeCharts() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach((container) => {
        const bars = container.querySelectorAll('.chart-bar');
        const labels = container.querySelectorAll('.chart-label');
        
        bars.forEach((bar, index) => {
            let targetHeight = bar.getAttribute('data-value') || bar.getAttribute('data-height') || '0';
            targetHeight = parseFloat(targetHeight.toString().replace('%', ''));
            
            if (isNaN(targetHeight) || targetHeight === 0) {
                targetHeight = Math.floor(Math.random() * 80) + 20;
            }
            
            targetHeight = Math.min(Math.max(targetHeight, 5), 100);
            bar.setAttribute('data-target-height', targetHeight);
            bar.style.height = '0%';
            
            const barColor = bar.getAttribute('data-color');
            if (barColor) {
                bar.style.backgroundColor = barColor;
            }
            
            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
                this.style.transform = 'translateY(-2px) scale(1.05)';
                const value = this.getAttribute('data-target-height') || targetHeight;
                this.setAttribute('title', `${value}%`);
            });
            
            bar.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        animateChartBars(container);
    });
}

function initializeAnalogClock() {
    updateAnalogClock();
    
    function animateClock() {
        updateAnalogClock();
        requestAnimationFrame(animateClock);
    }
    animateClock();
}

function updateAnalogClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    
    if (hourHand && minuteHand && secondHand) {
        const hourDeg = (hours * 30) + (minutes * 0.5) + (seconds * 0.00833);
        const minuteDeg = (minutes * 6) + (seconds * 0.1) + (milliseconds * 0.0001);
        const secondDeg = (seconds * 6) + (milliseconds * 0.006);
        
        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }
}

function initializeAudioPlayer() {
    const audio = document.getElementById('motivationAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const visualizer = document.getElementById('visualizer');

    if (!audio) return;

    function createVisualizerBars() {
        visualizer.innerHTML = '';
        const barCount = 50;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.height = '10%';
            visualizer.appendChild(bar);
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }

    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.classList.add('playing');
        } else {
            audio.pause();
            playPauseBtn.classList.remove('playing');
        }
    });

    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteBtn.classList.toggle('muted', audio.muted);
    });

    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    audio.addEventListener('timeupdate', updateProgress);

    audio.addEventListener('ended', () => {
        playPauseBtn.classList.remove('playing');
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });

    createVisualizerBars();
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
    }
    
    .login-btn:disabled:hover {
        background: var(--primary-purple);
        transform: none;
    }
    
    .chart-bar {
        transition: height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), 
                   transform 0.3s ease, 
                   opacity 0.3s ease;
    }
    
    .chart-bar-animated {
        animation: barGrow 0.8s ease-out;
    }
    
    @keyframes barGrow {
        0% {
            height: 0% !important;
            opacity: 0.5;
        }
        70% {
            opacity: 0.8;
        }
        100% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

window.portalUtils = {
    setTheme,
    toggleTheme,
    showMessage
};