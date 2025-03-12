// contact-form.js - Gestion du formulaire de contact avec EmailJS

document.addEventListener('DOMContentLoaded', () => {
    // Référence au formulaire
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Fonction de gestion de l'envoi du formulaire
function handleFormSubmit(e) {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation simple
    if (!name || !email || !subject || !message) {
        showFormMessage('Veuillez remplir tous les champs', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showFormMessage('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    // Préparation des données pour l'envoi
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };

    // Affichage d'un message de chargement
    showFormMessage('Envoi en cours...', 'info');

    // Envoyer l'email via EmailJS
    emailjs.send('service_zckvtgg', 'template_0fcse9c', templateParams)
        .then(() => {
            showFormMessage('Message envoyé avec succès!', 'success');
            resetForm();
        })
        .catch((error) => {
            console.error('Erreur détaillée:', error); // Afficher l'erreur dans la console
            showFormMessage('Erreur lors de l\'envoi: ' + (error.message || 'Veuillez réessayer plus tard.'), 'error');
        });
}

// Affichage des messages de formulaire
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Validation d'email avec expression régulière
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Réinitialisation du formulaire
function resetForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
}