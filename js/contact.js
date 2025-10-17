document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    const YOUR_RECIPIENT_EMAIL = 'mailto:docteuryve9@gmail.com?subject=blog&body=blog';

    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche le rechargement standard de la page

        // Récupération des valeurs des champs
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation simple
        if (!nom || !email || !sujet || !message) {
            if (formMessage) {
                formMessage.textContent = 'Veuillez remplir tous les champs.';
                formMessage.style.color = 'red';
                formMessage.style.display = 'block';
            }
            return;
        }

        // 1. Encodage du corps du message pour l'URL
        // Le corps du message doit être encodé pour gérer les espaces et caractères spéciaux.
        const bodyContent = `De: ${nom} (${email})\n\n${message}`;
        
        const mailtoLink = `mailto:${YOUR_RECIPIENT_EMAIL}?` +
                        `subject=${encodeURIComponent(sujet)}&` +
                        `body=${encodeURIComponent(bodyContent)}`;

        // 3. Redirection de l'utilisateur
        window.location.href = mailtoLink;

        // Message de succès (affiché brièvement avant la redirection)
        if (formMessage) {
            formMessage.textContent = 'Ouverture de votre application de messagerie...';
            formMessage.style.color = 'blue';
            formMessage.style.display = 'block';
        }
        
    });
});