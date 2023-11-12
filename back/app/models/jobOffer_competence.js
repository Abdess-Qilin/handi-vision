import { DataTypes } from "sequelize";
import sequelize from '../database/database.js';
import JobOffer from "./jobOffer.js";
import Competence from "./competence.js";




const JobOffer_competence = sequelize.define('jobOffer_competence', {
    code_offre_demploi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: JobOffer,
            key: 'id'
        }
    },
    code_competence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Competence,
            key: 'id'
        }
    },
}, {
    tableName: 'Competence_Offre_demploi',
    timestamps: false,
    createdAt: false,
    updatedAt: false,

});
// JobOffer_competence.belongsTo(Competence, { foreignKey: 'code_competence' }); Version Abdess
// JobOffer_competence.belongsTo(JobOffer, { foreignKey: 'code_offre_demploi' });
JobOffer.belongsToMany(Competence, { through: JobOffer_competence, as: 'Competences', foreignKey: 'code_offre_demploi', });
Competence.belongsToMany(JobOffer, { through: JobOffer_competence, as: 'Offers', foreignKey: 'code_competence', });

export default JobOffer_competence;