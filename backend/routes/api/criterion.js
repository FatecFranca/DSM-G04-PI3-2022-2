const express = require('express');
const router = express.Router();
const controller = require('../../controllers/criterion');
const { authenticate } = require('../../middlewares/authenticationMiddleware');
const onlyAdmin = authenticate({ onlyAdmin: true });
const onlyUser = authenticate({ onlyAdmin: false });

router.post('/',onlyAdmin , controller.create);
router.get('/', onlyUser, controller.retrieveAll);
router.get('/:id', onlyUser, controller.retrieveOne);
router.patch('/:id', onlyAdmin, controller.update);
router.delete('/:id', onlyAdmin, controller.delete);

module.exports = router;