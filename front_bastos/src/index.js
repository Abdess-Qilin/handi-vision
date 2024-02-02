{/* OUMESSAOUD Azzedine: oumessaoud@hotmail.fr */ }
import 'dotenv/config';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './compenents/styles/styles.css';
import './compenents/styles/gabriel.css';
import './compenents/styles/conexion.css';
import './compenents/styles/creation-compte-candidat.css';
import './compenents/styles/footer.css';
import './compenents/styles/scrollButon.css';

import { BrowserRouter, Routes, Route, PrivateRoute, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import PrivateRoute from './compenents/views/auth/PrivateRoute.js';

import NotFound from './compenents/ViewsDefault/NotFound/NotFound.js';
import PiedDePage from './compenents/Partials/PiedDePage/PiedDePage.js';
import ScrollButon from './compenents/Partials/ScrollButton/ScrollButton.js';
import Connexion from './compenents/ViewsDefault/Connexion/Connexion.js';
import ConnexionBis from './compenents/ViewsDefault/Connexion/ConneBis';
import Inscription from './compenents/ViewsDefault/Inscription/Inscription.js';
import HeadAdminCaroussel from './compenents/Partials/HeadAdminCaroussel/HeadAdminCaroussel';
import HeadCaroussel from './compenents/Partials/HeadCaroussel/HeadCaroussel';
import CarousselCandidatH from './compenents/views/Candidat/Components/CarousselCandidat/CarousselHeader';
import PrivateRoute from './compenents/Partials/PrivateRoute/PrivateRoute.js';
import PrivateRouteRecruteur from './compenents/Partials/PrivateRoute/PrivateRouteRecruteur.js';
import PrivateRouteAdmin from './compenents/Partials/PrivateRoute/PrivateRouteAdmin.js';
import PrivateRouteCandidat from './compenents/Partials/PrivateRoute/PrivateRouteCandidat';
import Forbidden from './compenents/ViewsDefault/NotFound/Forbidden.js';
import DetailsOffre from './compenents/views/Candidat/Components/DetailsOffre/DetailsOffre.js';
import SupprimerElementAdmin from './compenents/views/SupprimerElement/SupprimerElementAdmin.js';
import SupprimerElementRecruteur from './compenents/views/SupprimerElement/SupprimerElementRecruteur.js';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ConnexionBis />} />
            <Route path="/DashboardAdmin" element={<PrivateRouteAdmin> <HeadAdminCaroussel /> </PrivateRouteAdmin>} />
            <Route path="/DashboardRecruteur" element={<PrivateRouteRecruteur> <HeadCaroussel /></PrivateRouteRecruteur>} />
            <Route path="/DashboardCandidat" element={<PrivateRouteCandidat> <CarousselCandidatH />  </PrivateRouteCandidat>} />
            <Route path="/details-offre/:offreId" element={<DetailsOffre />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/not" element={<NotFound />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/delete" element={<SupprimerElementAdmin />} />
            <Route path="/deleteRecruteur" element={<SupprimerElementRecruteur />} />
        </Routes>
        <ScrollButon />
        <PiedDePage />
    </BrowserRouter>

);



