// scripts/main.js
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (isNaN(target)) return;

        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                // Format specific counters with suffixes
                if (counter.getAttribute('data-count') === '9') {
                    counter.textContent = "9+";
                } else if (counter.getAttribute('data-count') === '30') {
                    counter.textContent = "30%";
                } else {
                    counter.textContent = target;
                }
                clearInterval(timer);
            } else {
                if (counter.getAttribute('data-count') === '9') {
                    counter.textContent = Math.floor(current) + "+";
                } else if (counter.getAttribute('data-count') === '30') {
                    counter.textContent = Math.floor(current) + "%";
                } else {
                    counter.textContent = Math.floor(current);
                }
            }
        }, 16);
    });
}

// Initialize skill bars animation
function initializeSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');

    skillLevels.forEach(level => {
        const width = level.getAttribute('data-level');
        if (width) {
            level.style.width = width + '%';
        }
    });
}

// Typing animation for hero subtitle
function initializeTypingAnimation() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;

    const texts = [
        "Vibe Coding Specialist",
        "Back End Developer",
        "Laravel × AI Expert",
        "DevOps Enthusiast",
        "Docker & CI/CD Practitioner",
        "Full Stack Developer"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentText = texts[textIndex];

        if (!isDeleting && !isPaused) {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 1500);
            }
        } else if (isDeleting && !isPaused) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    setTimeout(type, 1000);
}

// Scroll animations
function initializeScrollAnimations() {
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

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.stat-card, .project-card, .skill-category, .contact-item-centered, .social-btn, .devops-tool-item');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// Update project count in hero stats
function updateProjectCount() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectCount = projectCards.length;

    const projectCounter = document.querySelector('.stat-number[data-count="9"]');
    if (projectCounter) {
        projectCounter.setAttribute('data-count', projectCount);
        projectCounter.textContent = '0';
        setTimeout(() => initializeCounters(), 100);
    }
}

// DevOps skills animation
function initializeDevOpsSkills() {
    const devopsItems = document.querySelectorAll('.devops-tool-item');

    devopsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTypingAnimation();
    initializeCounters();
    initializeSkillBars();
    initializeScrollAnimations();
    initializeDevOpsSkills();
    updateProjectCount();

    // Add scroll event for navigation highlight
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});