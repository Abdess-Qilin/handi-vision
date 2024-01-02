-- SQLBook: Code

COMMIT;

START TRANSACTION;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS Role;

DROP TABLE IF EXISTS Utilisateur;

DROP TABLE IF EXISTS Competence;

DROP TABLE IF EXISTS Entreprise;

DROP TABLE IF EXISTS Utilisateur_Competence;

DROP TABLE IF EXISTS Utilisateur_Critere_handicap;

DROP TABLE IF EXISTS Competence_Offre_demploi;

DROP TABLE IF EXISTS Type_Competence;

DROP TABLE IF EXISTS Critere_handicap;

DROP TABLE IF EXISTS Offre_d_emploi;

DROP TABLE IF EXISTS Utilisateur_Offre_demploi;

SET foreign_key_checks = 1;

CREATE TABLE
    IF NOT EXISTS Role (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS Utilisateur (
        id INT AUTO_INCREMENT PRIMARY KEY,
        civilite VARCHAR(20) NOT NULL,
        nom VARCHAR(60) NOT NULL,
        prenom VARCHAR(110) NOT NULL,
        numero_telephone VARCHAR(25) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        mot_de_passe VARCHAR(255) NOT NULL,
        poste_recherche VARCHAR(255),
        experience VARCHAR(50),
        mobilite_geographique INT,
        rue VARCHAR(255),
        ville VARCHAR(255),
        codePostal INT,
        rqth VARCHAR(255),
        code_role INT,
        statut INT,
        photo_profile VARCHAR(255),
        cv VARCHAR(255),
        FOREIGN KEY (code_role) REFERENCES Role(id)
    );

CREATE TABLE
    IF NOT EXISTS Entreprise (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom_de_lentreprise VARCHAR(255) NOT NULL,
        secteur_activite VARCHAR(255) NOT NULL,
        raison_sociale VARCHAR(255) NOT NULL,
        statut_juridique VARCHAR(255),
        telephone VARCHAR(25) NOT NULL UNIQUE,
        adresse TEXT NOT NULL,
        effectif INT,
        mail VARCHAR(255) UNIQUE,
        site_web TEXT,
        reseaux_sociaux TEXT,
        code_NAF_principal VARCHAR(255) NOT NULL,
        politique_teletravail TEXT,
        code_utilisateur INT,
        statut INT,
        FOREIGN KEY (code_utilisateur) REFERENCES Utilisateur(id)
    );

CREATE TABLE
    IF NOT EXISTS Offre_demploi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        poste VARCHAR(255) NOT NULL,
        lieu_du_poste VARCHAR(255),
        type_de_contrat VARCHAR(50),
        duree_de_contrat VARCHAR(50),
        horaires VARCHAR(50),
        experience INT,
        salaire DECIMAL(10, 2),
        politique_teletravail TEXT,
        code_utilisateur INT,
        code_entreprise INT,
        statut INT,
        descrpiption VARCHAR(2000),
        email_candidature varchar(255) FOREIGN KEY (code_entreprise) REFERENCES Entreprise(id)
    );

CREATE TABLE
    IF NOT EXISTS Type_Competence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        aptitude VARCHAR(255)
    );

CREATE TABLE
    IF NOT EXISTS Competence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255),
        code_type_competence INT,
        FOREIGN KEY (code_type_competence) REFERENCES Type_Competence(id)
    );

CREATE TABLE
    IF NOT EXISTS Critere_handicap (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(70) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS Competence_Offre_demploi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code_competence INT,
        code_offre_demploi INT,
        FOREIGN KEY (code_competence) REFERENCES Competence(id),
        FOREIGN KEY (code_offre_demploi) REFERENCES Offre_demploi(id)
    );

CREATE TABLE
    IF NOT EXISTS Utilisateur_Critere_handicap (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code_utilisateur INT,
        code_Critere_handicap INT,
        FOREIGN KEY (code_utilisateur) REFERENCES Utilisateur(id),
        FOREIGN KEY (code_Critere_handicap) REFERENCES Critere_handicap(id)
    );

CREATE TABLE
    IF NOT EXISTS Utilisateur_Competence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code_utilisateur INT,
        code_competence INT,
        FOREIGN KEY (code_utilisateur) REFERENCES Utilisateur(id),
        FOREIGN KEY (code_competence) REFERENCES Competence(id)
    );

CREATE TABLE
    IF NOT EXISTS Utilisateur_Offre_demploi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code_utilisateur INT,
        code_offre_demploi INT,
        FOREIGN KEY (code_utilisateur) REFERENCES Utilisateur(id),
        FOREIGN KEY (code_offre_demploi) REFERENCES Offre_demploi(id)
    );

COMMIT;