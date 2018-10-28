const Router = require('koa-router')
const usersController = require('./users.ctrl')
const usersValidator = require('./users.validator')
const router = new Router()

router.get('/', usersValidator.getUserListValidator, usersController.getUserListController)
router.post('/', usersValidator.postUserValidator, usersController.postUserController)

router.get('/:id', usersValidator.getUserValidator, usersController.getUserController)
router.put('/:id', usersValidator.putUserValidator, usersController.putUserController)
router.patch('/:id', usersValidator.patchUserValidator, usersController.patchUserController)
router.delete('/:id', usersValidator.deleteUserValidator, usersController.deleteUserController)

module.exports = router