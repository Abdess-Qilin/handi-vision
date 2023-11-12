import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import TypeCompetence from './typeCompetence.js';


const Competence = sequelize.define('Competence', {
  nom: {
    type: DataTypes.STRING(60),
  },
  code_type_competence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'Competence',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

// Définir la relation avec le modèle TypeCompetence
Competence.belongsTo(TypeCompetence, { foreignKey: 'code_type_competence', as: 'Type' });
TypeCompetence.hasMany(Competence, { foreignKey: 'code_type_competence', as: 'Competences' });
// Competence.belongsTo(TypeCompetence, { foreignKey: 'code_type_competence' });   // Version Abdess 
// TypeCompetence.hasMany(Competence, { foreignKey: 'code_type_competence' });

export default Competence;