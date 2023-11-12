import express from 'express';
import mainController from './controllers/mainController.js';
import authController from './controllers/authController.js';
import usersController from './controllers/usersController.js';
import updateController from './controllers/updateController.js';
import companiesController from './controllers/companiesController.js';
import jobOfferController from './controllers/jobOfferController.js';
import adminController from './controllers/adminController.js';
import { roleCheck } from './midleware/roleCheck.js';
import { jwtGuard } from './midleware/jwtGuard.js';
import { upload } from './midleware/storageFiles.js';
import uploadController from './controllers/uploadController.js';
import competencesController from './controllers/competencesController.js';
import formJobOfferController from './controllers/formJobOfferController.js';
import matchController from './controllers/matchController.js';

const router = express.Router();

/* code_role 1 => utilisateur
code_role 2 => candidat
code_role 3 => recruteur
code_role 4 => administarteur */

router.post('/api/user/register', usersController.setUser);
router.post('/api/uploadFile', jwtGuard, upload.single('rqth'), usersController.uploadFile);
router.post('/api/users/login', authController.login);
router.get('/api/users', jwtGuard, roleCheck([3, 4]), usersController.getUsers);
router.get('/api/me', jwtGuard, authController.me);
router.patch('/api/me/update', jwtGuard, updateController.updateUser);
router.post('/api/company/register', jwtGuard, roleCheck([3, 4]), companiesController.setCompany);
router.get('/api/companies', jwtGuard, roleCheck([4]), companiesController.getCompanies);
router.get('/api/companies/me', jwtGuard, companiesController.getUserCompanies);
router.post('/api/user/joboffer', jwtGuard, jobOfferController.setJobOffer);
router.get('/api/joboffers', jwtGuard, roleCheck([2, 3, 4]), jobOfferController.getJobOffers);
router.get('/api/joboffers/me', jwtGuard, jobOfferController.getUserJobOffers);
router.get('/api/admin/getusers', jwtGuard, roleCheck([4]), adminController.getUsers);
router.patch('/api/admin/updateuser', jwtGuard, roleCheck([4]), adminController.updateUser);
router.delete('/api/admin/deleteuser', jwtGuard, roleCheck([4]), adminController.deleteUser);
router.get('/api/admin/getcompanies', jwtGuard, roleCheck([4]), adminController.getcompanies);
router.patch('/api/admin/updatecompany', jwtGuard, roleCheck([4]), adminController.updatecompany);
router.delete('/api/admin/deletecompany', jwtGuard, roleCheck([4]), adminController.deletecompany);

router.get('/api/admin/getusers/:coderole', jwtGuard, roleCheck([4]), adminController.getUsersByRole);
router.get('/api/admin/getjoboffers', jwtGuard, roleCheck([4]), adminController.getJobOffers);

router.get('/api/admin/getusers/:coderole/:statut', jwtGuard, roleCheck([4]), adminController.getUsersByRoleAndStatut);
router.get('/api/admin/joboffers/:statut', jwtGuard, roleCheck([4]), adminController.getJobOffersByStatut);
router.patch('/api/admin/updatejoboffer', jwtGuard, roleCheck([4]), adminController.updateJobOffer);

router.patch('/api/candidat/updatejoboffer', jwtGuard, roleCheck([2]), jobOfferController.updateFavJobOffer);
router.post('/api/candidat/favjoboffer', jwtGuard, roleCheck([2]), jobOfferController.addFavJobOffer);
router.get('/api/candidat/getfavjoboffer', jwtGuard, roleCheck([2]), jobOfferController.getFavJobOffer);
router.delete('/api/candidat/removefavjoboffer', jwtGuard, roleCheck([2]), jobOfferController.removeFavJobOffer);
router.get('/api/detailsjoboffer/:offerId', jwtGuard, roleCheck([2]), jobOfferController.getDetailsJobboffer);


router.get('/api/admin/getcompanies/:statut', jwtGuard, roleCheck([4]), adminController.getCompaniesByStatut);
router.get('/api/admin/getcompanybyjoboffer/:codecompany', jwtGuard, roleCheck([4]), adminController.getCompanyByJobOffer);

router.post('/api/uploadFile', jwtGuard, upload.single('rqth'), uploadController.uploadFile);
router.get('/downloadFile/:candidatId', jwtGuard, roleCheck([4]), uploadController.getFile);

router.get('/api/getJobbCompetences', jwtGuard, roleCheck([2]), competencesController.getCompetences);
router.get('/api/getCompetences/me', jwtGuard, roleCheck([2]), competencesController.getUserCompetence);

///////////
router.post('/api/recruteur/formjoboffer', jwtGuard, roleCheck([3]), formJobOfferController.formJobOffer);
router.get('/api/recruteur/getjoboffer', jwtGuard, roleCheck([3]), matchController.getJobOffer)
router.get('/api/recruteur/getcandidate', jwtGuard, roleCheck([3]), matchController.getCandidate)

//// Test
router.post('/api/test/typeCompetence', formJobOfferController.createTypeCompetenceBis);
router.post('/api/test/competence', formJobOfferController.createCompetenceBis);
router.post('/api/test/jobOffer', formJobOfferController.createJobOfferBis);
router.post('/api/test/joboffercompetence', formJobOfferController.createJobOfferCompetence);

export default router;