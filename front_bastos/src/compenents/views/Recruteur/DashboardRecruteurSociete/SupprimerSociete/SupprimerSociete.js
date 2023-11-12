{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SupprimerSociete = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(null); // Compte à rebours initial
  const [showCancelButton, setShowCancelButton] = useState(false); // État pour afficher/masquer le bouton "Annuler"

  const handleDelete = () => {
    // Ajoutez ici la logique de suppression du profil
    // Une fois la suppression effectuée, appelez onDelete pour masquer ce composant
    console.log("Société Supprimé");
    // Vous pouvez ajouter la logique de suppression ici

    // Démarre le compte à rebours après la confirmation de la suppression
    setCountdown(10); // Par exemple, démarrez le compte à rebours à 10 secondes

    // Affiche le bouton "Annuler"
    setShowCancelButton(true);
  };

  const handleCancel = () => {
    // Annuler la suppression
    // Réinitialisez le compte à rebours et masquez le bouton "Annuler"
    setCountdown(null);
    setShowCancelButton(false);
  };

  useEffect(() => {
    // Commence le compte à rebours si countdown n'est pas nul
    if (countdown !== null) {
      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          // Une fois le compte à rebours terminé, naviguez vers "/inscription"
          clearInterval(countdownInterval);
          navigate("/DashboardRecruteur");
        }
      }, 1000);

      // Nettoie le compte à rebours lorsque le composant est démonté
      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [countdown, navigate]);

  return (
    <div className="col-12 text-center m-t con-a">
      <h2 className="h2 btn-danger m-1 p-2">Supprimer la Société</h2>
      <div className="column btn-danger m-1 p-2">
        <span className="btn btn-primary m-1"> Êtes-vous sûr de vouloir supprimer cette Société ? </span>
        <span className="btn btn-primary m-1"> Cette action est irréversible.</span>
        <span className="btn btn-primary m-1">tout fichier qui lui est associer sera detruit</span>
      </div>
      {countdown !== null ? (
        <div className="countdown ">
          <p className="btn btn-danger m-1">
            Suppression de la Société dans {countdown} seconde{countdown !== 1 ? "s" : ""}
          </p>
          {showCancelButton && (
            <button onClick={handleCancel} className="btn btn-info m-1">
              Annuler
            </button>
          )}
        </div>
      ) : null}
      <button onClick={handleDelete} className="btn btn-danger">
        Confirmer la Suppression
      </button>
    </div>
  );
};

export default SupprimerSociete;

