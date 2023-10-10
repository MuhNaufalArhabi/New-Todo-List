const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');

router.post('/', CategoryController.create)
router.get('/', CategoryController.findAll)
router.get('/:id', CategoryController.findOne)
router.delete('/', CategoryController.delete)

module.exports = router