import React, { useState } from "react";
import { apiUrl } from "../../../../../config/config";

const ModifierProfil = ({ userData }) => {
  const [formData, setFormData] = useState({
    /*  name: userData.name,
     username: userData.username,
     email: userData.email,
     phone: userData.phone,
     address: {
       street: userData.address.street,
       city: userData.address.city,
       zipcode: userData.address.zipcode,
     }, */
    civilite: "",
    nom: "",
    prenom: "",
    numero_telephone: "",
    poste_recherche: "",
    experience: "",
    mobilite_geographique: ""
  });

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length > 1) {
      const [parent, child] = keys;
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }; */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* // Construisez l'objet à envoyer à l'API
    const updatedData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.address.street,
        city: formData.address.city,
        zipcode: formData.address.zipcode,
      },
    }; */

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/me/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // La mise à jour a réussi, affichez un message de succès ou redirigez l'utilisateur
        console.log('Profil mis à jour avec succès');
      } else {
        // Gérez les erreurs en cas d'échec de la mise à jour
        console.error('Échec de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
    }
  };

  return (
    <div>
      <h2 className="h2">Modifier le Profil</h2>
      <form onSubmit={handleSubmit}>
        <div className="btn-primary m-1 p-2">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="form-control"
          //disabled // Rend le champ non modifiable
          />
        </div>
        <div className="btn-primary m-1 p-2">
          <label htmlFor="username" className="form-label">
            Prénom
          </label>
          <input
            type="text"
            id="username"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="form-control"
          //disabled // Rend le champ non modifiable
          />
        </div>
        {/* <div className="btn-primary m-1 p-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div> */}
        <div className="btn-primary m-1 p-2">
          <label htmlFor="phone" className="form-label">
            Téléphone
          </label>
          <input
            type="text"
            id="phone"
            name="numero_telephone"
            value={formData.numero_telephone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/*  <div className="btn-primary m-1 p-2">
          <label htmlFor="street" className="form-label">
            Ville
          </label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-primary m-1 p-2">
          <label htmlFor="city" className="form-label">
            Pays
          </label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-primary m-1 p-2">
          <label htmlFor="zipcode" className="form-label">
            Code Postal
          </label>
          <input
            type="text"
            id="zipcode"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            className="form-control"
          />
        </div> */}
        <button type="submit" className="btn btn-success">
          Enregistrer les Modifications
        </button>
      </form>
    </div>
  );
};

export default ModifierProfil;
