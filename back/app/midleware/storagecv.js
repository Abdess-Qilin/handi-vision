import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/home/Desktop/handi-vision/handi-vision/back/app/uploads/cv'); // Le dossier où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        // Génére un nom de fichier unique, par exemple, en ajoutant une horodatage
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const uploadcv = multer({ storage: storage });