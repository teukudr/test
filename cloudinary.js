// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "zzz", // TODO: Ganti dengan cloudname-mu
  api_key: "zzz", // TODO: Ganti dengan API Key-mu
  api_secret: "zzz", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = cloudinary;
