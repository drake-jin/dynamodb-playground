const Router = require('koa-router')
const usersController = require('./users.ctrl')

const router = new Router()

router.get('/', usersController.getUserListController)
router.post('/', usersController.postUserController)

router.get('/:id', usersController.getUserController)
router.put('/:id', usersController.putUserController)
router.patch('/:id', usersController.patchUserController)
router.delete('/:id', usersController.deleteUserController)

module.exports = router