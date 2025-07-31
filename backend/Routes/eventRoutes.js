const express = require('express');
const ctl = require('../Controllers/eventController');
const { auth, adminOnly } = require('../middlewares/auth');

const router = express.Router();

// ✅ PUBLIC ROUTES
router.get('/', ctl.list); // <-- removed `auth` to make it public
router.get('/:id', ctl.getOne); // optional: make it public for details

// ✅ PROTECTED ADMIN ROUTES
router.post('/', auth, adminOnly, ctl.create);
router.put('/:id', auth, adminOnly, ctl.update);
router.delete('/:id', auth, adminOnly, ctl.delete);

module.exports = router;
