{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import { faV } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function FavoritListOffre({ favorites }) {
    // État local pour gérer la visibilité, initialement défini comme vrai (visible)
    const [isVisible, setIsVisible] = useState(true);

    // Fonction pour basculer la visibilité entre vrai et faux
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Calcul du nombre d'éléments dans le tableau 'favorites'
    const favoriteCount = favorites.length;


    return (
        <div className='row con-c col-12 col-sm-12 mx-auto'>
            <h3>
                Mes Favoris ({favoriteCount}) {/* Afficher le nombre de favoris */}
                <button
                    className="btn btn-primary ml-2"
                    onClick={toggleVisibility}
                >
                    {isVisible ? 'Reduire' : 'Voir mes Offres Favorites'}
                </button>
            </h3>
            {isVisible && (
                <div className="row">
                    {favorites.map((favorite) => (
                        <div className="card m-4 col-sm-12 col-md-6 col-lg-4 mx-auto" key={favorite && favorite.email}>
                            <div className="card-body row col-sm-12 col-md-12 col-12 con-c text-start">
                                <h5 className="card-title text-dark font-weight-bold  bg-info rounded p-1 m-1">Poste :
                                    {favorite && favorite.poste}
                                </h5>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">Ville :
                                    {favorite && favorite.lieu_du_poste}
                                </p>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">Type de Contrat :
                                    {favorite && favorite.type_de_contrat}
                                </p>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">
                                    Expérience : {favorite && favorite.experience}
                                </p>
                                <p className="card-text text-dark font-weight-bold  bg-info rounded p-1 m-1">Politique de Télétravail :
                                    {favorite && favorite.politique_teletravail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoritListOffre;
