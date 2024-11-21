const { Router } = require('express')
const { indexController, loginController, logoutController, addController,avaController,unavailableController,deleteController } = require('../controllers')
const { checkAuthenticated, checkLoggedIn } = require('../middleware/authMiddleware')
const router = Router()

router.route('/').get(checkAuthenticated,indexController)
router.route('/login').get(checkLoggedIn,loginController)
router.route('/add').post(addController)
router.route('/available').post(avaController)
router.route('/unavailable').post(unavailableController)
router.route('/delete').post(deleteController)
router.route('/logout').post(logoutController)


module.exports = { router }