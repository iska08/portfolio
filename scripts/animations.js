// Additional animations
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // Add pulse animation to contact button
    const contactBtn = document.querySelector('.contact-form .btn-primary');

    setInterval(() => {
        contactBtn.classList.add('pulse-animation');
        setTimeout(() => {
            contactBtn.classList.remove('pulse-animation');
        }, 2000);
    }, 5000);

    // Add floating animation to tech icons
    const techIcons = document.querySelectorAll('.tech-icons i');

    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('float-animation');
    });

    // Add glow effect to timeline items on hover
    const timelineItems = document.querySelectorAll('.timeline-content');

    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('glow-animation');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('glow-animation');
        });
    });
});