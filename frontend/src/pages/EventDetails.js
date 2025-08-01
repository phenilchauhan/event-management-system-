import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import { getUserRole } from '../utils/auth';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = getUserRole();

  useEffect(() => {
    // Fetch event details
    axios.get(`http://localhost:5000/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(() => alert('Failed to fetch event details'))
      .finally(() => setLoading(false));

    // Fetch user registrations
    if (role === 'user') {
      axios.get('http://localhost:5000/registrations/my', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const registeredIds = res.data.map(r => r.event_id);
        setAlreadyRegistered(registeredIds.includes(parseInt(id)));
      }).catch(() => {
        console.warn('Failed to check registration status');
      });
    }
  }, [id, role, token]);

  const handleRegister = async () => {
    try {
      await axios.post(`http://localhost:5000/events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Registered successfully!');
      setAlreadyRegistered(true);
    } catch(error) {
       const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Registration failed';
      alert(message);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!event) return <div className="text-center mt-5">Event not found</div>;

  return (
    <Container className="mt-5" style={{ maxWidth: '800px' }}>
      <Card className="shadow">
        <Card.Header as="h4" className="text-center bg-primary text-white">
          {event.title}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Text><strong>Description:</strong><br /> {event.description}</Card.Text>
              <Card.Text><strong>Category:</strong> <Badge bg="info">{event.category}</Badge></Card.Text>
              <Card.Text><strong>Date:</strong> {formatDate(event.date)}</Card.Text>
              <Card.Text><strong>Location:</strong> {event.Location?.name || 'N/A'}</Card.Text>
              {event.User && (
                <Card.Text>
                  <strong>Created By:</strong> {event.User.name} ({event.User.email})
                </Card.Text>
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/home')}>
            ← Back
          </Button>

          <div>
            {role === 'user' && (
              alreadyRegistered ? (
                <>
                  <Button variant="secondary" disabled>
                    Already Registered
                  </Button>
                  <div className="mt-2 text-muted" style={{ fontSize: '0.9rem' }}>
                    ✅ You have already registered for this event.
                  </div>
                </>
              ) : (
                <Button variant="success" onClick={handleRegister}>
                  Register
                </Button>
              )
            )}
            {role === 'admin' && (
              <Button variant="warning" onClick={() => navigate(`/create-event?id=${event.id}`)}>
                ✏️ Edit
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default EventDetails;
