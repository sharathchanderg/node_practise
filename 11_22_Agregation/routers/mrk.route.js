const express = require('express');
const router = express.Router();

const mrkcontroller = require('../controllers/mrk.controller');

router.post('/post', mrkcontroller.insert);

module.exports= router;