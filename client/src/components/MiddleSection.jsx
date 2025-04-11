import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkillCard from './SkillCard';
import axios from 'axios';

const MiddleSection = () => {
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(1);

  const fetchSkills = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const res = await axios.get(`${apiUrl}/api/skills?page=${page}`);
    setSkills([...skills, ...res.data]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <InfiniteScroll
      dataLength={skills.length}
      next={fetchSkills}
      hasMore={true}
      loader={<h4 style={{ color: '#fff', textAlign: 'center' }}>Loading...</h4>}
    >
      {skills.map((skill) => (
        <SkillCard key={skill._id} skill={skill} />
      ))}
    </InfiniteScroll>
  );
};

export default MiddleSection;
