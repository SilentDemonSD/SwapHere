import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Avatar } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [skill, setSkill] = useState({ title: '', description: '', category: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const handleAddSkill = async () => {
    await axios.post('/api/skills', skill, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setSkill({ title: '', description: '', category: '' });
    // Refresh user data
    const res = await axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setUser(res.data);
  };

  if (!user) return <div style={{ color: '#fff', textAlign: 'center' }}>Loading...</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Avatar src={user.photo} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Skill Title"
          value={skill.title}
          onChange={(e) => setSkill({ ...skill, title: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={skill.description}
          onChange={(e) => setSkill({ ...skill, description: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Category"
          value={skill.category}
          onChange={(e) => setSkill({ ...skill, category: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddSkill}>
          Add Skill
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Your Skills</Typography>
        {user.skills.map((skill) => (
          <Typography key={skill._id} variant="body2">
            {skill.title} - {skill.description}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
