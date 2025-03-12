// animations.js - Gestion des animations du portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Animation de la navbar lors du scroll
    animateNavbarOnScroll();
    
    // Animation des cercles de compétences
    initSkillCircles();
    
    // Animation des cartes d'intérêts
    initInterestCards();
    
    // Animations d'entrée des sections
    initSectionAnimations();
});

// Fonction pour animer la navbar lors du scroll
function animateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Effet de réduction/masquage lors du défilement vers le bas
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Fonction pour initialiser et animer les cercles de compétences
function initSkillCircles() {
    const skillSection = document.querySelector('#competences');
    const circles = document.querySelectorAll('.skill-circle');
    
    // Observer pour déclencher l'animation lorsque la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillCircles();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillSection) {
        observer.observe(skillSection);
    }
    
    // Animation au survol
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', (e) => {
            const percentage = e.currentTarget.getAttribute('data-percentage');
            const percentText = e.currentTarget.querySelector('.skill-percentage');
            
            if (percentText) {
                percentText.style.opacity = '1';
                percentText.textContent = `${percentage}%`;
            }
        });
        
        circle.addEventListener('mouseleave', (e) => {
            const percentText = e.currentTarget.querySelector('.skill-percentage');
            if (percentText) {
                percentText.style.opacity = '0';
            }
        });
    });
}

// Fonction pour animer les cercles de compétences
function animateSkillCircles() {
    const circles = document.querySelectorAll('.skill-circle');

    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percent'); // Récupérer le pourcentage
        const circumference = 2 * Math.PI * 70; // Circonférence du cercle (rayon = 70)

        const progressCircle = circle.querySelector('.skill-circle-progress');
        const percentText = circle.querySelector('.skill-percent');

        if (progressCircle && percentText) {
            const offset = circumference - (percentage / 100) * circumference;

            // Appliquer la couleur en fonction du pourcentage
            if (percentage >= 90) {
                progressCircle.style.stroke = '#388E3C'; // Vert pour 90% et plus
            } else if (percentage >= 75) {
                progressCircle.style.stroke = '#66BB6A'; // Jaune pour 75% à 89%
            } else if (percentage >= 60) {
                progressCircle.style.stroke = '#81C784'; // Orange pour 60% à 74%
            } else {
                progressCircle.style.stroke = '#A5D6A7'; // Rouge pour moins de 60%
            }

            // Animation progressive
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;

            setTimeout(() => {
                progressCircle.style.transition = 'stroke-dashoffset 2s ease-in-out';
                progressCircle.style.strokeDashoffset = offset;
            }, 300);

            // Mettre à jour le texte du pourcentage
            percentText.textContent = `${percentage}%`;
        }
    });
}

// Fonction pour animer les cartes d'intérêts
function initInterestCards() {
    const cards = document.querySelectorAll('.interest-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('interest-card-hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('interest-card-hovered');
        });
    });
}

// Fonction pour animer les sections lors du scroll
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
}