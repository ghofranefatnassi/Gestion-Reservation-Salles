import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: '',
    room_type: 'MEETING', // default value
    capacity: '',
    floor: '',
    has_projector: false,
    has_whiteboard: false,
    has_video_conference: false,
  });

  const navigate = useNavigate();

  const ROOM_TYPE_OPTIONS = [
    { value: 'MEETING', label: 'Meeting Room' },
    { value: 'CONFERENCE', label: 'Conference Room' },
    { value: 'TRAINING', label: 'Training Room' },
  ];

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/rooms/');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8001/api/rooms/', {
        ...newRoom,
        capacity: parseInt(newRoom.capacity),
        floor: parseInt(newRoom.floor),
      });
      setNewRoom({
        name: '',
        room_type: 'MEETING',
        capacity: '',
        floor: '',
        has_projector: false,
        has_whiteboard: false,
        has_video_conference: false,
      });
      fetchRooms();
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Room List</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong> | Type: {room.room_type_display} | Capacity: {room.capacity} | Floor: {room.floor}
            <br />
            Amenities: {room.has_projector && '📽️ Projector '} {room.has_whiteboard && '📝 Whiteboard '} {room.has_video_conference && '🎥 VC'}
            <hr />
          </li>
        ))}
      </ul>

      <h3>Add a New Room</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Name:</label>
          <input type="text" name="name" value={newRoom.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Room Type:</label>
          <select name="room_type" value={newRoom.room_type} onChange={handleChange}>
            {ROOM_TYPE_OPTIONS.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Capacity:</label>
          <input type="number" name="capacity" value={newRoom.capacity} onChange={handleChange} required />
        </div>
        <div>
          <label>Floor:</label>
          <input type="number" name="floor" value={newRoom.floor} onChange={handleChange} required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="has_projector" checked={newRoom.has_projector} onChange={handleChange} />
            Projector
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="has_whiteboard" checked={newRoom.has_whiteboard} onChange={handleChange} />
            Whiteboard
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="has_video_conference"
              checked={newRoom.has_video_conference}
              onChange={handleChange}
            />
            Video Conference
          </label>
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default Room;
