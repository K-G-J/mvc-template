// image uploading
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tech-blog-kj',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    }
  })
});

module.exports = { upload, uploadS3 };