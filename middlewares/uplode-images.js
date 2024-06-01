const multer = require("multer");

// Configuration de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(" ").join("_");
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limite à 5MB
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
    }
  },
});

module.exports = upload;
