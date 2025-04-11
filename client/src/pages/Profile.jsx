// client/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSkill from '../components/AddSkill';
import VideoCall from '../components/VideoCall';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [skills, setSkills] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [inCall, setInCall] = useState(false);
  const roomId = `${user._id}-someOtherUserId`;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsRes = await axios.get(`${apiUrl}/api/skills`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Fetch skills failed:', error);
      }
    };
    fetchSkills();
  }, []);

  const handleAddSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{user.name}'s Profile</h2>
        <p>{user.email}</p>
      </div>
      <AddSkill onAdd={handleAddSkill} />
      <div className="card">
        <h3>Your Skills</h3>
        {skills.map((skill) => (
          <div key={skill._id}>
            <h4>{skill.name}</h4>
            <p>{skill.description}</p>
            <p>Category: {skill.category}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setInCall(true)}>Start Video Call</button>
      {inCall && <VideoCall roomId={roomId} />}
    </div>
  );
};

export default Profile;
