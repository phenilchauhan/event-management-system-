const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Event = require('../models/Event');
const Location = require('../models/Location');
const User = require('../models/User');

// GET /events - public with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, date, location_id } = req.query;

    const where = {};
    if (category) where.category = category;
    if (date) where.date = date;
    if (location_id) where.location_id = location_id;

    const events = await Event.findAll({
      where,
      include: [
        { model: Location },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /events - admin only
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const { title, description, date, category, location_id } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      category,
      location_id,
      created_by: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /events/:id - admin only
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /events/:id - admin only
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /events/:id - get a single event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        { model: Location },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
