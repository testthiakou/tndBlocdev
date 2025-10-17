document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection des éléments DOM nécessaires
    const commentForm = document.getElementById('comment-form');
    const commentList = document.querySelector('.comment-list');
    const commentCountElement = document.getElementById('comment-count'); // Pour mettre à jour le compteur

    // Vérifie si le formulaire existe sur la page
    if (!commentForm || !commentList) {
        console.error("Éléments du formulaire ou de la liste de commentaires non trouvés.");
        return;
    }

    // 2. Fonction pour créer et injecter le nouveau commentaire
    /**
     * Crée la structure HTML d'un nouveau commentaire et l'ajoute à la liste.
     * @param {string} nom - Le nom de l'auteur.
     * @param {string} texte - Le contenu du commentaire.
     */
    const addCommentToDOM = (nom, texte) => {
        // Crée la date actuelle pour l'affichage (ex: 'à l'instant')
        const now = new Date();
        const formattedTime = 'à l\'instant'; // Simplifié pour l'exemple

        // Crée le conteneur du nouveau commentaire
        const newCommentItem = document.createElement('div');
        newCommentItem.classList.add('comment-item');

        // Contenu HTML du commentaire
        newCommentItem.innerHTML = `
            <p class="comment-author">${nom} (${formattedTime})</p>
            <p class="comment-text">${texte}</p>
        `;

        // Ajoute le nouveau commentaire au début de la liste (ou à la fin, selon votre choix)
        // Ici, on l'ajoute à la fin pour simuler l'ordre temporel ascendant.
        commentList.appendChild(newCommentItem);
    };

    // 3. Gestionnaire d'événement pour la soumission du formulaire
    commentForm.addEventListener('submit', (event) => {
        // Empêche le comportement par défaut du formulaire (rechargement de la page)
        event.preventDefault();

        // Récupère les champs du formulaire (utiliser des 'name' serait plus propre, mais on s'adapte à la structure fournie)
        const nomInput = commentForm.querySelector('input[type="text"]');
        const emailInput = commentForm.querySelector('input[type="email"]');
        const textareaInput = commentForm.querySelector('textarea');

        const nom = nomInput.value.trim();
        const email = emailInput.value.trim();
        const texte = textareaInput.value.trim();

        // Validation simple (même si l'attribut required est là, c'est une bonne pratique)
        if (!nom || !email || !texte) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // --- PARTIE 1 : Affichage immédiat dans le DOM (sans attendre le backend) ---
        addCommentToDOM(nom, texte);

        // Mise à jour du compteur (conversion en nombre, incrémentation, et affichage)
        if (commentCountElement) {
            let currentCount = parseInt(commentCountElement.textContent) || 0;
            commentCountElement.textContent = currentCount + 1;
        }

        // Réinitialise le formulaire après l'affichage
        commentForm.reset();


        // *******************************************************************
        // --- PARTIE 2 : ENVÉRITÉ (Interaction avec l'API Java) ---
        // Dans une application réelle, vous feriez l'appel AJAX/fetch ici !
        /* const articleId = 1; // ID de l'article à récupérer de l'URL ou d'une donnée cachée
        const commentData = {
            nomAuteur: nom,
            emailAuteur: email,
            texte: texte
        };

        fetch(`/api/articles/${articleId}/commentaires`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
        .then(response => {
            if (response.status === 201) {
                // Commentaire sauvegardé avec succès sur le serveur Java
                // Ici, vous pourriez réinitialiser le formulaire ou afficher un message de succès.
            } else {
                alert('Erreur lors de la publication du commentaire sur le serveur.');
                // Retirez le commentaire ajouté au DOM si l'envoi échoue
                // (cette partie est de la logique avancée de gestion d'erreur)
            }
        })
        .catch(error => {
            console.error('Erreur réseau:', error);
            alert('Impossible de contacter le serveur.');
        });
        */
        // *******************************************************************
    });
});