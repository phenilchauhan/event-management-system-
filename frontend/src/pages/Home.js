import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ date: '', category: '', location: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const params = { ...filters, page };
        const res = await api.get('/events', { params });
        setEvents(res.data.events);
        setTotalPages(res.data.pages);
      } catch (err) {
        console.error('Failed to load events:', err);
      }
    };

    loadEvents();
  }, [filters, page]);

  return (
    <div className="container">
      <h2>All Events</h2>
      <FilterBar filters={filters} setFilters={setFilters} />
      {events.map(e => <EventCard key={e.id} event={e} />)}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
