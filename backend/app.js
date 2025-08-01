const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/connect');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const locationRoutes = require('./routes/locationRoutes');
const eventRegistration  = require('./routes/eventRegistrationRoutes');

// Load models to register them and their associations
const User = require('./models/User');
const Location = require('./models/Location');
const Event = require('./models/Event');
const EventRegistration = require('./models/EventRegistration');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/locations', locationRoutes);
app.use('/events', eventRegistration);

// Sync DB
sequelize.sync().then(() => console.log('✅ Database synced'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
