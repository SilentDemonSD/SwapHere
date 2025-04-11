import React, { useState } from 'react';
import axios from 'axios';

const AddSkill = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/skills`, 
        { name, description, category }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onAdd(res.data);
      setName(''); setDescription(''); setCategory('');
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add a Skill</h3>
      <input 
        type="text" 
        placeholder="Skill Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        required 
      />
      <button type="submit">Add Skill</button>
    </form>
  );
};

export default AddSkill;
