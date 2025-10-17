document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.getElementById('article-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchForm = document.getElementById('search-form');
    let allArticles = []; // Pour stocker tous les articles chargés
    let bt1  = document.getElementById("bt1");

    bt1.addEventListener("click", ()=>{
        console.log("test");
    })

    // Fonction pour créer la carte d'article
    const createArticleCard = (article) => {
        const card = document.createElement('article');
        card.classList.add('article-card');
        card.setAttribute('data-category', article.categorie);
        
        // Structure HTML de l'article (réutilise le style de index.html)
        card.innerHTML = `
            <img src="${article.image}" alt="Image pour l'article sur ${article.titre}">
            <div class="article-content">
                <h3><a href="../data/articles.html?id=${article.id}">${article.titre}</a></h3>
                <p class="meta">Publié le ${article.date} | Catégorie: ${article.categorie}</p>
                <p>${article.extrait}</p>
                <a href="../data/articles.json?id=${article.id}" class="read-more">Lire &rarr;</a>
            </div>
        `;
        return card;
    };

    // Fonction principale pour afficher les articles (après filtrage/recherche)
    const renderArticles = (articlesToRender) => {
        articleList.innerHTML = ''; // Vider la liste existante
        if (articlesToRender.length === 0) {
            articleList.innerHTML = '<p class="error">Aucun article trouvé pour cette recherche/ce filtre.</p>';
            return;
        }
        articlesToRender.forEach(article => {
            articleList.appendChild(createArticleCard(article));
        });
    };

    // 1. Chargement initial des données
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            allArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Trie par date
            renderArticles(allArticles);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des articles:', error);
            articleList.innerHTML = '<p class="error">Impossible de charger les articles pour le moment.</p>';
        });

    // 2. Gestion du Filtrage par Catégorie
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour de l'état "actif" des boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            let filteredArticles = allArticles;

            if (filter !== 'all') {
                filteredArticles = allArticles.filter(article => article.categorie === filter);
            }
            
            // Réinitialiser la recherche lors d'un filtrage
            document.getElementById('search-input').value = ''; 
            renderArticles(filteredArticles);
        });
    });

    // 3. Gestion de la Recherche par mot-clé
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
        
        // Désactiver le filtre actif pour la recherche
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');

        const searchedArticles = allArticles.filter(article =>
            article.titre.toLowerCase().includes(searchTerm) ||
            article.extrait.toLowerCase().includes(searchTerm) ||
            article.contenuHTML.toLowerCase().includes(searchTerm)
        );

        renderArticles(searchedArticles);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.getElementById('article-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchForm = document.getElementById('search-form');
    let allArticles = [];

    // Fonction utilitaire pour créer la carte d'article
    const createArticleCard = (article) => {
        const card = document.createElement('article');
        card.classList.add('article-card');
        card.setAttribute('data-category', article.categorie);
        
        card.innerHTML = `
            <img src="${article.image}" alt="Image pour l'article sur ${article.titre}">
            <div class="article-content">
                <h3><a href="article.html?id=${article.id}">${article.titre}</a></h3>
                <p class="meta">Publié le ${article.date} | Catégorie: ${article.categorie}</p>
                <p>${article.extrait}</p>
                <a href="..data/articles.json?id=${article.id}" class="read-more">Lire &rarr;</a>
            </div>
        `;
        return card;
    };

    // Fonction principale pour afficher les articles
    const renderArticles = (articlesToRender) => {
        articleList.innerHTML = '';
        if (articlesToRender.length === 0) {
            articleList.innerHTML = '<p class="error">Aucun article trouvé pour cette recherche/ce filtre.</p>';
            return;
        }
        articlesToRender.forEach(article => {
            articleList.appendChild(createArticleCard(article));
        });
    };

    // 1. Chargement initial des données
    fetch('../data/articles.json')
        .then(response => {
            if (!response.ok) throw new Error('Erreur de chargement JSON');
            return response.json();
        })
        .then(data => {
            // Trie par date (du plus récent au plus ancien)
            allArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderArticles(allArticles);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des articles:', error);
            articleList.innerHTML = '<p class="error">Impossible de charger les articles pour le moment. Vérifiez le fichier data/articles.json</p>';
        });

    // 2. Gestion du Filtrage par Catégorie
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour de l'état "actif" des boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log("toto");

            const filter = button.getAttribute('data-filter');
            let filteredArticles = allArticles;

            if (filter !== 'all') {
                filteredArticles = allArticles.filter(article => article.categorie.toLowerCase() === filter);
            }
            
            // Réinitialiser la recherche lors d'un filtrage
            document.getElementById('search-input').value = '';
            renderArticles(filteredArticles);
        });
    });

    // 3. Gestion de la Recherche par mot-clé
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
        
        // Désactiver le filtre actif pour la recherche
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active'); // Sélectionne le bouton 'Tous'

        const searchedArticles = allArticles.filter(article => 
            article.titre.toLowerCase().includes(searchTerm) || 
            article.extrait.toLowerCase().includes(searchTerm) || 
            article.contenuHTML.toLowerCase().includes(searchTerm) // Recherche aussi dans le contenu complet
        );

        renderArticles(searchedArticles);
    });
});