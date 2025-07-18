// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
    easing: 'ease-in-out-cubic',
    once: true,
    mirror: false,
    offset: 100
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Enhanced mobile menu toggle with animations
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Add stagger animation to menu items
    if (navMenu.classList.contains('active')) {
        navLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.classList.add('slide-in');
        });
    } else {
        navLinks.forEach(link => {
            link.classList.remove('slide-in');
        });
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        navLinks.forEach(navLink => {
            navLink.classList.remove('slide-in');
        });
    });
});

// Enhanced navbar scroll effect with gold accent
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(212, 175, 55, 0.3)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll for mobile
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced service card interactions
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    // Add entrance animation delay
    card.style.animationDelay = `${index * 0.2}s`;
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.03)';
        card.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.4)';
        
        // Add golden glow effect
        const glow = card.querySelector('.service-icon');
        if (glow) {
            glow.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
        } else {
            card.style.transform = 'translateY(0) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.4)';
        }
        
        const glow = card.querySelector('.service-icon');
        if (glow) {
            glow.style.boxShadow = 'none';
        }
    });
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add stagger effect for grid items
            if (entry.target.classList.contains('service-card') || 
                entry.target.classList.contains('step') || 
                entry.target.classList.contains('contact-item')) {
                const siblings = entry.target.parentElement.children;
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.15}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for loading animation
document.querySelectorAll('.service-card, .step, .contact-item, .about-text, .about-image').forEach(el => {
    observer.observe(el);
});

// Enhanced counter animation with golden effect
function animateCounter(element, target, duration = 2500) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.innerHTML = `<span class="gold-text">£${target}</span>`;
            clearInterval(timer);
        } else {
            element.innerHTML = `<span class="gold-text">£${Math.floor(start)}</span>`;
        }
    }, 16);
}

// Trigger counter animation when price elements are visible
const priceElements = document.querySelectorAll('.price');
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceText = entry.target.textContent;
            const priceValue = parseInt(priceText.match(/\d+/));
            if (priceValue) {
                entry.target.innerHTML = '<span class="gold-text">£0</span>';
                animateCounter(entry.target, priceValue);
                priceObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

priceElements.forEach(el => {
    priceObserver.observe(el);
});

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Enhanced button interactions with royal effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
    
    button.addEventListener('click', function(e) {
        // Create royal ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('royal-ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });
});

// Add enhanced ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .royal-ripple {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%);
        transform: scale(0);
        animation: royal-ripple-animation 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }
    
    @keyframes royal-ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .slide-in {
        animation: slideInFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gold-text {
        background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: goldShimmer 2s ease-in-out infinite;
    }
    
    @keyframes goldShimmer {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
    
    body.menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Enhanced loading screen with royal theme
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Create royal loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'royal-loading';
    loadingScreen.innerHTML = `
        <div class="crown-loader">
            <div class="crown-gem"></div>
            <div class="loading-text">Classy Cleaner</div>
        </div>
    `;
    
    // Add loading screen styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .royal-loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .crown-loader {
            text-align: center;
            color: #d4af37;
        }
        
        .crown-gem {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #d4af37, #ffd700);
            border-radius: 50%;
            margin: 0 auto 20px;
            animation: crownSpin 2s linear infinite;
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
        }
        
        .loading-text {
            font-family: 'Dancing Script', cursive;
            font-size: 2rem;
            font-weight: 600;
            animation: fadeInOut 2s ease-in-out infinite;
        }
        
        @keyframes crownSpin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        body.loaded .royal-loading {
            opacity: 0;
            pointer-events: none;
        }
    `;
    
    document.head.appendChild(loadingStyle);
    document.body.insertBefore(loadingScreen, document.body.firstChild);
    
    // Remove loading screen after animation
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone number clicked:', link.href);
        // Add analytics tracking here if needed
    });
});

// Enhanced service card click functionality
serviceCards.forEach(card => {
    const bookButton = card.querySelector('.btn');
    if (bookButton && bookButton.href.includes('tel:')) {
        card.addEventListener('click', (e) => {
            if (e.target !== bookButton && !e.target.closest('.btn')) {
                window.location.href = bookButton.href;
            }
        });
        card.style.cursor = 'pointer';
    }
});

// Enhanced scroll to top with royal styling
let scrollToTopButton;
const createScrollToTop = () => {
    scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'royal-scroll-top';
    scrollToTopButton.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    document.body.appendChild(scrollToTopButton);
    
    // Add royal scroll to top styles
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        .royal-scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border: 2px solid #d4af37;
            border-radius: 50%;
            background: linear-gradient(135deg, #000000, #1a1a1a);
            color: #d4af37;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
        }
        
        .royal-scroll-top:hover {
            background: linear-gradient(135deg, #d4af37, #ffd700);
            color: #000;
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
        }
        
        .royal-scroll-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(scrollStyle);
};

// Show/hide scroll to top button with enhanced animation
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollToTopButton) {
            createScrollToTop();
        }
        scrollToTopButton.classList.add('visible');
    } else if (scrollToTopButton) {
        scrollToTopButton.classList.remove('visible');
    }
});

// Performance optimization: Enhanced debounce
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Apply enhanced debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-dependent operations
    updateActiveNavLink();
}, 10);

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Touch gestures for mobile enhancement
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger scroll to next section
            console.log('Swipe up detected');
        } else {
            // Swipe down - could trigger scroll to previous section
            console.log('Swipe down detected');
        }
    }
}

window.addEventListener('scroll', debouncedScrollHandler);