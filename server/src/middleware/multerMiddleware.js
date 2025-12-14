import multer from 'multer';

const storage = multer.diskStorage({
    // file upload Location
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    // file name
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage });
