import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import User from './user.js';

const Company = sequelize.define('Company', {
    nom_de_lentreprise: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secteur_activite: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    raison_sociale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statut_juridique: {
        type: DataTypes.STRING,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isMobilePhone: {
                args: ['any'],
                msg: 'Numéro de téléphone invalide'
            }
        }

    },
    adresse: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    effectif: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Adresse e-mail invalide'
            }
        }
    },
    site_web: {
        type: DataTypes.TEXT,
    },
    reseaux_sociaux: {
        type: DataTypes.TEXT,
    },
    code_NAF_principal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    politique_teletravail: {
        type: DataTypes.TEXT,
    },
    code_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statut: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1  // Définissez la valeur par défaut à 1
    },
}, {
    tableName: 'Entreprise',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Company.belongsTo(User, { foreignKey: 'code_utilisateur' });
User.hasOne(Company, { foreignKey: 'code_utilisateur' });

export default Company;
