{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import React, { useState, useEffect } from 'react';
import logo from "../../../images/img/image.png";
import recruiterData from '../../Table/recruiterData';

const FormSecretCandidat = ({ updateCandidateData }) => {
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
    "Handicap Moteur": ['Utilisez vous un fauteuil roulant', 'Question 2', 'Question 3', 'Question 4'],
    "Handicap Visuel": ['Question 5', 'Question 6', 'Question 7', 'Question 8'],
    "Handicap Auditif": ['Question 9', 'Question 10', 'Question 11', 'Question 12'],
    "Déficience Intellectuelle": ['Question 13', 'Question 14', 'Question 15', 'Question 16'],
    "Handicap Mental": ['Question 17', 'Question 18', 'Question 19', 'Question 20'],
    "Handicap Psychique": ['Question 21', 'Question 22', 'Question 23', 'Question 24'],
    "Maladies ou Troubles Invalidants": ['Question 25', 'Question 26', 'Question 27', 'Question 28'],
    "Polyhandicap": ['Question 29', 'Question 30', 'Question 31', 'Question 32'],
  };

  const [handicaps, setHandicaps] = useState(initialHandicaps);
  const [matchingResults, setMatchingResults] = useState([]);

  const handleCheckboxChange = (category, questionIndex) => {
    setHandicaps((prevHandicaps) => {
      const updatedHandicaps = { ...prevHandicaps };
      updatedHandicaps[category][questionIndex] = !updatedHandicaps[category][questionIndex];
      return updatedHandicaps;
    });
    updateCandidateData(handicaps);
  };

  useEffect(() => {
    const calculateSimilarity = (candidateHandicaps, recruiterHandicaps) => {
      let totalPoints = 0;
      let matchingPoints = 0;

      for (const category in candidateHandicaps) {
        for (let i = 0; i < candidateHandicaps[category].length; i++) {
          if (candidateHandicaps[category][i] && recruiterHandicaps[category][i]) {
            matchingPoints++;
          }
          if (candidateHandicaps[category][i]) {
            totalPoints++;
          }
        }
      }

      return (matchingPoints / totalPoints) * 100;
    };

    const calculateMatchingResults = (handicaps) => {
      const matchingResults = [];

      for (const recruiterId in recruiterData) {
        const similarity = calculateSimilarity(handicaps, recruiterData[recruiterId]);
        matchingResults.push({ recruiterId, similarity });
      }

      matchingResults.sort((a, b) => b.similarity - a.similarity);

      return matchingResults;
    };

    const updatedMatchingResults = calculateMatchingResults(handicaps);
    setMatchingResults(updatedMatchingResults);
  }, [handicaps]);

  return (
    <div className="con-b row container mt-4 col-12">
      <p align="center">
        <img
          src={logo}
          alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
          width="80"
        />
      </p>
      {/* <div className='con-c'>
        <MatchingSecretResults matchingResults={matchingResults} />
        
      </div> */}
      <div className="con-c row container mt-4 col-12">
        <h2 className="text-center bg-info rounded mx-auto col-9 text-black">Formulaire Candidat - Question</h2>
        <p className="text-center bg-info rounded mx-auto col-9 text-black font-bold">
          Afin d'être au plus près de vos besoins, vous pouvez remplir ce questionnaire. Il servira de base pour vous proposer en priorité les entreprises qui préconisent et facilitent l'accès au travail.
        </p>
        <p className="text-center bg-info rounded mx-auto col-9 text-black font-bold">
          À tout moment, vous pourrez accéder à ce formulaire pour le corriger, le modifier ou le supprimer.
        </p>
        <p className="text-center bg-info rounded mx-auto col-9 text-black font-bold">
          Il ne sera visible que par vous-même, nul ne peut accéder à ce formulaire qui reste votre vie privée.
        </p>
        <div className="con-c container mt-4">
          <form>
            <div className="row">
              {Object.keys(handicaps).map((category) => (
                <div key={category} className="con-c bg-info col-md-6 col-12 col-lg-3 mx-auto">
                  <h3 className='text-black text-center '>{category}</h3>
                  {handicaps[category].map((isChecked, questionIndex) => (
                    <div key={initialLabels[category][questionIndex]}>
                      <label className='text-black font-bold p-1'>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(category, questionIndex)}
                        />
                        {initialLabels[category][questionIndex]}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default FormSecretCandidat;
