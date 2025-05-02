import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the base URL for API requests
const BASE_URL = 'http://localhost:8002/api/bookings/';

const RendezVous = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    room_id: '',
    user_id: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
  });
  const [error, setError] = useState(null);

  // Fetch bookings data from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings.');
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to create a new booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setBookings([...bookings, response.data]); // Add the new booking to the list
      setFormData({
        room_id: '',
        user_id: '',
        title: '',
        description: '',
        start_time: '',
        end_time: '',
      });
    } catch (err) {
      setError('Error creating booking.');
      console.error(err);
    }
  };

  // Render the list of bookings
  const renderBookings = () => {
    return bookings.map((booking) => (
      <div key={booking.id} className="booking-item">
        <h3>{booking.title}</h3>
        <p>{booking.description}</p>
        <p>Start Time: {booking.start_time}</p>
        <p>End Time: {booking.end_time}</p>
        <p>Status: {booking.status_display}</p>
        <p>Duration: {booking.duration} hours</p>
      </div>
    ));
  };

  return (
    <div className="rendezvous">
      <h1>Rendezvous Management</h1>
      
      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Booking form */}
      <form onSubmit={handleSubmit}>
        <h2>Create a New Booking</h2>
        <div>
          <label>Room ID</label>
          <input
            type="number"
            name="room_id"
            value={formData.room_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>User ID</label>
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Booking</button>
      </form>

      {/* Display all bookings */}
      <h2>Existing Bookings</h2>
      {renderBookings()}
    </div>
  );
};

export default RendezVous;
