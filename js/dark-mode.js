// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Élément du DOM
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Vérifier si le mode nuit est enregistré dans localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Appliquer le mode sauvegardé
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Basculer entre les modes jour et nuit
    themeToggleBtn.addEventListener('click', function() {
        // Ajouter une classe pour la transition fluide
        document.body.classList.add('transition');
        
        // Basculer la classe dark-mode
        document.body.classList.toggle('dark-mode');
        
        // Sauvegarder le choix dans localStorage
        const currentMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', currentMode);
        
        // Supprimer la classe de transition après la fin de l'animation
        setTimeout(() => {
            document.body.classList.remove('transition');
        }, 300);
    });
});