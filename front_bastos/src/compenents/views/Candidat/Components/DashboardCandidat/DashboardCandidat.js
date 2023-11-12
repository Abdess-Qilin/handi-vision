import React, { useEffect } from 'react';
import { Carousel } from 'bootstrap';

import img1 from "../../../../images/img/landing/header_one.jpg";
import img2 from "../../../../images/img/landing/header_two.jpg"

import HeaderCandidat from '../CarousselCandidat/CarousselHeader';

// ! Il faut retirer le "<Header />"" dans index.js sinon ça fait un doublon ! //

const CarousselCandidat = () => {
    useEffect(() => {
        // Initialisation du carrousel Bootstrap ici
        const myCarouselElement = document.querySelector('#carouselExampleCaptions');
        if (myCarouselElement) {
            new Carousel(myCarouselElement, {
                // Options du carrousel
                interval: 5000, // Intervalle en millisecondes (5 secondes) entre les diapositives
                pause: 'hover', // Pause lorsque la souris survole le carrousel
            });
        }
    }, []); // Le tableau vide [] assure que cela se produit une seule fois après le montage initial

    return (
        <>
            <HeaderCandidat />
            <div id="wrapper">
                <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            <div style={{ position: 'relative' }}>
                                <img src={img1} className="d-block" style={{ width: '100vw' }} alt="?" />
                            </div>
                            <div className="carousel-caption d-none d-md-block bg-white bg-opacity-75">
                                <h5 className='fw-bold text-dark'>LA CHAINE DE LA VIE</h5>
                                <p>"La chaîne de la vie" symbolise l'interdépendance de tous les êtres vivants sur Terre, soulignant notre devoir de préserver la biodiversité et de protéger l'environnement pour les générations futures.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div style={{ position: 'relative' }}>
                                <img src={img2} className="d-block" style={{ width: '100vw' }} alt="?" />
                            </div>
                            <div className="carousel-caption d-none d-md-block bg-white bg-opacity-75">
                                <h5 className='fw-bold text-dark'>LA CHAINE DE LA VIE TOUS SOLIDAIRE</h5>
                                <p>"La chaîne de la vie, tous solidaires" incarne la solidarité humaine, rappelant notre responsabilité les uns envers les autres pour soutenir, partager et aider, créant ainsi un monde meilleur.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarousselCandidat;
