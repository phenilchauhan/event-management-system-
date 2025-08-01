import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function LocationForm() {
    const [location, setLocation] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
            axios.get(`http://localhost:5000/locations/${id}`)
                .then(res => setLocation(res.data))
                .catch(() => alert('Failed to fetch location'));
        }
    }, [id]);

    const handleChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (isEdit) {
                await axios.put(`http://localhost:5000/locations/${id}`, location, config);
                alert('Location updated');
            } else {
                await axios.post('http://localhost:5000/locations', location, config);
                alert('Location created');
            }
            navigate('/locations');
        } catch (err) {
            alert('Save failed');
        }
    };

    return (
        <Container className="mt-4" style={{ maxWidth: '600px' }}>
            <h3>{isEdit ? 'Edit Location' : 'Create Location'}</h3>
            <Form onSubmit={handleSubmit}>
                {['name', 'address', 'city', 'state', 'country'].map(field => (
                    <Form.Group key={field} className="mb-3">
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <Form.Control
                            name={field}
                            value={location[field]}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                ))}
                <div className="d-flex justify-content-between">

                    <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                    <Button variant="secondary" onClick={() => navigate('/locations')}>
                        ← Back
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default LocationForm;
