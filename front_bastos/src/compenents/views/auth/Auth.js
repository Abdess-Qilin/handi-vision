// {/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

// // Fonction pour vérifier si l'utilisateur est authentifié
// export function isAuthenticated() {
//     const token = localStorage.getItem('token'); // Récupère le jeton JWT depuis le stockage local
//     return !!token; // Vérifie si le jeton existe
//   }
  
//   // Fonction pour obtenir le rôle de l'utilisateur
//   export function getUserRole() {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du jeton JWT
//         return payload.role; // Récupère le rôle de l'utilisateur depuis le jeton
//       } catch (error) {
//         // Erreur lors du décodage du jeton
//         return null;
//       }
//     }
//     return null;
//   }
  
  