const { Event, Location, User } = require('../models');
const { Op } = require('sequelize');

exports.list = async (req, res) => {
  try {
    const { page = 1, date, category, location } = req.query;
    const where = {};

    if (date) where.date = date;
    if (category) where.category = category;

    const include = [];
    if (location) {
      include.push({
        model: Location,
        where: {
          city: {
            [Op.like]: `%${location}%`
          }
        }
      });
    } else {
      include.push({ model: Location });
    }

    const events = await Event.findAndCountAll({
      where,
      include,
      limit: 5,
      offset: (page - 1) * 5,
      order: [['date', 'ASC']]
    });

    return res.json({
      total: events.count,
      pages: Math.ceil(events.count / 5),
      events: events.rows
    });
  } catch (err) {
    console.error('Event List Error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const e = await Event.findByPk(req.params.id, {
      include: [
        Location,
        { model: User, attributes: ['id', 'name'] }
      ]
    });
    if (!e) return res.sendStatus(404);
    res.json(e);
  } catch (err) {
    console.error('Event Get Error:', err);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

exports.create = async (req, res) => {
  const { title, description, date, category, location_id } = req.body;
  const e = await Event.create({
    title,
    description,
    date,
    category,
    location_id,
    created_by: req.user.id
  });
  res.status(201).json(e);
};

exports.update = async (req, res) => {
  const e = await Event.findByPk(req.params.id);
  if (!e) return res.sendStatus(404);
  await e.update(req.body);
  res.json(e);
};

exports.delete = async (req, res) => {
  const e = await Event.findByPk(req.params.id);
  if (!e) return res.sendStatus(404);
  await e.destroy();
  res.json({ success: true });
};
