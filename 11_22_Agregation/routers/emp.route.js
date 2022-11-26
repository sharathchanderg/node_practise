const express = require('express');
const router = express.Router();

const empController = require('../controllers/emp.controller');

router.post('/post', empController.insert);
router.get('/all', empController.findAll);
router.get('/:id', empController.findone);
router.put('/:id', empController.update);
router.put('/', empController.updateAll);
router.delete('/:id', empController.unlink);
router.delete('/', empController.unlinkAll);

module.exports= router;