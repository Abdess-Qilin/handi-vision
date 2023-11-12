import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Company from './company.js';

const JobOffer = sequelize.define('Offer', {
    poste: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lieu_du_poste: {
        type: DataTypes.STRING,
    },
    type_de_contrat: {
        type: DataTypes.STRING,
    },
    duree_de_contrat: {
        type: DataTypes.STRING,
    },
    horaires: {
        type: DataTypes.STRING,
    },
    experience: {
        type: DataTypes.INTEGER,
    },
    salaire: {
        type: DataTypes.DECIMAL(10, 2),
    },
    politique_teletravail: {
        type: DataTypes.TEXT,
    },

    // code_utilisateur: {
    //     type: DataTypes.INTEGER,    // Faux selon le MCD car relation Many-to-Many entre les tables Utilisateur et Offre_demploi
    //     allowNull: false,
    // },
    code_entreprise: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statut: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1  // Définissez la valeur par défaut à 1
    },
    description: {
        type: DataTypes.STRING,

    },
    email_candidature: {
        type: DataTypes.STRING,

    },


}, {
    tableName: 'Offre_demploi',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

// Définir la relation entre OffreEmploi et Entreprise
JobOffer.belongsTo(Company, { foreignKey: 'code_entreprise' });
Company.hasMany(JobOffer, { foreignKey: 'code_entreprise' });

export default JobOffer;
