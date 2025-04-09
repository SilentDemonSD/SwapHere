const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.get('/', skillController.getSkills);
router.post('/', auth, skillController.addSkill);

module.exports = router;
