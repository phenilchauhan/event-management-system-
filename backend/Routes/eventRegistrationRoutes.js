const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const EventRegistration = require('../models/EventRegistration');

// POST /events/:id/register - register for event
// router.post('/:id/register', auth(['user', 'admin']), async (req, res) => {
//   try {
//     const registration = await EventRegistration.create({
//       event_id: req.params.id,
//       user_id: req.user.id,
//     });
//     res.status(201).json(registration);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post('/:id/register', auth(['user', 'admin']), async (req, res) => {
  try {
    const existing = await EventRegistration.findOne({
      where: {
        event_id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (existing) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const reg = await EventRegistration.create({
      event_id: req.params.id,
      user_id: req.user.id,
    });

    res.status(201).json(reg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get all registered event_ids for user
router.get('/my', auth(['user']), async (req, res) => {
  try {
    const regs = await EventRegistration.findAll({
      where: { user_id: req.user.id },
      attributes: ['event_id'],
    });

    const eventIds = regs.map(r => r.event_id);
    res.json(eventIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /events/registrations - user's registrations
router.get('/registrations', auth(['user', 'admin']), async (req, res) => {
  try {
    const registrations = await EventRegistration.findAll({
      where: { user_id: req.user.id },
    });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;