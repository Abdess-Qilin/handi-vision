// {/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

// import logo from "../../../images/img/image.png";
// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';

// function FormOffreEmploi() {
//   const [offreEmploi, setOffreEmploi] = useState({
//     poste: '',
//     lieu_du_poste: '',
//     type_de_contrat: '',
//     duree_de_contrat: '',
//     horaires: '',
//     experience: 0,
//     salaire: 0.0,
//     politique_teletravail: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOffreEmploi({ ...offreEmploi, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Envoyer les données du formulaire à votre API ou effectuer une autre action ici
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row col-12">
//           <div className="col-md-4">
//             <button className="btn btn-success col-12 m-2 " type="button" aria-expanded="false">
//               <Link className="fs-4 fw-bold link-dark" to="#">
//                 Créer une Offre d'emploi
//               </Link>
//             </button>
//           </div>
//           <div className="col-md-4">
//             <button className="btn btn-info col-12 m-2 " type="button" aria-expanded="false">
//               <Link className="fs-4 fw-bold link-dark" to="#">
//                 Modifier une Offre d'emploi
//               </Link>
//             </button>
//           </div>
//           <div className="col-md-4">
//             <button className="btn btn-danger col-12 m-2 " type="button" aria-expanded="false">
//               <Link className="fs-4 fw-bold link-dark" to="#">
//                 Supprimer une Offre d'emploi
//               </Link>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="conexion d-flex flex-column ibox-content con-b">
//         <div className="col-md-12 ibox-content column con-b">
//         <p align="center">
//             <img 
//             src={logo} 
//             alt="Handi-Vision.fr, un portail pour favoriser l'insertion" 
//             width="80" 
//             aria-label="Logo Handi-Vision.fr, un portail pour favoriser l'insertion"
//             />
//           </p>
//           <form className="m-t" method="POST" onSubmit={handleSubmit}>
//           <div className="create-account form-control ">
//             <div className="row">
//               <div className="col-md-4">
//                 <label htmlFor="poste" className="form-label btn btn-primary col-12 mb-2">
//                   Poste
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   id="poste"
//                   name="poste"
//                   value={offreEmploi.poste}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez le poste"
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label htmlFor="lieu_du_poste" className="form-label btn btn-primary col-12">
//                   Lieu du poste
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   id="lieu_du_poste"
//                   name="lieu_du_poste"
//                   value={offreEmploi.lieu_du_poste}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez le lieu du poste"
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label htmlFor="type_de_contrat" className="form-label btn btn-primary col-12">
//                   Type de contrat
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   id="type_de_contrat"
//                   name="type_de_contrat"
//                   value={offreEmploi.type_de_contrat}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez le type de contrat"
//                 />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-4">
//                 <label htmlFor="duree_de_contrat" className="form-label btn btn-primary col-12">
//                   Durée de contrat
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   id="duree_de_contrat"
//                   name="duree_de_contrat"
//                   value={offreEmploi.duree_de_contrat}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez la durée du contrat"
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label htmlFor="horaires" className="form-label btn btn-primary col-12">
//                   Horaires
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   id="horaires"
//                   name="horaires"
//                   value={offreEmploi.horaires}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez les horaires"
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label htmlFor="experience" className="form-label btn btn-primary col-12">
//                   Expérience requise (années)
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control mb-2"
//                   id="experience"
//                   name="experience"
//                   value={offreEmploi.experience}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez l'expérience requise en années"
//                 />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-4">
//                 <label htmlFor="salaire" className="form-label btn btn-primary col-12">
//                   Salaire annuel (€)
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control mb-2"
//                   id="salaire"
//                   name="salaire"
//                   value={offreEmploi.salaire}
//                   onChange={handleChange}
//                   required
//                   aria-label="Saisissez le salaire annuel en euros"
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label htmlFor="politique_teletravail" className="form-label btn btn-primary col-12">
//                   Politique de télétravail
//                 </label>
//                 <textarea
//                   className="form-control mb-2"
//                   id="politique_teletravail"
//                   name="politique_teletravail"
//                   value={offreEmploi.politique_teletravail}
//                   onChange={handleChange}
//                   aria-label="Saisissez la politique de télétravail"
//                 />
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Soumettre
//             </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FormOffreEmploi;
