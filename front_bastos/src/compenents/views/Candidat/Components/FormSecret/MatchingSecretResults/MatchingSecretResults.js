{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import React, {useState} from 'react';


const MatchingSecretResults = ({ candidateData, recruiterData }) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const calculateMatchingResults = (candidateHandicaps, recruiterData) => {
    const matchingResults = [];

    for (const recruiterId in recruiterData) {
      const recruiterHandicaps = recruiterData[recruiterId];

      let totalPoints = 0;
      let matchingPoints = 0;

      for (const category in candidateHandicaps) {
        for (let i = 0; i < candidateHandicaps[category].length; i++) {
          console.log(category, candidateHandicaps[category][i], i)
          if (candidateHandicaps[category][i] && recruiterHandicaps[category][i]) {
            matchingPoints++;
          }
          if (candidateHandicaps[category][i]) {
            totalPoints++;
          }
        }
      }

      const similarity = totalPoints === 0 ? 0 : (matchingPoints / totalPoints) * 100;
      matchingResults.push({ recruiterId, similarity });
    }

    matchingResults.sort((a, b) => b.similarity - a.similarity);

    return matchingResults;
  };

  const matchingResults = calculateMatchingResults(candidateData, recruiterData);
  

  return (
    <>
      <div className="bg-dark rounded text-start p-1" style={{ position: 'fixed', top: '0', right: '0', width: '400px', zIndex: 10 }}>
  <div className='mx-auto row container'>
    <button
      className="btn btn-primary"
      style={{ width: '20rem' }}
      onClick={toggleVisibility}
    >
      {isVisible ? 'Réduire' : 'Voir mes Résultats des correspondances'}
    </button>
    {isVisible && (
      <div>
        <h3 className='con-c text-center'>Résultats des correspondances :</h3>
        <div className='row con-c overflow-auto' style={{ maxHeight: '400px' }}>
          {matchingResults.map((match) => (
            <div className='card con-c m-1 p-2' key={match.recruiterId}>
              <div className='card-body bg-info text-black font-bold '>
                <h5 className='card-title'>Recruteur : {match.recruiterId}</h5>
                <p className='card-text'>{match.similarity.toFixed(2)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
      
    </>
  );
  
  
};

export default MatchingSecretResults;
