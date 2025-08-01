import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LocationList() {
    const [locations, setLocations] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/locations')
            .then(res => setLocations(res.data))
            .catch(() => alert('Failed to fetch locations'));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this location?')) return;
        try {
            await axios.delete(`http://localhost:5000/locations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLocations(locations.filter(l => l.id !== id));
        } catch {
            alert('Delete failed');
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Location List</h3>
                <Button as={Link} to="/locations/create">Add Location</Button>
                <Button as={Link} to="/home" variant="outline-primary">Manage Events</Button>

            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(loc => (
                        <tr key={loc.id}>
                            <td>{loc.name}</td>
                            <td>{loc.city}</td>
                            <td>{loc.state}</td>
                            <td>{loc.country}</td>
                            <td>
                                <Button as={Link} to={`/locations/view/${loc.id}`} variant="info" size="sm">View</Button>{' '}
                                <Button as={Link} to={`/locations/edit/${loc.id}`} variant="warning" size="sm">Edit</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(loc.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default LocationList;
