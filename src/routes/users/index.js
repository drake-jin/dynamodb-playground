const Router = require('koa-router')
const usersController = require('./users.ctrl')
const usersValidator = require('./users.validator')
const router = new Router()

// 이상적인 모델
// router.get('/', 세션 데이터 획득 미들웨어, REQUEST validation 검증 미들웨어, RESPONSE formatting 미들웨어)
// 세션나누는 미들웨어는 세션이 없는 예제이므로 추가 안함
// validation 미들웨어 작성완료
// response formattiong 미들웨어 controller
// service를 미들웨어로 뺄 까 했지만....
router.get('/', usersValidator.getUserListValidator, usersController.getUserListController)
router.post('/', usersValidator.postUserValidator, usersController.postUserController)

router.get('/:id', usersValidator.getUserValidator, usersController.getUserController)
router.put('/:id', usersValidator.putUserValidator, usersController.putUserController)
router.patch('/:id', usersValidator.patchUserValidator, usersController.patchUserController)
router.delete('/:id', usersValidator.deleteUserValidator, usersController.deleteUserController)

module.exports = router