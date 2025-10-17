document.addEventListener('DOMContentLoaded', () => {
    const latestArticlesSection = document.getElementById('latest-articles');
    
    // Fonction utilitaire pour créer la carte d'article
    const createArticleCard = (article) => {
        const card = document.createElement('article');
        card.classList.add('article-card');
        
        card.innerHTML = `
            <img src="${article.image}" alt="Image pour l'article sur ${article.titre}">
            <div class="article-content">
                <h3><a href="article.html?id=${article.id}">${article.titre}</a></h3>
                <p class="meta">Publié le ${article.date} | Catégorie: ${article.categorie}</p>
                <p>${article.extrait}</p>
                <a href="article.html?id=${article.id}" class="read-more">Lire l'article &rarr;</a>
            </div>
        `;
        return card;
    };

    // Récupération des articles depuis le fichier JSON
    fetch('data/articles.json')
        .then(response => response.json())
        .then(articles => {
            // Trier par date et prendre les 5 derniers (si vous avez plus de 5 articles)
            const latestArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

            // Vider le contenu statique de la section (si elle existe)
            if (latestArticlesSection) {
                latestArticlesSection.innerHTML = '';
                
                latestArticles.forEach(article => {
                    latestArticlesSection.appendChild(createArticleCard(article));
                });
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des articles:', error);
            if (latestArticlesSection) {
                latestArticlesSection.innerHTML = '<p class="error">Impossible de charger les articles pour le moment.</p>';
            }
        });
});