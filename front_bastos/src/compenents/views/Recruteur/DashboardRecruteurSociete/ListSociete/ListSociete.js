import React, { useState, useEffect } from "react";
import { apiUrl } from "../../../../config/config";

import { Container, Button, Modal, Form } from "react-bootstrap";
const ListSociete = ({ societes, setSocietes, userStatut }) => {
  /*  const [societes, setSocietes] = useState([]); */
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);
  const handleCloseModalUpdate = () => setShowModalUpdate(false);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleShowModalDelete = () => setShowModalDelete(true);
  const handleCloseModalDelete = () => setShowModalDelete(false);

  const handleInputChange = (e) => {
    const token = localStorage.getItem('token');
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // Copiez l'objet formData actuel dans un nouvel objet pour éviter la mutation directe de l'état
    const updatedFormData = { ...updateProfle };

    // Mettez à jour la valeur du champ approprié dans l'objet mis à jour
    updatedFormData[fieldName] = fieldValue;


    // Mettez à jour l'état avec le nouvel objet mis à jour
    setUpdateProfle(updatedFormData);

  }

  async function handlesubmitUpdate(e) {
    e.preventDefault();
    console.log('ok')

  }

  async function handlesubmitDelete(e) {
    e.preventDefault();
    console.log('ok')
  }

  useEffect(() => {
    const fetchSocietes = async () => {

      try {
        const token = localStorage.getItem('token');

        // console.log("Avant l'appel à fetch");
        const response = await fetch(`${apiUrl}/api/companies/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // console.log("Après l'appel à fetch");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        console.log("Après l'attente de la réponse JSON", data);

        setSocietes(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchSocietes(); // Appelez la fonction pour récupérer les données lorsque le composant est monté

  }, []);



  return (
    <>
      {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
      {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
      {userStatut == 3 && (
        <>
          <div className="row col-12 text-center">
            <h2 className="h2">Liste de Mes Sociétés</h2>
            <div className="container text-center">
              <div className="row">
                {societes.map((data, index) => (
                  <div className="col-md-5 col-lg-4 mx-auto m-3" key={index}>
                    <div className="border border-2 border-black">
                      <p className="btn btn-primary col-12">Nom de l'entreprise : {data.nom_de_lentreprise}</p>
                      <p className="btn btn-primary col-12">Secteur d'activité : {data.secteur_activite}</p>
                      <p className="btn btn-primary col-12">Raison sociale : {data.raison_sociale}</p>
                      <p className="btn btn-primary col-12">Statut juridique : {data.statut_juridique}</p>
                      <p className="btn btn-primary col-12">Téléphone : {data.telephone}</p>
                      <p className="btn btn-primary col-12">Adresse : {data.adresse}</p>
                      <p className="btn btn-primary col-12">Effectif : {data.effectif}</p>
                      <p className="btn btn-primary col-12">Adresse e-mail : {data.mail}</p>
                      <p className="btn btn-primary col-12">Site web : {data.site_web}</p>
                      <p className="btn btn-primary col-12">Réseaux sociaux : {data.reseaux_sociaux}</p>
                      <p className="btn btn-primary col-12">Code NAF principal : {data.code_NAF_principal}</p>
                      <p className="btn btn-primary col-12">Politique télétravail : {data.politique_teletravail}</p>
                      {/* Affichez d'autres données de la société si nécessaire */}
                      <button className="btn btn-info m-1" type="submit" onClick={handleShowModalUpdate}>Modifier</button>

                      <Modal className="modale_update" show={showModalUpdate} onHide={handleCloseModalUpdate}>
                        <Modal.Header closeButton>
                          <Modal.Title> Modifier Profil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Ajoutez votre formulaire de téléchargement de photo ici */}
                          <Form>
                            <Form.Group controlId="formNom">
                              <Form.Label>Nom de l'entreprise</Form.Label>
                              <Form.Control type="text" placeholder="Entrez le Nom de l'entreprise" name='nom' onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="formPrenom">
                              <Form.Label>Secteur d'activité </Form.Label>
                              <Form.Control type="text" placeholder="Entrez Secteur d'activité " name='prenom' onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="formNumeroTelephone">
                              <Form.Label>Raison sociale</Form.Label>
                              <Form.Control type="tel" placeholder="Entrez Raison sociale" name='numero_telephone' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Statut juridique</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Statut juridique" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Téléphone</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Téléphone" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Adresse </Form.Label>
                              <Form.Control type="text" placeholder="Entrez Adresse " name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Effectif</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Effectif" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Adresse e-mail</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Adresse e-mail" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Site web</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Site web" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Réseaux sociaux</Form.Label>
                              <Form.Control type="text" placeholder="Réseaux sociaux" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Code NAF principal</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Code NAF principal" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formNom">
                              <Form.Label>Politique télétravail</Form.Label>
                              <Form.Control type="text" placeholder="Entrez Politique télétravail" name='nom' onChange={handleInputChange} />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={handlesubmitUpdate}>
                            Mettre a jour
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <button className="btn btn-danger m-1" type="submit" onClick={handleShowModalDelete}>Supprimer</button>
                      <Modal show={showModalDelete} onHide={handleCloseModalDelete} className="modale_update">
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <span role="img" aria-label="Supprimer">
                              🗑️
                            </span>{' '}
                            Supprimer Société
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Êtes-vous sûr de vouloir supprimer cette société? Cette action est irréversible.
                        </Modal.Body>
                        <Modal.Footer>

                          <Button variant="danger" onClick={handlesubmitDelete}>
                            Supprimer profil
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

    </>

  );
};

export default ListSociete;
