import multer from 'multer';
import path, { dirname } from 'path';
import url, { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
//===============================create strong
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.filename == 'photo') {
      cb(null, path.join(__dirname, '../public/images'));
    } else {
      cb(null, path.join(__dirname, '../public/gallery'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//==========================================photo multer
export const photoMulter = multer({
  storage: storage,
}).single('photo');

export const galleryPhoto = multer({
  storage: storage,
}).array('gallery', 10);
