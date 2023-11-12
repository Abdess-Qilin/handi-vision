import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const TypeCompetence = sequelize.define('TypeCompetence', {
  aptitude: {
        type: DataTypes.STRING(255),
  },
}, {
  tableName: 'Type_Competence',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

export default TypeCompetence;
