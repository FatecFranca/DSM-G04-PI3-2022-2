const express = require('express')
const router = express.Router()
const controller = require('../../controllers/assessment')
const { authenticate } = require('../../middlewares/authenticationMiddleware')
const onlyUser = authenticate({ onlyAdmin: false })

router.post('/', onlyUser, controller.create)
router.get('/', onlyUser, controller.retrieveAll)
router.get('/:id', onlyUser, controller.retrieveOne)
router.patch('/:id', onlyUser, controller.update)
router.delete('/:id', onlyUser, controller.delete)

/* rotas para answer */
router.post('/:assessment_id/answer', onlyUser, controller.createAnswer)
router.get('/:assessment_id/answer', onlyUser, controller.retrieveAllAnswers)
router.get('/:assessment_id/answer/:id', onlyUser, controller.retrieveOneAnswer)
router.patch('/:assessment_id/answer/:id', onlyUser, controller.updateAnswer)
router.delete('/:assessment_id/answer/:id', onlyUser, controller.deleteAnswer)

module.exports = router
