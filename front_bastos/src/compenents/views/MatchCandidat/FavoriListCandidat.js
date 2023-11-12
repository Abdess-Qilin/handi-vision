{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState } from 'react';

function FavoritListCandidat({ favorites }) {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const favoriteCount = favorites.length; // Compter le nombre de favoris

    return (
        <div className='row con-c col-12 col-sm-12 mx-auto'>
            <h3>
                Mes Favoris ({favoriteCount}) {/* Afficher le nombre de favoris */}
                <button
                    className="btn btn-primary ml-2"
                    onClick={toggleVisibility}
                >
                    {isVisible ? 'Reduire ' : 'Voir mes Candidats Favorites'}
                </button>
            </h3>
            {isVisible && (
                <div className="row">
                    {favorites.map((favorite) => (
                        <div className="card m-4 col-sm-12 col-md-6 col-lg-4 mx-auto" key={favorite.email}>
                            <div className="card-body row col-sm-12 col-md-12 col-12 con-c text-start">
                                <h5 className="card-title text-dark font-weight-bold  bg-info rounded p-1 m-1">
                                    {favorite.civilite} {favorite.nom} {favorite.prenom}
                                </h5>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">
                                    {favorite.mobilite_geographique}
                                </p>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">
                                    {favorite.poste_recherche}
                                </p>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">
                                    {favorite.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoritListCandidat;