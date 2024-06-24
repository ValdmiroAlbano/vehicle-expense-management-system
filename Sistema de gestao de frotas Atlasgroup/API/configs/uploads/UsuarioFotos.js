const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'picture'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Apenas o nome do arquivo original
    }
});


const uploadFotos = multer({ storage: storage });

module.exports = uploadFotos;