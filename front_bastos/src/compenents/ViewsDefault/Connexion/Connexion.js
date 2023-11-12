{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import HeadBienvennue from "../../Partials/HeadBienvennue/HeadBienvennue";
import Header from "../../Partials/Header/Header";
import logo from "../../images/img/image.png";
import { Link } from "react-router-dom";
import users from '../../views/Table/Users';
// import { isAuthenticated, getUserRole } from '../../views/auth/Auth';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectRole, setRedirectRole] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = users.find(user => user.email === email && user.mot_de_passe === password);
    console.log("Email saisi :", email);
    console.log("Mot de passe saisi :", password);
    console.log("Utilisateur trouvé :", user);


    if (user) {
      switch (user.role) {
        case 'admin':
          setRedirectRole('/DashboardAdmin');
          break;
        case 'recruteur':
          setRedirectRole('/DashboardRecruteur');
          break;
        case 'candidat':
          setRedirectRole('/DashboardCandidat');
          break;
        default:
          console.error('Informations de connexion incorrectes');
          // Vous pouvez également gérer l'affichage d'un message d'erreur à l'utilisateur ici
      }
    } else {
      console.error('les Informations saisis sonts incorrectes');
      // Gérez l'affichage d'un message d'erreur à l'utilisateur ici
    }
  };

  if (redirectRole) {
    return <Navigate to={redirectRole} />;
  }

  return (
    <>
      <Header />
      <div className='conexion'>
        <HeadBienvennue />

        <div className="col-md-6 ibox-content column con-b">
          <p align="center">
            <img src={logo} alt="Handi-Vision.fr, un portail pour favoriser l'insertion" width="80" />
          </p>
          <form method="POST" className="m-t" role="form" action="index.html" onSubmit={handleSubmit}>
            <div className="" id="form">
              <label htmlFor="email" className="btn btn-primary mb-3" tabIndex="0">
                Votre email
              </label>
              <p tabIndex="0" className="form-group mb-3">(exemple : nom@exemple.com)</p>
              <input 
              type="email" 
              className="form-control mb-3" 
              id="email" 
              aria-label="Saisir ici votre email" 
              required 
              onChange={handleEmailChange}
              value={email}
              />
            </div>
            <div className="">
              <label htmlFor="inputPassword" className="mb-3 btn btn-primary" tabIndex="0">
                Votre mot de passe
              </label>
              <input 
              type="password" 
              className="form-control mb-3" 
              id="inputPassword" 
              aria-label="Saisir ici votre mot de passe" 
              required 
              autoComplete="current-password" 
              onChange={handlePasswordChange}
              value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block maxwidth mb-3" tabIndex="0">
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

export default Connexion;
