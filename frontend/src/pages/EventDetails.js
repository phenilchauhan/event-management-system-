import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    const res = await api.get(`/events/${id}`);
    setEvent(res.data);
  };

  const register = async () => {
    await api.post(`/events/${id}/register`);
    alert('Registered!');
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <button onClick={register}>Register</button>
    </div>
  );
};

export default EventDetails;
