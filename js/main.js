// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const navbar = document.getElementById('navbar');
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.navbar-links');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const formToggleBtn = document.getElementById('form-toggle-btn');
    const contactForm = document.getElementById('contact-form');
    
    // Fonction pour la navbar dynamique lors du scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Gestion du menu burger
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Fermer le menu burger lorsqu'un lien est cliqué
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculer la position avec un décalage pour la navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Système d'onglets pour les projets
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Supprimer la classe active de tous les boutons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer l'ID de l'onglet à afficher
            const tabId = 'tab-' + this.getAttribute('data-tab');
            
            // Masquer tous les contenus d'onglets
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Afficher le contenu d'onglet correspondant
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Afficher/masquer le formulaire de contact
    formToggleBtn.addEventListener('click', function() {
        contactForm.classList.toggle('active');
        
        // Changer le texte du bouton
        if (contactForm.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i> Fermer le formulaire';
        } else {
            this.innerHTML = '<i class="fas fa-envelope"></i> Formulaire de contact';
        }
        
        // Scroll jusqu'au formulaire si affiché
        if (contactForm.classList.contains('active')) {
            setTimeout(() => {
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    });
});

// Gestion du menu burger
document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.getElementById('burger-menu');
    const navbarLinks = document.querySelector('.navbar-links');

    if (burgerIcon && navbarLinks) {
        burgerIcon.addEventListener('click', () => {
            burgerIcon.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }
});