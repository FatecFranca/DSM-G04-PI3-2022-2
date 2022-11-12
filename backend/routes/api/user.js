const express = require('express')
const router = express.Router()
const controller = require('../../controllers/user')
const { authenticate } = require('../../middlewares/authenticationMiddleware')
const onlyUser = authenticate({ onlyAdmin: false })

router.post('/', controller.create)
router.get('/', onlyUser, controller.retrieveAll)
router.get('/:id', onlyUser, controller.retrieveOne)
router.patch('/:id', onlyUser, controller.update)
router.delete('/:id', onlyUser, controller.delete)

module.exports = router
