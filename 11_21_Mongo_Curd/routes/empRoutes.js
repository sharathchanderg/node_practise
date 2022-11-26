const express = require('express');
const router = express.Router();

const EmpController = require('../controller/empcontroller');

router.get('/all', EmpController.findAll);
router.get('/:id', EmpController.findone);
router.post('/post', EmpController.insert);
router.put('/:id', EmpController.update);
router.delete('/:id', EmpController.unlink);

module.exports = router;