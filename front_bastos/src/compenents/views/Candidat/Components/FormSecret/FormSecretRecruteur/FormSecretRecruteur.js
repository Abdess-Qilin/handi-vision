{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import React, { useState } from 'react';
import logo from "../../../images/img/image.png";

const FormSecretRecruteur = () => {
  const initialHandicaps = {
    "Handicap Moteur": [false, false, false, false],
    "Handicap Visuel": [false, false, false, false],
    "Handicap Auditif": [false, false, false, false],
    "Déficience Intellectuelle": [false, false, false, false],
    "Handicap Mental": [false, false, false, false],
    "Handicap Psychique": [false, false, false, false],
    "Maladies ou Troubles Invalidants": [false, false, false, false],
    "Polyhandicap": [false, false, false, false],
  };

  const initialLabels = {
    "Handicap Moteur": ['Nous avons une rampe', 'Solution 2', 'Solution 3', 'Solution 4'],
    "Handicap Visuel": ['Solution 5', 'Solution 6', 'Solution 7', 'Solution 8'],
    "Handicap Auditif": ['Solution 9', 'Solution 10', 'Solution 11', 'Solution 12'],
    "Déficience Intellectuelle": ['Solution 13', 'Solution 14', 'Solution 15', 'Solution 16'],
    "Handicap Mental": ['Solution 17', 'Solution 18', 'Solution 19', 'Solution 20'],
    "Handicap Psychique": ['Solution 21', 'Solution 22', 'Solution 23', 'Solution 24'],
    "Maladies ou Troubles Invalidants": ['Solution 25', 'Solution 26', 'Solution 27', 'Solution 28'],
    "Polyhandicap": ['Solution 29', 'Solution 30', 'Solution 31', 'Solution 32'],
  };

  const [handicaps, setHandicaps] = useState(initialHandicaps);

  const handleCheckboxChange = (category, solutionIndex) => {
    setHandicaps((prevHandicaps) => {
      const updatedHandicaps = { ...prevHandicaps };
      updatedHandicaps[category][solutionIndex] = !updatedHandicaps[category][solutionIndex];
      return updatedHandicaps;
    });
  };

  return (
    <div className="con-b row container mt-4 col-12">
      <p align="center">
        <img
          src={logo}
          alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
          width="80"
        />
      </p>
      <div className="con-c row container mt-4 col-12">
        <h2 className="text-center bg-info rounded mx-auto col-9 text-black">Formulaire Recruteur - Solutions</h2>
        <p className="text-center bg-info rounded mx-auto col-9 text-black font-bold">
          En matière d'accessibilité à l'emploi, quelles sont les actions entreprises par votre société pour favoriser l'insertion de travailleurs en situation de handicap ?
        </p>
        <div className="con-c container mt-4">
          <div className="row">
            {Object.keys(handicaps).map((category) => (
              <div key={category} className="con-c bg-info col-md-6 col-12 col-lg-3 mx-auto">
                <h3 className='text-black text-center'>{category}</h3>
                {handicaps[category].map((isChecked, solutionIndex) => (
                  <div key={initialLabels[category][solutionIndex]}>
                    <label className='text-black font-bold p-1'>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(category, solutionIndex)}
                      />
                      {initialLabels[category][solutionIndex]}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div  className="text-center mt-3">
          <button methode="POST" type="submit" className="btn btn-primary">Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default FormSecretRecruteur;
