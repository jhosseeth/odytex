// Loading animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 500);
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
});

// Smooth scrolling and active nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        navLinks.classList.remove('active');
        mobileMenu.style.transform = 'rotate(0deg)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-fade-in, .animate-slide-in').forEach(el => {
    observer.observe(el);
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const highlightNav = () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Gallery items hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Product cards enhanced interaction
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.product-icon');
        icon.style.animation = 'float 2s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.product-icon');
        icon.style.animation = 'none';
    });
});

// Feature cards staggered animation
window.addEventListener('load', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Contact cards wave animation
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        typeWriter();
    }, 1000);
}

// Enhanced scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax for section backgrounds
    document.querySelectorAll('.products, .gallery, .contact').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const translateY = (rect.top - windowHeight / 2) * 0.1;
            section.style.transform = `translateY(${translateY}px)`;
        }
    });
});

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Batch all scroll-based animations here
    highlightNav();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});