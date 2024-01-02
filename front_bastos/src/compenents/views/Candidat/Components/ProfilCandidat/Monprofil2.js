import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { apiUrl } from "../../../../config/config";
import { useNavigate } from 'react-router-dom';

const MonProfilCandidat2 = () => {
    const [userData, setUserData] = useState({});
    const [profilPicture, setProfilPicture] = useState('');
    const [uploadProfilPicture, setUploadProfilPicture] = useState(null);
    const [updateProfle, setUpdateProfle] = useState({
        nom: "",
        prenom: "",
        numero_telephone: "",
    })


    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowModalUpdate = () => setShowModalUpdate(true);
    const handleCloseModalUpdate = () => setShowModalUpdate(false);

    const handleShowModalDelete = () => setShowModalDelete(true);
    const handleCloseModalDelete = () => setShowModalDelete(false);


    const fetchDataFromAPI = async () => {

        try {
            const token = localStorage.getItem('token');

            // console.log("Avant l'appel à fetch");
            const response = await fetch(`${apiUrl}/api/me`, {
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

            setUserData(data);
        } catch (error) {
            console.error(error);
        }

    };

    const handlePictureChange = async (event) => {

        const file = event.target.files[0];
        console.log('File selected:', file);

        if (file) {

            // Met à jour l'état selectedFile avec le fichier sélectionné
            setProfilPicture(file);

            // Met à jour l'état fileName avec le nom du fichier sélectionné

            console.log('File state updated:', profilPicture);


            console.error('profileImage is not defined');
        }

    }

    const handlePicture = (e) => {

        // Récupère le fichier à partir de l'événement
        const file = e.target.files[0];

        // Si un fichier a été sélectionné
        if (file) {

            // Met à jour l'état selectedFile avec le fichier sélectionné
            setSelectedFile(file);

            // Met à jour l'état fileName avec le nom du fichier sélectionné
            setFileName(file.name);
        }
    };

    const handleUploadpicture = async () => {
        try {
            console.log('Avant appel à fetch');
            const formData = new FormData();
            formData.append('photo', profilPicture);

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await fetch(`${apiUrl}/api/upload/profile/photo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            console.log('Après appel à fetch');
            console.log('Réponse du serveur:', response);

            if (response.status !== 200) {
                throw new Error('Erreur lors du téléchargement de la photo de profil');
            }

            // Mettez à jour l'état ou effectuez d'autres actions nécessaires
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchFilesPhoto = async () => {
        try {
            const userId = localStorage.getItem('id');
            const response = await fetch(`${apiUrl}/download/profile/photo/${userId}`);
            const data = await response.json();
            console.log(data)
            setUploadProfilPicture(data.fileName);

        } catch (error) {
            console.error('Erreur lors de la récupération des photos', error);
        }
    };

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
        const token = localStorage.getItem('token');


        try {

            const response = await fetch(`${apiUrl}/api/me/update`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(updateProfle),

            })
            console.log('test2')

            if (response.ok) {
                console.log("information modifie");

            }

        } catch (error) {
            console.error(error);
        }

    }

    async function handlesubmitDelete(e) {
        e.preventDefault();
        console.log('ok')
        const userId = localStorage.getItem('id');

        try {
            const response = await fetch(`${apiUrl}/api/me/deleteprofile`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
            });

            if (response.ok) {
                const result = await response.json();

                if (result.success) {
                    // Afficher une alerte de confirmation
                    alert(result.message);

                    // Rediriger vers la page d'accueil
                    history.push('/');
                } else {
                    // Afficher une alerte d'erreur
                    alert(result.error);
                }
            }
        } catch (error) {
            console.error(error);
            // Afficher une alerte d'erreur en cas d'échec de la requête
            alert('Une erreur est survenue lors de la suppression du profil.');
        }
    }





    useEffect(() => {
        fetchDataFromAPI();
        fetchFilesPhoto();

    }, [])
    return (
        <>
            <Container className="contour d-flex flex-column ">
                <h1 className="edit_color text-center">Profil</h1>

                <Container className="d-flex flex-column align-items-center">
                    <Row>
                        <Col>
                            {<img src={`${apiUrl}/uploads/profile/picture/${userData.photo_profile}`} class="carte-arrondie" alt="image profile"></img>}

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button className="mt-2" onClick={handleShowModal} >
                                telecharger photo
                            </Button>
                        </Col>
                    </Row>

                    <Modal className="mpdale_oicture" show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Télécharger une photo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Ajoutez votre formulaire de téléchargement de photo ici */}
                            <Form>
                                <label for="avatar">Choose a profile picture:</label>

                                <input on onChange={handlePictureChange} type="file" id="avatar" name="photo" accept="image/png, image/jpeg" />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleUploadpicture}>
                                Télécharger
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
                <Container>
                    <div className="row col-12 text-center mx-auto">
                        {/* Affichage des données du profil */}
                        <div className="col-md-6 mb-2 mx-auto">
                            <div className="mb-3">
                                <p className="btn btn-primary form-label col-md-12 col-12">
                                    Nom: {userData.nom}
                                </p>
                            </div>
                            <div className="mb-3">
                                <p className="btn btn-primary form-label col-md-12 col-12">
                                    Prénom: {userData.prenom}
                                </p>
                            </div>
                            <div className="mb-3">
                                <p className="btn btn-primary form-label col-md-12 col-12">
                                    Email: {userData.email}
                                </p>
                            </div>
                            <div className="mb-3">
                                <p className="btn btn-primary form-label col-md-12 col-12">
                                    Téléphone: {userData.numero_telephone}
                                </p>
                            </div>
                        </div>

                    </div>
                </Container>
                <Container>
                    <Button className="btn btn-success" onClick={handleShowModalUpdate}>
                        Modifier Profil
                    </Button>

                    <Modal className="modale_update" show={showModalUpdate} onHide={handleCloseModalUpdate}>
                        <Modal.Header closeButton>
                            <Modal.Title> Modifier Profil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Ajoutez votre formulaire de téléchargement de photo ici */}
                            <Form>
                                <Form.Group controlId="formNom">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" placeholder="Entrez votre nom" name='nom' onChange={handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="formPrenom">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" placeholder="Entrez votre prénom" name='prenom' onChange={handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="formNumeroTelephone">
                                    <Form.Label>Numéro de téléphone</Form.Label>
                                    <Form.Control type="tel" placeholder="Entrez votre numéro de téléphone" name='numero_telephone' onChange={handleInputChange} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handlesubmitUpdate}>
                                Mettre a jour
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Button className="btn btn-danger" onClick={handleShowModalDelete}>
                        Supprimer profil
                    </Button>
                    <Modal show={showModalDelete} onHide={handleCloseModalDelete} className="modale_update">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <span role="img" aria-label="Supprimer">
                                    🗑️
                                </span>{' '}
                                Supprimer Profil
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Êtes-vous sûr de vouloir supprimer votre profil? Cette action est irréversible.
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="danger" onClick={handlesubmitDelete}>
                                Supprimer profil
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>

            </Container>
        </>

    )

}

export default MonProfilCandidat2;