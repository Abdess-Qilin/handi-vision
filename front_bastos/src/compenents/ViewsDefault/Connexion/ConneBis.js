{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import HeadBienvennue from "../../Partials/HeadBienvennue/HeadBienvennue";
import Header from "../../Partials/Header/Header";
import logo from "../../images/img/image.png";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from '../../config/config';





const ConnexionBis = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  })
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // objet contenant l'e-mail et le mot de passe saisis par l'utilisateur


      // requête POST pour envoyer les informations d'authentification au backend
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST', // Utilisez POST pour envoyer les données
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertir l'objet en JSON et envoyez-le dans le corps de la requête
      });

      if (response.status === 200) {
        // La connexion a réussi
        console.log('Connexion réussie');
        const responseData = await response.json();
        const token = responseData.token;
        const id = responseData.id
        const role = responseData.code_role
        const statut = responseData.statut



        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('role', role);
        localStorage.setItem('statut', statut);

        if (role == 4) {
          navigate("/DashboardAdmin");
        } else if (role == 3) {
          navigate("/DashboardRecruteur");
        } else if (role == 2) {
          navigate("/DashboardCandidat");
        }

        // Vous pouvez rediriger l'utilisateur vers une autre page ici si nécessaire
      } else {
        // Identifiants incorrects
        setErrorMessage("Identifiants incorrects");
      }
    } catch (error) {
      setErrorMessage("Problème technique lors de la tentative de connexion.");
    }
  };


  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;


    // Copiez l'objet formData actuel dans un nouvel objet pour éviter la mutation directe de l'état
    const updatedFormData = { ...formData };

    // Mettez à jour la valeur du champ approprié dans l'objet mis à jour
    updatedFormData[fieldName] = fieldValue;

    // Mettez à jour l'état avec le nouvel objet mis à jour
    setFormData(updatedFormData);
  }


  /* if (redirectRole) {
    return <Navigate to={redirectRole} />;
  } */

  return (
    <>
      <Header />
      <div className='conexion'>
        <HeadBienvennue />

        <div className="col-md-6 ibox-content column con-b">
          <p align="center">
            <img src={logo} alt="Handi-Vision.fr, un portail pour favoriser l'insertion" width="80" />
          </p>
          <form method="POST"
            className="m-t"
            role="form" a
            ction="index.html"
            onSubmit={handleSubmit}>
            <div className="" id="form">
              <label htmlFor="email" className="btn btn-primary mb-3" tabIndex="0">
                Votre email
              </label>
              <p tabIndex="0" className="form-group mb-3">(exemple : nom@exemple.com)</p>
              <input name="email"
                type="email"
                className="form-control mb-3"
                id="email"
                aria-label="Saisir ici votre email"
                placeholder='Saisir ici votre email'
                required onChange={handleInputChange} />
            </div>
            <div className="">
              <label htmlFor="inputPassword" className="mb-3 btn btn-primary" tabIndex="0">
                Votre mot de passe
              </label>
              <input
                name="mot_de_passe"
                type="password"
                className="form-control mb-3"
                id="inputPassword"
                aria-label="Saisir ici votre mot de passe"
                required autoComplete="current-password"
                onChange={handleInputChange} />
            </div>
            {errorMessage && <div className="alert alert-danger" role="alert" tabIndex="0">
              {errorMessage}
            </div>}
            <button type="submit" className="btn btn-primary btn-block maxwidth mb-3" tabIndex="0" >
              Se connecter
            </button>
            <br />
            <Link className="navy-link mb-3" to="#">
              Mot de passe oublié?
            </Link>
            <br />
            <p className="label badge mt-3" tabIndex="0">
              Pas encore de compte?
            </p>
            <br />
            <Link className="btn btn-primary btn-block maxwidth" to="/Inscription" tabIndex="0">
              Créer un compte
            </Link>
            <br />
          </form>
        </div>
      </div>
    </>
  );

};
export default ConnexionBis;
