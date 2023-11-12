{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);   // Utilisation de useState pour gérer l'état isVisible

  // Fonction pour basculer la visibilité du bouton en fonction de la position de défilement
  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 100);
  };

  // Fonction pour faire défiler la page vers le haut de manière fluide
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Ajout d'un écouteur d'événements pour le défilement de la page et appel de toggleVisibility
    window.addEventListener('scroll', toggleVisibility);
    // Retrait de l'écouteur d'événements lorsque le composant est démonté
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
      <button
        className="p-2 btn btn-primary scroll"
        style={{ height: '3rem', padding: '1rem' }}
        onClick={scrollToTop}
        aria-label="Remonter en haut" // Ajout de l'attribut aria-label
      >
        Remonter en haut
        <span className="p-2 glyphicon glyphicon-chevron-up" style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: '.5rem', left: '0' }} className="p-2 glyphicon glyphicon-chevron-up">
            <span style={{ position: 'absolute', top: '-1rem', left: '0' }} className="p-2 glyphicon glyphicon-chevron-up">
            </span>
          </span>
        </span>

      </button>
    </div>
  );
};

export default ScrollButton;
