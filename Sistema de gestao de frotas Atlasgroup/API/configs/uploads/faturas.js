const multer = require("multer");
const path = require("path");
const { format } = require('date-fns');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "Comprovativo"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + format(Date.now(), 'dd/MM/yyyy') + ext);
    }
});

const uploadComprovativo = multer({ storage });

module.exports = uploadComprovativo;
