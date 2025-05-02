import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/signup/', {
        ...formData,
        role: 'VISITOR', // Force role to VISITOR
      });
      console.log(res.data);
      alert("Signup successful!");
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </Col>
          <Col>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
          </Col>
        </Row>

        <Button type="submit" className="mt-3">Submit</Button>
      </Form>
    </div>
  );
};

export default Signup;
