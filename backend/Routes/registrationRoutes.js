const express = require('express');
const ctl = require('../Controllers/registrationController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/:id/register', auth, ctl.register);
router.get('/registrations', auth, ctl.myRegs);

module.exports = router;
