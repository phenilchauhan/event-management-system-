// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { getUserRole } from '../utils/auth';
// import { useNavigate } from 'react-router-dom';



// function CreateEvent() {
//     const [form, setForm] = useState({
//         title: '', description: '', date: '', category: '', location_id: ''
//     });
//     const [locations, setLocations] = useState([]);
//     const token = localStorage.getItem('token');
//     const role = getUserRole();
//     const navigate = useNavigate();


//     useEffect(() => {
//         axios.get('http://localhost:5000/locations')
//             .then(res => setLocations(res.data));
//     }, []);

//     const handleChange = e => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/events', form, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             alert('Event created');
//             navigate('/home');

//         } catch {
//             alert('Event creation failed');
//         }
//     };

//     if (role !== 'admin') {
//         return <h3 className="text-center mt-5">Access Denied</h3>;
//     }

//     return (
//         <Container className="mt-5">
//             <h2>Create Event</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Title</Form.Label>
//                     <Form.Control name="title" onChange={handleChange} />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control name="description" onChange={handleChange} />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Date</Form.Label>
//                     <Form.Control name="date" type="date" onChange={handleChange} />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control name="category" onChange={handleChange} />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Location</Form.Label>
//                     <Form.Select name="location_id" onChange={handleChange}>
//                         <option>Select Location</option>
//                         {locations.map(loc => (
//                             <option key={loc.id} value={loc.id}>{loc.name}</option>
//                         ))}
//                     </Form.Select>
//                 </Form.Group>
//                 <Button type="submit">Create</Button>
//             </Form>
//         </Container>
//     );
// }

// export default CreateEvent;
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CreateEvent() {
    const [searchParams] = useSearchParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [locationId, setLocationId] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const eventId = searchParams.get('id'); // If present, we're editing

    useEffect(() => {
        // Fetch all locations for dropdown
        axios.get('http://localhost:5000/locations')
            .then(res => setLocations(res.data))
            .catch(() => alert('Failed to load locations'));

        // If editing, fetch event details
        if (eventId) {
            setLoading(true);
            axios.get(`http://localhost:5000/events/${eventId}`)
                .then(res => {
                    const event = res.data;
                    setTitle(event.title);
                    setDescription(event.description);
                    setCategory(event.category);
                    setDate(event.date?.slice(0, 10)); // format yyyy-mm-dd
                    setLocationId(event.location_id);
                })
                .catch(() => alert('Failed to load event data'))
                .finally(() => setLoading(false));
        }
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            title,
            description,
            category,
            date,
            location_id: locationId
        };

        try {
            if (eventId) {
                await axios.put(`http://localhost:5000/events/${eventId}`, eventData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Event updated successfully');
            } else {
                await axios.post(`http://localhost:5000/events`, eventData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Event created successfully');
            }
            navigate('/home');
        } catch (err) {
            alert('Error submitting event');
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Card>
                <Card.Body>
                    <h3 className="mb-4 text-center">
                        {eventId ? 'Edit Event' : 'Create Event'}
                    </h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter event title"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder="Enter event description"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                placeholder="E.g., Workshop, Seminar, Fest"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Select
                                value={locationId}
                                onChange={(e) => setLocationId(e.target.value)}
                                required
                            >
                                <option value="">-- Select Location --</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                {eventId ? 'Update Event' : 'Create Event'}
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/home')}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CreateEvent;
