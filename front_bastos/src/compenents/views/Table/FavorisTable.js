// Initialise la liste des offres favorites à partir du stockage local
let favoritedOffersList = JSON.parse(localStorage.getItem('favoritedOffersList')) || [];

// Fonction pour ajouter une offre à la liste des favoris
const addFavoriteOffer = (offre) => {
    favoritedOffersList.push(offre);
    // Met à jour le stockage local
    localStorage.setItem('favoritedOffersList', JSON.stringify(favoritedOffersList));
};

// Fonction pour supprimer une offre des favoris par son ID
const removeFromFavorites = (offreId) => {
    favoritedOffersList = favoritedOffersList.filter((offre) => offre.id !== offreId);
    // Met à jour le stockage local
    localStorage.setItem('favoritedOffersList', JSON.stringify(favoritedOffersList));
};

// Export des fonctions et de la liste des offres favorites
export { favoritedOffersList, addFavoriteOffer, removeFromFavorites };
