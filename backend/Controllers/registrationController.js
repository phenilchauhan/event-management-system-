const { Registration, Event } = require('../models');

exports.register = async (req, res) => {
  const existing = await Registration.findOne({ where: { user_id: req.user.id, event_id: req.params.id } });
  if (existing && existing.status === 'registered') return res.status(400).json({ error: 'Already registered' });
  if (existing) await existing.update({ status: 'registered' });
  else await Registration.create({ user_id: req.user.id, event_id: req.params.id });
  res.json({ success: true });
};

exports.myRegs = async (req, res) => {
  const regs = await Registration.findAll({ where: { user_id: req.user.id }, include: [Event] });
  res.json(regs);
};
