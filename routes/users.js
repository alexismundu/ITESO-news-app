const express = require('express');
const multer = require('multer');
const { find } = require('../src/models/user');
const { UserController } = require('./../src/controllers');

const router = express.Router();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log('File: ', file);
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};
const uploadFile = multer({
    storage: multerStorage,
    fileFilter
})

router.get('/', UserController.findAll);

router.post('/', uploadFile.single('profilePic'), UserController.addUser);

module.exports = router;