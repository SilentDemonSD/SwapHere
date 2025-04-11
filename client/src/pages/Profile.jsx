// client/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSkill from '../components/AddSkill';
import VideoCall from '../components/VideoCall';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [skills, setSkills] = useState([]);
  const [inCall, setInCall] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const roomId = `${user._id || 'default'}-peer`; 

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/skills`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSkills(res.data);
      } catch (err) {
        setError('Failed to load skills');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleAddSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
  };

  if (error) return <div className="container">{error}</div>;
  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{user.name || 'User'}'s Profile</h2>
        <p>{user.email || 'No email'}</p>
        {user.photo && <img src={user.photo} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />}
      </div>
      <AddSkill onAdd={handleAddSkill} />
      <div className="card">
        <h3>Your Skills</h3>
        {skills.length === 0 ? (
          <p>No skills yet</p>
        ) : (
          skills.map((skill) => (
            <div key={skill._id}>
              <h4>{skill.name}</h4>
              <p>{skill.description}</p>
              <p>Category: {skill.category}</p>
            </div>
          ))
        )}
      </div>
      <div className="card">
        <button onClick={() => setInCall(!inCall)}>
          {inCall ? 'End Call' : 'Start Video Call'}
        </button>
        {inCall && <VideoCall roomId={roomId} />}
      </div>
    </div>
  );
};

export default Profile;