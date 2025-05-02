import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AddEmployee = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send the form data to the backend API
      const response = await axios.post('http://localhost:8000/api/auth/admin/create-user/', {
        email,
        password,
        role,
        first_name: firstName,
        last_name: lastName,
      });
      // You can redirect the user or reset the form based on the response
      console.log(response.data);
      alert('Employee added successfully');
      // Optionally, clear the form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('There was an error adding the employee:', error);
      setError('Failed to add employee');
    }
  };

  return (
    <div style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '30px' }}>
      <h1 style={{ color: '#000B1C', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>Add Employee</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Password and Confirm Password */}
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* Role, First Name, Last Name */}
        <Row>
          <Col>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="VISITOR">Visitor</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
        </Row>

        {/* Submit and Reset Buttons */}
        <Col xs="auto" className="mt-2">
          <Button type="submit" className="mb-2">
            Save
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            type="button"
            className="mb-2"
            variant="secondary"
            onClick={() => {
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setRole('');
              setFirstName('');
              setLastName('');
            }}
          >
            Reset
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default AddEmployee;
