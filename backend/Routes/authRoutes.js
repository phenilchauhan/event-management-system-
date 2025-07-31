const express = require('express'), ctl = require('../Controllers/authController');
const router = express.Router();
router.post('/register', ctl.register);
router.post('/login', ctl.login);
module.exports = router;
