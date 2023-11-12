{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import React, { useState } from 'react';
import FormSecretCandidat from '../FormSecretCandidat/FormSecretCandidat';
import MatchingSecretResults from '../MatchingSecretResults/MatchingSecretResults';

import defaultCandidateData from '../../Table/candidateData.js';
import defaultRecruiterData from '../../Table/recruiterData.js';

const ParentComponent = () => {
  const [candidateData, setCandidateData] = useState(defaultCandidateData);  // Utilisez un tableau vide pour les données du candidat
  const [recruiterData, setRecruiterData] = useState(defaultRecruiterData);  // Utilisez un tableau vide pour les données des recruteurs
  
  // Fonction pour mettre à jour les données du candidat
  const updateCandidateData = (data) => {
    setCandidateData(data);
  };

  // Fonction pour mettre à jour les données des recruteurs
  const updateRecruiterData = (data) => {
    setRecruiterData(data);
  };

  return (
    <div>
      <FormSecretCandidat updateCandidateData={updateCandidateData} />
      <MatchingSecretResults
        candidateData={candidateData}
        recruiterData={recruiterData}
      />
    </div>
  );
};

export default ParentComponent;
