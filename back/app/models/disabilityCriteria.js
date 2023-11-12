import { DataTypes } from "sequelize";
import sequelize from '../database/database.js';

const disabilityCriteria = sequelize.define('DisabilityCriteria', {
    nom: {
        type: DataTypes.STRING(70),
        allowNull: false,

    },
}, {
    tableName: 'Critere_handicap',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

export default disabilityCriteria;