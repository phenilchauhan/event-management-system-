import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Table, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserRole } from '../utils/auth';

function Home() {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const role = getUserRole();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout successfully');
    navigate('/login');
  };

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => setEvents(res.data))
      .catch(() => alert('Failed to fetch events'));
  }, []);

  useEffect(() => {
    if (role === 'user') {
      axios.get('http://localhost:5000/registrations/my', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        const ids = res.data.map(r => r.event_id);
        setRegisteredEventIds(ids);
      }).catch(() => {
        console.warn('Failed to fetch user registrations');
      });
    }
  }, [role, token]);

  const handleRegister = async (id) => {
    setRegisteredEventIds(prev => [...prev, id]); // Optimistic update
    try {
      await axios.post(`http://localhost:5000/events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Registered successfully');
    } catch (error) {
      setRegisteredEventIds(prev => prev.filter(eid => eid !== id)); // Rollback
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Registration failed';
      alert(message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter(event => event.id !== id));
      alert('Event deleted');
    } catch {
      alert('Delete failed');
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / itemsPerPage));
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pagination = (
    <Pagination className="mt-3">
      <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
      {[...Array(totalPages).keys()].map(num => (
        <Pagination.Item
          key={num + 1}
          active={num + 1 === currentPage}
          onClick={() => setCurrentPage(num + 1)}
        >
          {num + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
      <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome {role === 'admin' ? 'Admin' : 'User'}</h2>
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
      </div>

      <Form className="mb-3 col-md-3">
        <Form.Control
          type="text"
          placeholder="Search events by title..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Form>

      {role === 'user' ? (
        <>
          <Row>
            {paginatedEvents.map(event => (
              <Col md={4} key={event.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Button as={Link} to={`/event/${event.id}`}>View Details</Button>{' '}
                    <Button
                      variant={registeredEventIds.includes(event.id) ? 'secondary' : 'success'}
                      className="ms-2"
                      onClick={() => handleRegister(event.id)}
                      disabled={registeredEventIds.includes(event.id)}
                    >
                      {registeredEventIds.includes(event.id) ? 'Registered' : 'Register'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {pagination}
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Manage Events</h4>
            <Button as={Link} to="/create-event">Create New Event</Button>
            <Button as={Link} to="/locations" variant="outline-primary">Manage Locations</Button>

          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Category</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map(event => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.category}</td>
                  <td>{event.Location?.name || 'N/A'}</td>
                  <td>
                    <Button as={Link} to={`/event/${event.id}`} variant="info" size="sm">View</Button>{' '}
                    <Button as={Link} to={`/create-event?id=${event.id}`} variant="warning" size="sm">Edit</Button>{' '}
                    <Button onClick={() => handleDelete(event.id)} variant="danger" size="sm">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {pagination}
        </>
      )}
    </Container>
  );
}

export default Home;
