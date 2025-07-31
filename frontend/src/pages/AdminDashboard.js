import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', category: '', location_id: 1 });
  const [isEditing, setIsEditing] = useState(false);

  const loadEvents = async () => {
    const res = await api.get('/events');
    setEvents(res.data.events);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await api.put(`/events/${form.id}`, form);
      setIsEditing(false);
    } else {
      await api.post('/events', form);
    }
    setForm({ title: '', description: '', date: '', category: '', location_id: 1 });
    loadEvents();
  };

  const handleEdit = (event) => {
    setForm(event);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await api.delete(`/events/${deleteId}`);
    setShowModal(false);
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h4>{isEditing ? 'Edit Event' : 'Create Event'}</h4>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Location ID" type="number" value={form.location_id} onChange={e => setForm({ ...form, location_id: e.target.value })} />
      <button onClick={handleSubmit}>{isEditing ? 'Update' : 'Create'}</button>

      <h4>All Events</h4>
      {events.map(e => (
        <div key={e.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p>{e.date} | {e.category}</p>
          <button onClick={() => handleEdit(e)}>Edit</button>
          <button onClick={() => handleDelete(e.id)}>Delete</button>
        </div>
      ))}

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
};

export default AdminDashboard;
