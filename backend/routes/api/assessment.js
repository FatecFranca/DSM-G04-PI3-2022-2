const express = require('express');
const router = express.Router();
const controller = require('../../controllers/assessment');

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

/**
 *  Rotas para answer
 */
router.post('/:assessment_id/answer', controller.createAnswer);
router.get('/:assessment_id/answer', controller.retrieveAllAnswer);


module.exports = router;