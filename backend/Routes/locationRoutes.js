const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const auth = require('../middlewares/auth');

// POST /locations - admin only
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /locations - public
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update location (admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    await location.update(req.body);
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete location (admin only)
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    await location.destroy();
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;