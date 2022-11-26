const express = require('express');
const router = express.Router();

const stdcontroller = require('../controllers/std.controller');

router.post('/post', stdcontroller.insert);
router.get('/all', stdcontroller.findAll);
router.get('/:id', stdcontroller.findone);
router.put('/:id', stdcontroller.update);
router.put('/', stdcontroller.updateAll);
router.delete('/:id', stdcontroller.unlink);
router.delete('/', stdcontroller.unlinkAll);
module.exports= router;