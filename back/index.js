import * as dotenv from 'dotenv'
import express from 'express'
import router from './app/router.js'
import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import session from 'express-session';



//permet de Créer des fichiers Lire ,Écrire, Copier , Renommer, Supprimer des fichiers
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Je creer mon serveur et je le stock dans app
const app = express()
app.use(express.json())
// Charge toutes les variables du fichier .env dans process.env
app.use(cors()); // Utilisez le middleware cors pour autoriser les requêtes depuis tous les domaines
dotenv.config()

const sqlFilePath = './migration.sql';
const data = fs.readFileSync(sqlFilePath, 'utf8');

// --- On va stringifier le code --- //
const queries = data.toString();



// Defini le port selon la valeur de la variable d'environnement PORT
// ou le port 3000 si cette derniere est vide
const port = process.env.PORT || 3000
const dbPort = process.env.DB_PORT;
console.log(`Le port de la base de données est : ${dbPort}`);

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/uploads/profile/picture', express.static(__dirname + '/app/uploads/profile'));
console.log(`le dirname est : ${__dirname}`)




app.set('view engine', 'ejs');
// on configure le chemin vers le dossier des views
app.set('views', './app/views/');

app.use(session({
    resave: true, // la session est réenregistrée meme si elle n'est pas modifiée
    secret: process.env.SECRET, // ajoute une part d'aléatoire dans la génération des id de session imprédictible
    saveUninitialized: true, // génère un id de session pour tous ceux qui n'en ont pas encore
}));

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})