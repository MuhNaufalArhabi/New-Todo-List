const TodoController = require('../controllers/todoController')

const router = require('express').Router()

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
// router.get('/:id', TodoController.findOne)
router.get('/:categoryId', TodoController.findByCategory)
router.patch('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router