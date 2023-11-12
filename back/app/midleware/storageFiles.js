import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/home/Desktop/projet tutore/Handivision/back/app/uploads'); // Le dossier où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        // Générez un nom de fichier unique, par exemple, en ajoutant une horodatage
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const upload = multer({ storage: storage });
