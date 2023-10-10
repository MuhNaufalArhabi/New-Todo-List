const router = require('express').Router();
const user = require('./user');
const category = require('./category');
const todo = require('./todo');
const authentication = require('../middleware/authentication');

router.use('/users',user)
router.use(authentication)
router.use('/categories', category)
router.use('/todos', todo)

module.exports = router