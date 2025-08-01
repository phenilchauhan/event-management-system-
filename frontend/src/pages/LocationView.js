import React, { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LocationView() {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/locations/${id}`)
            .then(res => setLocation(res.data))
            .catch(() => alert('Failed to fetch location'));
    }, [id]);

    if (!location) return <Container className="mt-5">Loading...</Container>;

    return (
        <Container className="mt-4" style={{ maxWidth: '600px' }}>
            <Card>
                <Card.Header as="h4">{location.name}</Card.Header>
                <Card.Body>
                    <p><strong>Address:</strong> {location.address}</p>
                    <p><strong>City:</strong> {location.city}</p>
                    <p><strong>State:</strong> {location.state}</p>
                    <p><strong>Country:</strong> {location.country}</p>
                    <div className="d-flex justify-content-between mt-4">

                        <Button variant="secondary" onClick={() => navigate('/locations')}>Back</Button>
                        <Button variant="warning" onClick={() => navigate(`/locations/edit/${id}`)}>
                            ✏️ Edit
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LocationView;
