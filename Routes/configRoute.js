const router = require('express').Router()
const configController = require('../Controller/configController');

router.post('/', configController.createConfig);
router.get('/:key', configController.getConfig);
router.delete('/', configController.deleteConfig);


module.exports = router;

