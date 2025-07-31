import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <div className="event-card">
    <h3><Link to={`/event/${event.id}`}>{event.title}</Link></h3>
    <p>{event.description.slice(0, 100)}...</p>
    <p>{event.date} | {event.category} | {event.Location?.city}</p>
  </div>
);

export default EventCard;
